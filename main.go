package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

type OpenAPISpec struct {
	OpenAPI    string              `json:"openapi"`
	Info       Info                `json:"info"`
	Paths      map[string]PathItem `json:"paths"`
	Components Components          `json:"components"`
}

type Info struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Version     string `json:"version"`
}

type PathItem struct {
	Post          *Operation     `json:"post,omitempty"`
	Get           *Operation     `json:"get,omitempty"`
	Put           *Operation     `json:"put,omitempty"`
	Delete        *Operation     `json:"delete,omitempty"`
	Patch         *Operation     `json:"patch,omitempty"`
	GroupMetadata *GroupMetadata `json:"x-group-metadata,omitempty"`
}

type GroupMetadata struct {
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Schema      Schema      `json:"schema,omitempty"`
	Example     interface{} `json:"example,omitempty"`
}

type Operation struct {
	Summary     string              `json:"summary"`
	Description string              `json:"description"`
	Tags        []string            `json:"tags"`
	RequestBody *RequestBody        `json:"requestBody,omitempty"`
	Responses   map[string]Response `json:"responses"`
}

type RequestBody struct {
	Description string               `json:"description"`
	Required    bool                 `json:"required"`
	Content     map[string]MediaType `json:"content"`
}

type MediaType struct {
	Schema Schema `json:"schema"`
}

type Schema struct {
	Type        string        `json:"type"`
	Properties  OrderedMap    `json:"properties"`
	Required    []string      `json:"required,omitempty"`
	Ref         string        `json:"$ref,omitempty"`
	Example     interface{}   `json:"example,omitempty"`
	Description string        `json:"description,omitempty"`
	Enum        []interface{} `json:"enum,omitempty"`
}

// OrderedMap preserves the order of keys as they appear in the JSON
type OrderedMap struct {
	Keys   []string
	Values map[string]Property
}

// UnmarshalJSON implements custom JSON unmarshaling to preserve key order
func (m *OrderedMap) UnmarshalJSON(b []byte) error {
	m.Values = make(map[string]Property)
	m.Keys = make([]string, 0)

	// Create a decoder
	dec := json.NewDecoder(bytes.NewReader(b))

	// Read the opening brace
	t, err := dec.Token()
	if err != nil {
		return err
	}
	if t != json.Delim('{') {
		return fmt.Errorf("expected {, got %v", t)
	}

	// Read each key-value pair
	for dec.More() {
		// Read the key
		t, err := dec.Token()
		if err != nil {
			return err
		}
		key := t.(string)
		m.Keys = append(m.Keys, key)

		// Read the value
		var value Property
		if err := dec.Decode(&value); err != nil {
			return err
		}
		m.Values[key] = value
	}

	// Read the closing brace
	t, err = dec.Token()
	if err != nil {
		return err
	}
	if t != json.Delim('}') {
		return fmt.Errorf("expected }, got %v", t)
	}

	return nil
}

type Property struct {
	Type        string     `json:"type"`
	Description string     `json:"description,omitempty"`
	Nullable    bool       `json:"nullable,omitempty"`
	Ref         string     `json:"$ref,omitempty"`
	AllOf       []Property `json:"allOf,omitempty"`
	Example     interface{} `json:"example,omitempty"`
}

type Response struct {
	Description string               `json:"description"`
	Content     map[string]MediaType `json:"content,omitempty"`
}

type Components struct {
	Schemas map[string]Schema `json:"schemas"`
}

type OrderedProperty struct {
	Name     string
	Property Property
}

// singularize attempts to convert plural words to singular
func singularize(word string) string {
	// Handle common English pluralization rules
	if strings.HasSuffix(word, "ies") {
		return strings.TrimSuffix(word, "ies") + "y"
	}
	if strings.HasSuffix(word, "esses") {
		return strings.TrimSuffix(word, "es")
	}
	if strings.HasSuffix(word, "sses") {
		return strings.TrimSuffix(word, "es")
	}
	if strings.HasSuffix(word, "ses") {
		return strings.TrimSuffix(word, "s")
	}
	if strings.HasSuffix(word, "s") && !strings.HasSuffix(word, "ss") {
		return strings.TrimSuffix(word, "s")
	}
	return word
}

func main() {
	// Check if spec file exists
	specPath := filepath.Join("specs", "api_public_spec.json")
	if _, err := os.Stat(specPath); os.IsNotExist(err) {
		fmt.Println("No OpenAPI spec found, skipping API endpoint generation")
		return
	}

	// Clean up old generated files
	apiRefDir := filepath.Join("src", "docs", "api-reference")
	if err := os.RemoveAll(apiRefDir); err != nil {
		fmt.Printf("Error cleaning up old files: %v\n", err)
		os.Exit(1)
	}

	// Read the OpenAPI spec
	specData, err := os.ReadFile(specPath)
	if err != nil {
		fmt.Printf("Error reading spec file: %v\n", err)
		os.Exit(1)
	}

	var spec OpenAPISpec
	if err := json.Unmarshal(specData, &spec); err != nil {
		fmt.Printf("Error parsing spec: %v\n", err)
		os.Exit(1)
	}

	// Create the API reference directory
	apiRefDir = filepath.Join("src", "docs", "api-reference")
	if err := os.MkdirAll(apiRefDir, 0755); err != nil {
		fmt.Printf("Error creating directory: %v\n", err)
		os.Exit(1)
	}

	// Create the API reference index file in the docs directory (not in api subdirectory)
	createIndexFile(filepath.Join("src", "docs"), spec)

	// Group paths by their logical grouping
	groupedPaths := make(map[string]map[string]PathItem)
	for path, item := range spec.Paths {
		// Determine the grouping key based on path structure
		pathParts := strings.Split(strings.TrimPrefix(path, "/"), "/")
		var groupKey string

		// For nested resources like /customers/{id}/addresses, create separate groups
		if len(pathParts) >= 3 && strings.HasPrefix(pathParts[1], "{") {
			// This is a nested resource like /customers/{customer_id}/addresses
			groupKey = pathParts[0] + "_" + pathParts[2] // e.g., "customers_addresses"
		} else {
			// This is a top-level resource like /customers or /health
			groupKey = pathParts[0]
		}

		if _, exists := groupedPaths[groupKey]; !exists {
			groupedPaths[groupKey] = make(map[string]PathItem)
		}
		groupedPaths[groupKey][path] = item
	}

	// Process each group and create markdown files
	for groupKey, paths := range groupedPaths {
		// Create a directory for each tag
		tag := "general"
		for _, item := range paths {
			if item.Post != nil && len(item.Post.Tags) > 0 {
				tag = item.Post.Tags[0]
				break
			}
			if item.Get != nil && len(item.Get.Tags) > 0 {
				tag = item.Get.Tags[0]
				break
			}
		}

		// Determine the directory structure
		var tagDir string
		if strings.Contains(groupKey, "_") {
			// This is a nested resource (e.g., "customers_addresses")
			parts := strings.Split(groupKey, "_")
			parentResource := parts[0]
			subResource := parts[1]

			// Put nested resources under their parent directory
			// Convert both parent and sub-resource to singular form
			parentDir := strings.ToLower(parentResource)
			parentDir = singularize(parentDir)

			subDir := strings.ToLower(subResource)
			subDir = singularize(subDir)

			tagDir = filepath.Join(apiRefDir, parentDir, subDir)
		} else {
			// This is a top-level resource
			tagDir = filepath.Join(apiRefDir, strings.ToLower(strings.ReplaceAll(tag, " ", "-")))
		}

		if err := os.MkdirAll(tagDir, 0755); err != nil {
			fmt.Printf("Error creating tag directory: %v\n", err)
			continue
		}

		// Create markdown file for the group of endpoints
		createEndpointFile(tagDir, groupKey, paths, spec)
	}
}

func createIndexFile(dir string, spec OpenAPISpec) {
	indexContent := fmt.Sprintf(`---
title: "API Reference"
description: "%s"
breadcrumbs:
  - label: "Documentation"
    pathKey: "docs"
  - label: "API Reference"
header:
  title: "API Reference"
  subtitle: "Complete API documentation for all endpoints"
---

# API Reference

%s

## Available Endpoints

### Authentication
- [Authentication](/api-reference/authentication/v2)

### System
- [Health Check](/api-reference/health/healthz)
`, spec.Info.Description, spec.Info.Description)

	indexPath := filepath.Join(dir, "api-reference.mdx")
	if err := os.WriteFile(indexPath, []byte(indexContent), 0644); err != nil {
		fmt.Printf("Error writing index file: %v\n", err)
	}
}

// buildSchemaToEndpointMap analyzes the OpenAPI spec to map schemas to their actual endpoint anchors
func buildSchemaToEndpointMap(spec OpenAPISpec) map[string]string {
	schemaToEndpointMap := make(map[string]string)

	// First pass: build a mapping of paths to their tag directories
	pathToTagDirMap := make(map[string]string)
	for path, pathItem := range spec.Paths {
		// Determine the tag directory for this path
		var tagDir string

		// Check all operations to find the first tag
		operations := []*Operation{pathItem.Post, pathItem.Get, pathItem.Put, pathItem.Delete, pathItem.Patch}
		for _, op := range operations {
			if op != nil && len(op.Tags) > 0 {
				// Convert tag to directory format: "Customer Address" -> "customer-address"
				tagDir = strings.ToLower(strings.ReplaceAll(op.Tags[0], " ", "-"))
				break
			}
		}

		// Fallback if no tag found
		if tagDir == "" {
			pathParts := strings.Split(strings.TrimPrefix(path, "/"), "/")
			tagDir = strings.ToLower(pathParts[0])
		}

		pathToTagDirMap[path] = tagDir
	}

	// Second pass: build the complete page URLs using the tag information
	for path, pathItem := range spec.Paths {
		pageURL := buildPageURL(path, pathToTagDirMap[path])

		// Check all operations in this path
		operations := []struct {
			method string
			op     *Operation
		}{
			{"POST", pathItem.Post},
			{"GET", pathItem.Get},
			{"PUT", pathItem.Put},
			{"DELETE", pathItem.Delete},
			{"PATCH", pathItem.Patch},
		}

		for _, opInfo := range operations {
			if opInfo.op == nil {
				continue
			}

			// Create endpoint anchor from operation summary
			// Convert "Create customer address" -> "create-customer-address"
			endpointAnchor := strings.ToLower(strings.ReplaceAll(opInfo.op.Summary, " ", "-"))
			fullEndpointURL := pageURL + "#" + endpointAnchor

			// Map request body schemas to this endpoint
			if opInfo.op.RequestBody != nil && opInfo.op.RequestBody.Content["application/json"].Schema.Ref != "" {
				schemaName := strings.TrimPrefix(opInfo.op.RequestBody.Content["application/json"].Schema.Ref, "#/components/schemas/")
				schemaToEndpointMap[schemaName] = fullEndpointURL
			}

			// Map response schemas to this endpoint (but only if they're not the main resource schema)
			for _, response := range opInfo.op.Responses {
				if response.Content != nil && response.Content["application/json"].Schema.Ref != "" {
					schemaName := strings.TrimPrefix(response.Content["application/json"].Schema.Ref, "#/components/schemas/")

					// Check if this schema is the main resource schema for any group
					isMainResourceSchema := false
					for _, pathItemCheck := range spec.Paths {
						if pathItemCheck.GroupMetadata != nil && pathItemCheck.GroupMetadata.Schema.Ref != "" {
							mainSchemaName := strings.TrimPrefix(pathItemCheck.GroupMetadata.Schema.Ref, "#/components/schemas/")
							if mainSchemaName == schemaName {
								isMainResourceSchema = true
								break
							}
						}
					}

					// Only map to endpoint if it's not a main resource schema
					if !isMainResourceSchema {
						schemaToEndpointMap[schemaName] = fullEndpointURL
					}
				}
			}
		}
	}

	// Map main resource schemas to their resource sections
	for path, pathItem := range spec.Paths {
		if pathItem.GroupMetadata != nil && pathItem.GroupMetadata.Schema.Ref != "" {
			schemaName := strings.TrimPrefix(pathItem.GroupMetadata.Schema.Ref, "#/components/schemas/")
			pageURL := buildPageURL(path, pathToTagDirMap[path])
			resourceAnchor := fmt.Sprintf("#the-%s-api-resource", strings.ToLower(schemaName))
			schemaToEndpointMap[schemaName] = pageURL + resourceAnchor
		}
	}

	// Map standalone ID schemas to their appropriate resource pages
	// These type definitions should link to the page where their resource is documented
	idSchemaMap := map[string]string{
		"CustomerID":    "/api-reference/customer/customers#customerid",
		"AddressID":     "/api-reference/customer/address/customers_addresses#addressid",
		"GeolocationID": "/api-reference/customer/address/customers_addresses#geolocationid",
	}

	for schemaName, url := range idSchemaMap {
		if _, exists := spec.Components.Schemas[schemaName]; exists {
			schemaToEndpointMap[schemaName] = url
		}
	}

	return schemaToEndpointMap
}

// buildPageURL constructs the page URL for a given API path and tag directory
func buildPageURL(apiPath, tagDir string) string {
	pathParts := strings.Split(strings.TrimPrefix(apiPath, "/"), "/")
	var groupKey string

	// For nested resources like /customers/{id}/addresses, create separate groups
	if len(pathParts) >= 3 && strings.HasPrefix(pathParts[1], "{") {
		// This is a nested resource like /customers/{customer_id}/addresses
		groupKey = pathParts[0] + "_" + pathParts[2] // e.g., "customers_addresses"
	} else {
		// This is a top-level resource like /customers or /health
		groupKey = pathParts[0]
	}

	// Convert to the same URL pattern used in the documentation
	if strings.Contains(groupKey, "_") {
		// This is a nested resource (e.g., "customers_addresses")
		parts := strings.Split(groupKey, "_")
		parentResource := parts[0]
		subResource := parts[1]

		// Convert both parent and sub-resource to singular form
		parentDir := strings.ToLower(parentResource)
		parentDir = singularize(parentDir)

		subDir := strings.ToLower(subResource)
		subDir = singularize(subDir)

		return fmt.Sprintf("/api-reference/%s/%s/%s", parentDir, subDir, groupKey)
	} else {
		// This is a top-level resource - use the tag directory
		return fmt.Sprintf("/api-reference/%s/%s", tagDir, groupKey)
	}
}

// getSchemaPageURL determines the correct page URL for a given schema based on OpenAPI spec
func getSchemaPageURL(schemaName string, schemaToEndpointMap map[string]string) string {
	if endpointURL, exists := schemaToEndpointMap[schemaName]; exists {
		return endpointURL
	}

	// If we can't determine the endpoint, return a generic internal link
	return "#" + strings.ToLower(schemaName)
}

func getTypeWithLink(prop Property, schemaToEndpointMap map[string]string) string {
	if prop.Ref != "" {
		schemaName := strings.TrimPrefix(prop.Ref, "#/components/schemas/")
		endpointURL := getSchemaPageURL(schemaName, schemaToEndpointMap)
		return fmt.Sprintf("[%s](%s)", schemaName, endpointURL)
	}

	// Handle allOf with references (commonly used for type IDs)
	if len(prop.AllOf) > 0 {
		for _, subProp := range prop.AllOf {
			if subProp.Ref != "" {
				schemaName := strings.TrimPrefix(subProp.Ref, "#/components/schemas/")
				endpointURL := getSchemaPageURL(schemaName, schemaToEndpointMap)
				return fmt.Sprintf("[%s](%s)", schemaName, endpointURL)
			}
		}
	}

	return prop.Type
}

func getOrderedProperties(schema Schema) []OrderedProperty {
	// Create a slice to hold the ordered properties
	ordered := make([]OrderedProperty, 0, len(schema.Properties.Values))

	// Add properties in the order they appear in the JSON (schema.Properties.Keys)
	// This maintains the original field order from the OpenAPI spec
	for _, name := range schema.Properties.Keys {
		if prop, exists := schema.Properties.Values[name]; exists {
			ordered = append(ordered, OrderedProperty{Name: name, Property: prop})
		}
	}

	return ordered
}

// addStandaloneSchemas adds schema definitions for ID types that belong on this page
func addStandaloneSchemas(groupKey string, spec OpenAPISpec, schemaToEndpointMap map[string]string) string {
	var content string

	// Dynamically determine which schemas should be documented on this page
	schemas := getRelevantSchemasForGroup(groupKey, spec)

	if len(schemas) == 0 {
		return content
	}

	content += "\n\n# Schema Definitions\n\n"

	for _, schemaName := range schemas {
		if schema, exists := spec.Components.Schemas[schemaName]; exists {
			// Format schema name for better readability if it's an include option
			displayName := schemaName
			if strings.HasSuffix(schemaName, "IncludeOption") {
				// Convert "CustomerIncludeOption" to "Customer Include Options"
				baseName := strings.TrimSuffix(schemaName, "IncludeOption")
				displayName = fmt.Sprintf("%s Include Options", baseName)
			}

			content += fmt.Sprintf("### %s\n\n", displayName)
			if schema.Description != "" {
				content += fmt.Sprintf("%s\n\n", schema.Description)
			}
			content += fmt.Sprintf("**Type:** `%s`\n\n", schema.Type)

			// If this is an enum type (like include options), list the available values
			if len(schema.Enum) > 0 {
				content += "**Available values:**\n\n"
				for _, value := range schema.Enum {
					valueStr := fmt.Sprintf("%v", value)
					content += fmt.Sprintf("- `%s`: ", valueStr)

					// Generic description based on the value name
					description := getIncludeOptionDescription(schemaName, valueStr, spec)
					content += description + "\n"
				}
				content += "\n"
			} else if schema.Example != nil && !shouldShowPropertiesTable(schemaName, schema) {
				content += "**Example:**\n\n"
				content += "```json\n"
				jsonExample, err := json.MarshalIndent(schema.Example, "", "  ")
				if err == nil {
					content += string(jsonExample) + "\n"
				} else {
					content += fmt.Sprintf("%v\n", schema.Example)
				}
				content += "```\n\n"
			} else if shouldShowPropertiesTable(schemaName, schema) {
				// Show properties table for complex schemas
				content += addSchemaPropertiesTable(schema, schemaToEndpointMap)
			} else if schema.Example != nil {
				content += "**Example:**\n\n"
				content += "```json\n"
				jsonExample, err := json.MarshalIndent(schema.Example, "", "  ")
				if err == nil {
					content += string(jsonExample) + "\n"
				} else {
					content += fmt.Sprintf("%v\n", schema.Example)
				}
				content += "```\n\n"
			}
		}
	}

	return content
}

func createEndpointFile(dir string, groupKey string, paths map[string]PathItem, spec OpenAPISpec) {
	// Build the schema to endpoint mapping once for this file
	schemaToEndpointMap := buildSchemaToEndpointMap(spec)

	// Get the first path item to use its metadata
	var firstPathItem PathItem
	for _, item := range paths {
		firstPathItem = item
		break
	}

	// Create the markdown content
	content := fmt.Sprintf(`---
title: "%s"
description: "%s"
breadcrumbs:
  - label: "Documentation"
    pathKey: "docs"
  - label: "API Reference"
    pathKey: "apiReference"
  - label: "%s"
header:
  title: "%s"
  subtitle: "%s"
---

`, firstPathItem.GroupMetadata.Title, firstPathItem.GroupMetadata.Description, firstPathItem.GroupMetadata.Title, firstPathItem.GroupMetadata.Title, firstPathItem.GroupMetadata.Description)

	// Add schema section if it exists
	if firstPathItem.GroupMetadata.Schema.Ref != "" {
		schemaName := strings.TrimPrefix(firstPathItem.GroupMetadata.Schema.Ref, "#/components/schemas/")
		if refSchema, ok := spec.Components.Schemas[schemaName]; ok {
			content += fmt.Sprintf("## The %s API resource\n\n", schemaName)
			if refSchema.Description != "" {
				content += fmt.Sprintf("%s\n\n", refSchema.Description)
			}

			// Create fields data for the shortcode
			fields := make([]map[string]string, 0)
			orderedProps := getOrderedProperties(refSchema)
			for _, orderedProp := range orderedProps {
				required := ""
				for _, req := range refSchema.Required {
					if req == orderedProp.Name {
						required = "true"
						break
					}
				}
				nullable := ""
				if orderedProp.Property.Nullable {
					nullable = "true"
				}
				// Add enhanced description for include fields
				description := orderedProp.Property.Description
				if orderedProp.Name == "include" {
					// Use the generic function to enhance the include field description
					description = enhanceIncludeFieldDescription(description, groupKey, spec)
				}

				fields = append(fields, map[string]string{
					"Name":        orderedProp.Name,
					"Type":        getTypeWithLink(orderedProp.Property, schemaToEndpointMap),
					"Required":    required,
					"Nullable":    nullable,
					"Description": description,
				})
			}

			// Create a markdown table for the fields
			content += "| Field | Type | Required | Description |\n"
			content += "|-------|------|----------|-------------|\n"
			for _, field := range fields {
				required := "No"
				if field["Required"] == "true" {
					required = "Yes"
				}
				content += fmt.Sprintf("| `%s` | %s | %s | %s |\n",
					field["Name"], field["Type"], required, field["Description"])
			}
			content += "\n"

			// Add example from the referenced schema if it exists
			if refSchema.Example != nil {
				content += "### Example\n\n"
				content += "```json\n"
				// Create an ordered map to maintain field order
				example := struct {
					Keys   []string
					Values map[string]interface{}
				}{
					Keys:   make([]string, 0),
					Values: make(map[string]interface{}),
				}
				// Convert the example to a map
				exampleMap := refSchema.Example.(map[string]interface{})
				// Get the ordered properties
				orderedProps := getOrderedProperties(refSchema)
				// Add values in the correct order
				for _, orderedProp := range orderedProps {
					if value, exists := exampleMap[orderedProp.Name]; exists {
						example.Keys = append(example.Keys, orderedProp.Name)
						example.Values[orderedProp.Name] = value
					}
				}
				// Convert to JSON while maintaining order
				var buf bytes.Buffer
				buf.WriteString("{\n")
				for i, key := range example.Keys {
					value := example.Values[key]
					jsonValue, _ := json.Marshal(value)
					buf.WriteString(fmt.Sprintf("  \"%s\": %s", key, string(jsonValue)))
					if i < len(example.Keys)-1 {
						buf.WriteString(",\n")
					} else {
						buf.WriteString("\n")
					}
				}
				buf.WriteString("}")
				content += buf.String() + "\n```\n\n"
			}
		}
	}

	// Add endpoint section
	content += "## Endpoints\n\n"

	// Process each path in the group
	for path, pathItem := range paths {
		// Get all operations
		operations := []struct {
			method string
			op     *Operation
		}{
			{"POST", pathItem.Post},
			{"GET", pathItem.Get},
			{"PUT", pathItem.Put},
			{"DELETE", pathItem.Delete},
			{"PATCH", pathItem.Patch},
		}

		// Add each operation
		for _, opInfo := range operations {
			if opInfo.op == nil {
				continue
			}

			// Add the specific endpoint
			content += fmt.Sprintf("\n### %s\n\n", opInfo.op.Summary)
			content += fmt.Sprintf("%s\n\n", opInfo.op.Description)
			content += fmt.Sprintf("`%s %s`\n\n", opInfo.method, path)

			// Add request body if exists
			if opInfo.op.RequestBody != nil {
				content += "#### Request Body\n\n"

				schema := opInfo.op.RequestBody.Content["application/json"].Schema

				// Resolve $ref if present
				resolvedSchema := schema
				if schema.Ref != "" {
					schemaName := strings.TrimPrefix(schema.Ref, "#/components/schemas/")
					if refSchema, ok := spec.Components.Schemas[schemaName]; ok {
						resolvedSchema = refSchema
					}
				}

				fields := make([]map[string]string, 0)
				orderedProps := getOrderedProperties(resolvedSchema)
				for _, orderedProp := range orderedProps {
					required := ""
					for _, req := range resolvedSchema.Required {
						if req == orderedProp.Name {
							required = "true"
							break
						}
					}
					nullable := ""
					if orderedProp.Property.Nullable {
						nullable = "true"
					}
					// Enhance include field descriptions for request body
					description := orderedProp.Property.Description
					if orderedProp.Name == "include" {
						description = enhanceIncludeFieldDescription(description, groupKey, spec)
					}

					fields = append(fields, map[string]string{
						"Name":        orderedProp.Name,
						"Type":        getTypeWithLink(orderedProp.Property, schemaToEndpointMap),
						"Required":    required,
						"Nullable":    nullable,
						"Description": description,
					})
				}

				// Create a markdown table for the fields
				content += "| Field | Type | Required | Description |\n"
				content += "|-------|------|----------|-------------|\n"
				for _, field := range fields {
					required := "No"
					if field["Required"] == "true" {
						required = "Yes"
					}
					content += fmt.Sprintf("| `%s` | %s | %s | %s |\n",
						field["Name"], field["Type"], required, field["Description"])
				}
				content += "\n"

				// Add the example
				content += "##### Example\n\n"
				content += "```json\n"
				if example := resolvedSchema.Example; example != nil {
					jsonExample, _ := json.MarshalIndent(example, "", "  ")
					content += string(jsonExample) + "\n```\n\n"
				} else {
					// Create an ordered map to maintain field order
					example := struct {
						Keys   []string
						Values map[string]interface{}
					}{
						Keys:   make([]string, 0),
						Values: make(map[string]interface{}),
					}
					for _, orderedProp := range orderedProps {
						example.Keys = append(example.Keys, orderedProp.Name)
						switch orderedProp.Property.Type {
						case "string":
							example.Values[orderedProp.Name] = "string"
						case "number":
							example.Values[orderedProp.Name] = 0
						case "boolean":
							example.Values[orderedProp.Name] = true
						}
					}
					// Convert to JSON while maintaining order
					var buf bytes.Buffer
					buf.WriteString("{\n")
					for i, key := range example.Keys {
						value := example.Values[key]
						jsonValue, _ := json.Marshal(value)
						buf.WriteString(fmt.Sprintf("  \"%s\": %s", key, string(jsonValue)))
						if i < len(example.Keys)-1 {
							buf.WriteString(",\n")
						} else {
							buf.WriteString("\n")
						}
					}
					buf.WriteString("}")
					content += buf.String() + "\n```\n\n"
				}
			}

			// Add response
			content += "#### Response\n\n"
			for status, response := range opInfo.op.Responses {
				content += fmt.Sprintf("`%s`\n\n", status)
				content += fmt.Sprintf("%s\n\n", response.Description)

				if response.Content != nil {
					schema := response.Content["application/json"].Schema

					// Handle both direct properties and referenced schemas
					if schema.Ref != "" {
						// Extract the schema name from the reference
						schemaName := strings.TrimPrefix(schema.Ref, "#/components/schemas/")
						if _, exists := spec.Components.Schemas[schemaName]; exists {
							// Get the response description with include field information
							responseDescription := getResponseDescription(opInfo.method, schemaName, groupKey, spec)
							content += responseDescription + "\n\n"
						}
					} else {
						fields := make([]map[string]string, 0)
						orderedProps := getOrderedProperties(schema)
						for _, orderedProp := range orderedProps {
							required := ""
							for _, req := range schema.Required {
								if req == orderedProp.Name {
									required = "true"
									break
								}
							}
							nullable := ""
							if orderedProp.Property.Nullable {
								nullable = "true"
							}
							fields = append(fields, map[string]string{
								"Name":        orderedProp.Name,
								"Type":        getTypeWithLink(orderedProp.Property, schemaToEndpointMap),
								"Required":    required,
								"Nullable":    nullable,
								"Description": orderedProp.Property.Description,
							})
						}

						// Create a markdown table for the fields
						content += "| Field | Type | Required | Description |\n"
						content += "|-------|------|----------|-------------|\n"
						for _, field := range fields {
							required := "No"
							if field["Required"] == "true" {
								required = "Yes"
							}
							content += fmt.Sprintf("| `%s` | %s | %s | %s |\n",
								field["Name"], field["Type"], required, field["Description"])
						}
						content += "\n"
					}
				}
			}
		}
	}

	// Add standalone schema definitions at the bottom of the page
	content += addStandaloneSchemas(groupKey, spec, schemaToEndpointMap)

	// Create the filename
	filename := groupKey + ".mdx"

	// Write the file
	filePath := filepath.Join(dir, filename)
	if err := os.WriteFile(filePath, []byte(content), 0644); err != nil {
		fmt.Printf("Error writing endpoint file: %v\n", err)
	}
}

// getIncludeOptionDescription returns a human-readable description for an include option
func getIncludeOptionDescription(schemaName, value string, spec OpenAPISpec) string {
	// Extract the resource name from the schema name (e.g., "Customer" from "CustomerIncludeOption")
	resourceName := strings.TrimSuffix(schemaName, "IncludeOption")

	// Try to find descriptions from the actual schema properties that match this include option
	description := findIncludeOptionDescriptionFromSchema(resourceName, value, spec)
	if description != "" {
		return description
	}

	// Common descriptions for standard include options
	if value == "full" {
		return fmt.Sprintf("Include all available fields for the %s", strings.ToLower(resourceName))
	}

	// Generic fallback based on the value name
	// Convert snake_case to readable format (e.g., "default_billing_address" to "default billing address")
	readableValue := strings.ReplaceAll(value, "_", " ")
	return fmt.Sprintf("Include the %s", readableValue)
}

// findIncludeOptionDescriptionFromSchema tries to find a description for an include option by analyzing the main resource schema
func findIncludeOptionDescriptionFromSchema(resourceName, includeValue string, spec OpenAPISpec) string {
	// Look for the main resource schema
	resourceSchema, exists := spec.Components.Schemas[resourceName]
	if !exists {
		return ""
	}

	// Look for properties that might correspond to this include option
	for _, propName := range resourceSchema.Properties.Keys {
		prop := resourceSchema.Properties.Values[propName]

		// Check if this property name matches the include option
		if propName == includeValue {
			if prop.Description != "" {
				return fmt.Sprintf("Include the %s", strings.ToLower(prop.Description))
			}
		}

		// Check if this property name contains the include option (e.g., "default_billing_address_id" matches "default_billing_address")
		if strings.Contains(propName, includeValue) {
			if prop.Description != "" {
				// Extract a meaningful description
				desc := prop.Description
				// Remove "identifier" or "ID" related text since we're including the full object
				desc = strings.ReplaceAll(desc, "identifier", "")
				desc = strings.ReplaceAll(desc, "ID", "")
				desc = strings.ReplaceAll(desc, "for the", "")
				desc = strings.TrimSpace(desc)
				if desc != "" {
					return fmt.Sprintf("Include the %s object", strings.ToLower(desc))
				}
			}
		}
	}

	// Look for referenced schemas that might give us more context
	for _, propName := range resourceSchema.Properties.Keys {
		prop := resourceSchema.Properties.Values[propName]

		// If this property references another schema and matches our include option
		if strings.Contains(propName, includeValue) && prop.Ref != "" {
			referencedSchemaName := strings.TrimPrefix(prop.Ref, "#/components/schemas/")
			if referencedSchema, exists := spec.Components.Schemas[referencedSchemaName]; exists {
				if referencedSchema.Description != "" {
					return fmt.Sprintf("Include the %s", strings.ToLower(referencedSchema.Description))
				}
			}
		}

		// Check allOf references as well
		for _, allOfProp := range prop.AllOf {
			if allOfProp.Ref != "" && strings.Contains(propName, includeValue) {
				referencedSchemaName := strings.TrimPrefix(allOfProp.Ref, "#/components/schemas/")
				if referencedSchema, exists := spec.Components.Schemas[referencedSchemaName]; exists {
					if referencedSchema.Description != "" {
						return fmt.Sprintf("Include the %s", strings.ToLower(referencedSchema.Description))
					}
				}
			}
		}
	}

	return ""
}

// enhanceIncludeFieldDescription enhances the description of include fields by adding references to the appropriate include options
func enhanceIncludeFieldDescription(description string, groupKey string, spec OpenAPISpec) string {
	// Clear any existing references to include options
	if strings.Contains(description, "See") {
		parts := strings.Split(description, "See")
		description = strings.TrimSpace(parts[0])
	}

	// Find the include option schema for this group dynamically
	includeOptionSchema := findIncludeOptionSchemaForGroup(groupKey, spec)

	if includeOptionSchema != "" {
		// Convert "CustomerIncludeOption" to "Customer Include Options"
		baseName := strings.TrimSuffix(includeOptionSchema, "IncludeOption")
		displayName := fmt.Sprintf("%s Include Options", baseName)
		anchorName := strings.ToLower(baseName) + "-include-options"

		// Add the reference to the include options documentation
		description += fmt.Sprintf(" See [%s](#%s) for available values.", displayName, anchorName)
	}

	return description
}

// findIncludeOptionSchemaForGroup finds the include option schema that belongs to a group
func findIncludeOptionSchemaForGroup(groupKey string, spec OpenAPISpec) string {
	// Get the main resource schema for this group
	mainResourceSchema := getMainResourceSchemaForGroup(groupKey, spec)

	if mainResourceSchema != "" {
		// Look for an include option schema that matches the main resource
		includeOptionName := mainResourceSchema + "IncludeOption"
		if _, exists := spec.Components.Schemas[includeOptionName]; exists {
			return includeOptionName
		}
	}

	// If no main resource match, look for any include option that might belong to this group
	for schemaName := range spec.Components.Schemas {
		if strings.HasSuffix(schemaName, "IncludeOption") {
			baseName := strings.TrimSuffix(schemaName, "IncludeOption")

			// Check if this include option belongs to this group
			if strings.Contains(groupKey, strings.ToLower(baseName)) {
				return schemaName
			}
		}
	}

	return ""
}

// getRelevantSchemasForGroup dynamically determines which schemas should be documented on a given group page
func getRelevantSchemasForGroup(groupKey string, spec OpenAPISpec) []string {
	var relevantSchemas []string

	// Get all schemas that are actually referenced in this group's main resource schema and endpoints
	actuallyReferencedSchemas := getActuallyReferencedSchemasForGroup(groupKey, spec)

	// Only include schemas that are actually referenced
	for schemaName := range actuallyReferencedSchemas {
		// Don't include main response schemas (they're already documented in the main section)
		if !isMainResponseSchema(schemaName, spec) {
			// Don't include complex request/response schemas that are better documented inline
			if !isComplexRequestResponseSchema(schemaName, spec) {
				relevantSchemas = append(relevantSchemas, schemaName)
			}
		}
	}

	// Sort schemas: ID schemas first (by appearance order), then include options, then others
	sortSchemasByAppearanceOrder(relevantSchemas, groupKey, spec)

	return relevantSchemas
}

// getMainResourceSchemaForGroup finds the main resource schema for a group
func getMainResourceSchemaForGroup(groupKey string, spec OpenAPISpec) string {
	// Look through paths to find the main resource schema
	for path, pathItem := range spec.Paths {
		if shouldPathBelongToGroup(path, groupKey) {
			if pathItem.GroupMetadata != nil && pathItem.GroupMetadata.Schema.Ref != "" {
				return strings.TrimPrefix(pathItem.GroupMetadata.Schema.Ref, "#/components/schemas/")
			}
		}
	}
	return ""
}

// getReferencedSchemasForGroup finds all schemas referenced by endpoints in this group
func getReferencedSchemasForGroup(groupKey string, spec OpenAPISpec) map[string]bool {
	referencedSchemas := make(map[string]bool)

	for path, pathItem := range spec.Paths {
		if !shouldPathBelongToGroup(path, groupKey) {
			continue
		}

		// Check all operations
		operations := []*Operation{pathItem.Post, pathItem.Get, pathItem.Put, pathItem.Delete, pathItem.Patch}
		for _, op := range operations {
			if op == nil {
				continue
			}

			// Check request body schemas
			if op.RequestBody != nil && op.RequestBody.Content["application/json"].Schema.Ref != "" {
				schemaName := strings.TrimPrefix(op.RequestBody.Content["application/json"].Schema.Ref, "#/components/schemas/")
				referencedSchemas[schemaName] = true
			}

			// Check response schemas
			for _, response := range op.Responses {
				if response.Content != nil && response.Content["application/json"].Schema.Ref != "" {
					schemaName := strings.TrimPrefix(response.Content["application/json"].Schema.Ref, "#/components/schemas/")
					referencedSchemas[schemaName] = true
				}
			}
		}
	}

	return referencedSchemas
}

// shouldPathBelongToGroup determines if a path belongs to a specific group
func shouldPathBelongToGroup(path, groupKey string) bool {
	pathParts := strings.Split(strings.TrimPrefix(path, "/"), "/")
	var pathGroupKey string

	// For nested resources like /customers/{id}/addresses, create separate groups
	if len(pathParts) >= 3 && strings.HasPrefix(pathParts[1], "{") {
		// This is a nested resource like /customers/{customer_id}/addresses
		pathGroupKey = pathParts[0] + "_" + pathParts[2] // e.g., "customers_addresses"
	} else {
		// This is a top-level resource like /customers or /health
		pathGroupKey = pathParts[0]
	}

	return pathGroupKey == groupKey
}

// isMainResponseSchema checks if a schema is a main response schema for any endpoint
func isMainResponseSchema(schemaName string, spec OpenAPISpec) bool {
	for _, pathItem := range spec.Paths {
		if pathItem.GroupMetadata != nil && pathItem.GroupMetadata.Schema.Ref != "" {
			mainSchema := strings.TrimPrefix(pathItem.GroupMetadata.Schema.Ref, "#/components/schemas/")
			if mainSchema == schemaName {
				return true
			}
		}
	}
	return false
}

// isSchemaMainResourceElsewhere checks if a schema is the main resource for another group
func isSchemaMainResourceElsewhere(schemaName, currentGroupKey string, spec OpenAPISpec) bool {
	// Check if this schema is the main resource for a different group
	for path, pathItem := range spec.Paths {
		pathParts := strings.Split(strings.TrimPrefix(path, "/"), "/")
		var pathGroupKey string

		if len(pathParts) >= 3 && strings.HasPrefix(pathParts[1], "{") {
			pathGroupKey = pathParts[0] + "_" + pathParts[2]
		} else {
			pathGroupKey = pathParts[0]
		}

		if pathGroupKey != currentGroupKey && pathItem.GroupMetadata != nil && pathItem.GroupMetadata.Schema.Ref != "" {
			mainSchema := strings.TrimPrefix(pathItem.GroupMetadata.Schema.Ref, "#/components/schemas/")
			if mainSchema == schemaName {
				return true
			}
		}
	}
	return false
}

// isComplexRequestResponseSchema checks if a schema is a complex request/response schema that shouldn't be documented standalone
func isComplexRequestResponseSchema(schemaName string, spec OpenAPISpec) bool {
	// Check if this is a request or response schema by name
	if strings.Contains(schemaName, "Request") || strings.Contains(schemaName, "Response") {
		// Check if the schema has many properties (indicating it's complex)
		if schema, exists := spec.Components.Schemas[schemaName]; exists {
			// If it has more than 5 properties or contains nested objects, consider it complex
			if len(schema.Properties.Keys) > 5 {
				return true
			}

			// Check for nested object properties
			for _, propName := range schema.Properties.Keys {
				prop := schema.Properties.Values[propName]
				if prop.Type == "object" || prop.Type == "array" {
					return true
				}
			}
		}
	}

	return false
}

// shouldShowPropertiesTable determines if a schema should show a properties table instead of just an example
func shouldShowPropertiesTable(schemaName string, schema Schema) bool {
	// Don't show properties table for simple ID schemas or include options
	if strings.HasSuffix(schemaName, "ID") || strings.HasSuffix(schemaName, "IncludeOption") {
		return false
	}

	// Show properties table for schemas with more than 3 properties
	if len(schema.Properties.Keys) > 3 {
		return true
	}

	// Show properties table for schemas with complex nested structures
	for _, propName := range schema.Properties.Keys {
		prop := schema.Properties.Values[propName]
		if prop.Type == "object" || prop.Type == "array" {
			return true
		}
	}

	return false
}

// addSchemaPropertiesTable creates a properties table for a schema
func addSchemaPropertiesTable(schema Schema, schemaToEndpointMap map[string]string) string {
	var content string

	content += "**Properties:**\n\n"
	content += "| Field | Type | Required | Description |\n"
	content += "|-------|------|----------|-------------|\n"

	orderedProps := getOrderedProperties(schema)
	for _, orderedProp := range orderedProps {
		required := "No"
		for _, req := range schema.Required {
			if req == orderedProp.Name {
				required = "Yes"
				break
			}
		}

		content += fmt.Sprintf("| `%s` | %s | %s | %s |\n",
			orderedProp.Name,
			getTypeWithLink(orderedProp.Property, schemaToEndpointMap),
			required,
			orderedProp.Property.Description)
	}
	content += "\n"

	// Add example if available
	if schema.Example != nil {
		content += "**Example:**\n\n"
		content += "```json\n"
		jsonExample, err := json.MarshalIndent(schema.Example, "", "  ")
		if err == nil {
			content += string(jsonExample) + "\n"
		} else {
			content += fmt.Sprintf("%v\n", schema.Example)
		}
		content += "```\n\n"
	}

	return content
}

// getActuallyReferencedSchemasForGroup finds schemas that are actually referenced in this group's main resource schema and displayed fields
func getActuallyReferencedSchemasForGroup(groupKey string, spec OpenAPISpec) map[string]bool {
	referencedSchemas := make(map[string]bool)

	// Get the main resource schema for this group
	mainResourceSchema := getMainResourceSchemaForGroup(groupKey, spec)

	if mainResourceSchema != "" {
		// Analyze the main resource schema to find referenced schemas
		if schema, exists := spec.Components.Schemas[mainResourceSchema]; exists {
			findReferencedSchemasInSchema(schema, referencedSchemas, spec)
		}

		// Also include the include option schema for the main resource if it exists
		includeOptionSchema := mainResourceSchema + "IncludeOption"
		if _, exists := spec.Components.Schemas[includeOptionSchema]; exists {
			referencedSchemas[includeOptionSchema] = true
		}
	}

	// Also check schemas referenced in endpoint request/response bodies for this group
	for path, pathItem := range spec.Paths {
		if !shouldPathBelongToGroup(path, groupKey) {
			continue
		}

		// Check all operations
		operations := []*Operation{pathItem.Post, pathItem.Get, pathItem.Put, pathItem.Delete, pathItem.Patch}
		for _, op := range operations {
			if op == nil {
				continue
			}

			// Check request body schemas
			if op.RequestBody != nil && op.RequestBody.Content["application/json"].Schema.Ref != "" {
				schemaName := strings.TrimPrefix(op.RequestBody.Content["application/json"].Schema.Ref, "#/components/schemas/")
				if requestSchema, exists := spec.Components.Schemas[schemaName]; exists {
					findReferencedSchemasInSchema(requestSchema, referencedSchemas, spec)
				}
			}

			// Check response schemas
			for _, response := range op.Responses {
				if response.Content != nil && response.Content["application/json"].Schema.Ref != "" {
					schemaName := strings.TrimPrefix(response.Content["application/json"].Schema.Ref, "#/components/schemas/")
					if responseSchema, exists := spec.Components.Schemas[schemaName]; exists {
						findReferencedSchemasInSchema(responseSchema, referencedSchemas, spec)
					}
				}
			}
		}
	}

	return referencedSchemas
}

// findReferencedSchemasInSchema finds all schemas directly referenced within a given schema (not recursively)
func findReferencedSchemasInSchema(schema Schema, referencedSchemas map[string]bool, spec OpenAPISpec) {
	// Check each property for references
	for _, propName := range schema.Properties.Keys {
		prop := schema.Properties.Values[propName]

		// Direct schema reference - only add if it's an ID schema or include option
		if prop.Ref != "" {
			schemaName := strings.TrimPrefix(prop.Ref, "#/components/schemas/")
			// Only include ID schemas and include options that are directly referenced
			if strings.HasSuffix(schemaName, "ID") || strings.HasSuffix(schemaName, "IncludeOption") {
				referencedSchemas[schemaName] = true
			}
		}

		// allOf references - only add if it's an ID schema or include option
		for _, allOfProp := range prop.AllOf {
			if allOfProp.Ref != "" {
				schemaName := strings.TrimPrefix(allOfProp.Ref, "#/components/schemas/")
				// Only include ID schemas and include options that are directly referenced
				if strings.HasSuffix(schemaName, "ID") || strings.HasSuffix(schemaName, "IncludeOption") {
					referencedSchemas[schemaName] = true
				}
			}
		}
	}
}

// sortSchemasByAppearanceOrder sorts schema names with ID schemas first (by appearance order), then include options, then others
func sortSchemasByAppearanceOrder(schemas []string, groupKey string, spec OpenAPISpec) {
	// Get the appearance order of schemas in the main resource
	appearanceOrder := getSchemaAppearanceOrder(groupKey, spec)

	sort.Slice(schemas, func(i, j int) bool {
		schemaA := schemas[i]
		schemaB := schemas[j]

		// Priority order: ID schemas, Include options, Others
		priorityA := getSchemaPriority(schemaA)
		priorityB := getSchemaPriority(schemaB)

		if priorityA != priorityB {
			return priorityA < priorityB
		}

		// If same priority, sort by appearance order in the main resource schema
		orderA, existsA := appearanceOrder[schemaA]
		orderB, existsB := appearanceOrder[schemaB]

		if existsA && existsB {
			return orderA < orderB
		}
		if existsA {
			return true // A appears in schema, B doesn't
		}
		if existsB {
			return false // B appears in schema, A doesn't
		}

		// If neither appears in schema, sort alphabetically
		return schemaA < schemaB
	})
}

// getSchemaPriority returns the priority for sorting schemas
func getSchemaPriority(schemaName string) int {
	if strings.HasSuffix(schemaName, "ID") {
		return 1 // ID schemas first
	}
	if strings.HasSuffix(schemaName, "IncludeOption") {
		return 2 // Include options second
	}
	return 3 // Everything else last
}

// getSchemaAppearanceOrder returns a map of schema names to their order of appearance in the main resource schema
func getSchemaAppearanceOrder(groupKey string, spec OpenAPISpec) map[string]int {
	appearanceOrder := make(map[string]int)

	// Get the main resource schema for this group
	mainResourceSchema := getMainResourceSchemaForGroup(groupKey, spec)

	if mainResourceSchema == "" {
		return appearanceOrder
	}

	schema, exists := spec.Components.Schemas[mainResourceSchema]
	if !exists {
		return appearanceOrder
	}

	// Track the order of appearance for each referenced schema
	order := 0

	for _, propName := range schema.Properties.Keys {
		prop := schema.Properties.Values[propName]

		// Check direct schema reference
		if prop.Ref != "" {
			schemaName := strings.TrimPrefix(prop.Ref, "#/components/schemas/")
			if strings.HasSuffix(schemaName, "ID") || strings.HasSuffix(schemaName, "IncludeOption") {
				if _, exists := appearanceOrder[schemaName]; !exists {
					appearanceOrder[schemaName] = order
					order++
				}
			}
		}

		// Check allOf references
		for _, allOfProp := range prop.AllOf {
			if allOfProp.Ref != "" {
				schemaName := strings.TrimPrefix(allOfProp.Ref, "#/components/schemas/")
				if strings.HasSuffix(schemaName, "ID") || strings.HasSuffix(schemaName, "IncludeOption") {
					if _, exists := appearanceOrder[schemaName]; !exists {
						appearanceOrder[schemaName] = order
						order++
					}
				}
			}
		}
	}

	// Add the include option schema for the main resource at the end if it exists
	includeOptionSchema := mainResourceSchema + "IncludeOption"
	if _, exists := spec.Components.Schemas[includeOptionSchema]; exists {
		if _, alreadyExists := appearanceOrder[includeOptionSchema]; !alreadyExists {
			appearanceOrder[includeOptionSchema] = order
		}
	}

	return appearanceOrder
}

// getResponseDescription returns the complete response description including include field behavior
func getResponseDescription(method string, schemaName string, groupKey string, spec OpenAPISpec) string {
	// Find the include option schema for this group
	includeOptionSchema := findIncludeOptionSchemaForGroup(groupKey, spec)

	// Get the human-readable name for the include options
	baseName := strings.TrimSuffix(includeOptionSchema, "IncludeOption")
	displayName := fmt.Sprintf("%s Include Options", baseName)
	anchorName := strings.ToLower(baseName) + "-include-options"

	// Different behavior based on endpoint type
	switch method {
	case "GET":
		if includeOptionSchema != "" {
			return fmt.Sprintf("Returns a flat [`%s`](#the-%s-api-resource) object with only ID fields for nested objects by default. Use the `include` parameter to get additional information. See [%s](#%s) for available include options.",
				schemaName, strings.ToLower(schemaName), displayName, anchorName)
		}
		return fmt.Sprintf("Returns a [`%s`](#the-%s-api-resource) object.", schemaName, strings.ToLower(schemaName))

	case "POST", "PUT", "PATCH":
		if includeOptionSchema != "" {
			return fmt.Sprintf("Returns a %s ID by default. Use the `include` parameter in the request body for additional return information. See [%s](#%s) for available include options.",
				schemaName, displayName, anchorName)
		}
		return fmt.Sprintf("Returns a [`%s`](#the-%s-api-resource) object.", schemaName, strings.ToLower(schemaName))

	case "DELETE":
		return ""

	default:
		return "ERROR: Unknown method " + method + " for " + schemaName
	}
}
