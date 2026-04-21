package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

var nonAlphanumericRe = regexp.MustCompile(`[^a-z0-9]+`)

// createSlug mirrors the DocHeading.createSlug() function in the UI library
// so that generated anchor links match the heading IDs at render time.
func createSlug(text string) string {
	text = strings.ToLower(text)
	text = nonAlphanumericRe.ReplaceAllString(text, "-")
	text = strings.Trim(text, "-")
	return text
}

// --- Types ---

type OpenAPISpec struct {
	OpenAPI    string              `json:"openapi"`
	Info       Info                `json:"info"`
	Paths      map[string]PathItem `json:"paths"`
	Components Components          `json:"components"`
	Tags       []Tag               `json:"tags"`
}

type Tag struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Info struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Version     string `json:"version"`
}

type PathItem struct {
	Post   *Operation `json:"post,omitempty"`
	Get    *Operation `json:"get,omitempty"`
	Put    *Operation `json:"put,omitempty"`
	Delete *Operation `json:"delete,omitempty"`
	Patch  *Operation `json:"patch,omitempty"`
}

type Operation struct {
	Summary     string              `json:"summary"`
	Description string              `json:"description"`
	Tags        []string            `json:"tags"`
	OperationID string              `json:"operationId"`
	XPreview    bool                `json:"x-preview,omitempty"`
	Parameters  []Parameter         `json:"parameters,omitempty"`
	RequestBody *RequestBody        `json:"requestBody,omitempty"`
	Responses   map[string]Response `json:"responses"`
}

type Parameter struct {
	Name        string          `json:"name"`
	In          string          `json:"in"`
	Description string          `json:"description"`
	Required    bool            `json:"required"`
	Schema      ParamSchema     `json:"schema"`
	Example     json.RawMessage `json:"example,omitempty"`
}

// ParamSchema is a simplified schema for operation parameters (no ordered properties needed)
type ParamSchema struct {
	Type  string        `json:"type"`
	Items *ParamSchema  `json:"items,omitempty"`
	Enum  []interface{} `json:"enum,omitempty"`
}

type RequestBody struct {
	Description string               `json:"description"`
	Required    bool                 `json:"required"`
	Content     map[string]MediaType `json:"content"`
}

type MediaType struct {
	Schema  Schema          `json:"schema"`
	Example json.RawMessage `json:"example,omitempty"`
}

type Schema struct {
	Type        string          `json:"type"`
	Properties  OrderedMap      `json:"properties"`
	Required    []string        `json:"required,omitempty"`
	Ref         string          `json:"$ref,omitempty"`
	Example     json.RawMessage `json:"example,omitempty"`
	Description string          `json:"description,omitempty"`
	Enum        []interface{}   `json:"enum,omitempty"`
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

	dec := json.NewDecoder(bytes.NewReader(b))

	t, err := dec.Token()
	if err != nil {
		return err
	}
	if t != json.Delim('{') {
		return fmt.Errorf("expected {, got %v", t)
	}

	for dec.More() {
		t, err := dec.Token()
		if err != nil {
			return err
		}
		key := t.(string)
		m.Keys = append(m.Keys, key)

		var value Property
		if err := dec.Decode(&value); err != nil {
			return err
		}
		m.Values[key] = value
	}

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
	Type        string          `json:"type"`
	Format      string          `json:"format,omitempty"`
	Description string          `json:"description,omitempty"`
	Nullable    bool            `json:"nullable,omitempty"`
	Ref         string          `json:"$ref,omitempty"`
	AllOf       []Property      `json:"allOf,omitempty"`
	Example     json.RawMessage `json:"example,omitempty"`
	Items       *Property       `json:"items,omitempty"`
	Enum        []interface{}   `json:"enum,omitempty"`
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

// --- Helpers ---

// indentJSON re-indents raw JSON bytes with consistent 2-space indentation.
// This preserves the original key order since it operates on raw bytes.
func indentJSON(raw json.RawMessage) string {
	var buf bytes.Buffer
	if err := json.Indent(&buf, raw, "", "  "); err != nil {
		return string(raw)
	}
	return buf.String()
}

// indentJSONString indents a JSON string for display in code blocks.
func indentJSONString(s string) string {
	return indentJSON(json.RawMessage([]byte(s)))
}

// tocHidden returns an inline JSX span that is visually hidden but included in
// DocHeading's ID generation, making otherwise-duplicate headings unique.
// extractHeadingsFromDom strips .toc-hidden elements so the TOC shows clean text.
func tocHidden(context string) string {
	return fmt.Sprintf(`<span className="hidden toc-hidden"> %s</span>`, context)
}

// tagToSlug converts a tag name to a URL-safe slug
func tagToSlug(tag string) string {
	return strings.ToLower(strings.ReplaceAll(tag, " ", "-"))
}

// pathSortWeight assigns a sorting weight to API paths:
// 0 = collection paths (no path params), 1 = detail paths (with {id}), 2 = action paths
func pathSortWeight(p string) int {
	segments := strings.Split(p, "/")
	hasParam := false
	segmentsAfterParam := 0
	for _, s := range segments {
		if strings.HasPrefix(s, "{") {
			hasParam = true
			continue
		}
		if hasParam {
			segmentsAfterParam++
		}
	}
	if !hasParam {
		return 0
	}
	if segmentsAfterParam == 0 {
		return 1
	}
	return 2
}

// sortPaths sorts API paths deterministically:
// base collection first, then detail with {id}, then action paths
func sortPaths(paths []string) {
	sort.Slice(paths, func(i, j int) bool {
		wi, wj := pathSortWeight(paths[i]), pathSortWeight(paths[j])
		if wi != wj {
			return wi < wj
		}
		return paths[i] < paths[j]
	})
}

func getOrderedProperties(schema Schema) []OrderedProperty {
	ordered := make([]OrderedProperty, 0, len(schema.Properties.Values))
	for _, name := range schema.Properties.Keys {
		if prop, exists := schema.Properties.Values[name]; exists {
			ordered = append(ordered, OrderedProperty{Name: name, Property: prop})
		}
	}
	return ordered
}

func getTypeDisplay(prop Property) string {
	var base string
	switch {
	case prop.Ref != "":
		name := strings.TrimPrefix(prop.Ref, "#/components/schemas/")
		base = fmt.Sprintf("`%s`", name)
	case len(prop.AllOf) > 0:
		base = "`object`"
		for _, sub := range prop.AllOf {
			if sub.Ref != "" {
				name := strings.TrimPrefix(sub.Ref, "#/components/schemas/")
				base = fmt.Sprintf("`%s`", name)
				break
			}
		}
	case prop.Items != nil && prop.Items.Ref != "":
		name := strings.TrimPrefix(prop.Items.Ref, "#/components/schemas/")
		base = fmt.Sprintf("`%s[]`", name)
	case prop.Items != nil && prop.Items.Type != "":
		base = fmt.Sprintf("`%s[]`", prop.Items.Type)
	case prop.Type == "":
		base = "`object`"
	case prop.Format == "date-time":
		base = "`datetime`"
	case prop.Format == "decimal":
		base = "`decimal`"
	default:
		base = fmt.Sprintf("`%s`", prop.Type)
	}
	return base
}

// getTypeDisplayLinked is like getTypeDisplay but wraps $ref type names in
// markdown anchor links when the referenced schema is in the linkable set.
// If baseURL is non-empty, links point to baseURL#anchor (e.g. /api-reference/resources);
// otherwise they are same-page #anchor.
func getTypeDisplayLinked(prop Property, linkable map[string]bool, baseURL string) string {
	var base string
	linkTo := func(name string, anchor string) string {
		if !linkable[name] {
			return fmt.Sprintf("`%s`", name)
		}
		if baseURL != "" {
			return fmt.Sprintf("[`%s`](%s#%s)", name, baseURL, anchor)
		}
		return fmt.Sprintf("[`%s`](#%s)", name, anchor)
	}
	switch {
	case prop.Ref != "":
		name := strings.TrimPrefix(prop.Ref, "#/components/schemas/")
		base = linkTo(name, subObjectSlug(name))
	case len(prop.AllOf) > 0:
		base = "`object`"
		for _, sub := range prop.AllOf {
			if sub.Ref != "" {
				name := strings.TrimPrefix(sub.Ref, "#/components/schemas/")
				base = linkTo(name, subObjectSlug(name))
				break
			}
		}
	case prop.Items != nil && prop.Items.Ref != "":
		name := strings.TrimPrefix(prop.Items.Ref, "#/components/schemas/")
		anchor := subObjectSlug(name)
		if linkable[name] {
			if baseURL != "" {
				base = fmt.Sprintf("[`%s[]`](%s#%s)", name, baseURL, anchor)
			} else {
				base = fmt.Sprintf("[`%s[]`](#%s)", name, anchor)
			}
		} else {
			base = fmt.Sprintf("`%s[]`", name)
		}
	case prop.Items != nil && prop.Items.Type != "":
		base = fmt.Sprintf("`%s[]`", prop.Items.Type)
	case prop.Type == "":
		base = "`object`"
	case prop.Format == "date-time":
		base = "`datetime`"
	case prop.Format == "decimal":
		base = "`decimal`"
	default:
		base = fmt.Sprintf("`%s`", prop.Type)
	}
	return base
}

func getNullableDisplay(prop Property) string {
	if prop.Nullable {
		return "<center>Yes</center>"
	}
	return ""
}

// subObjectSlug computes the heading slug for a sub-resource section.
// The heading format is: ### The {Name} resource<tocHidden> ({lower})</tocHidden>
// DocHeading extracts all text (including toc-hidden) for slug generation.
func subObjectSlug(name string) string {
	lower := strings.ToLower(strings.ReplaceAll(name, "_", "-"))
	return createSlug(fmt.Sprintf("The %s resource (%s)", name, lower))
}

// escapeDescriptionForMDX wraps JSON-like {...} substrings in backticks so MDX
// does not interpret them as JS expressions (which causes "Could not parse expression with acorn").
func escapeDescriptionForMDX(desc string) string {
	var out strings.Builder
	i := 0
	for i < len(desc) {
		if desc[i] == '{' {
			depth := 1
			j := i + 1
			for j < len(desc) && depth > 0 {
				switch desc[j] {
				case '{':
					depth++
				case '}':
					depth--
				}
				j++
			}
			if depth == 0 {
				out.WriteByte('`')
				out.WriteString(desc[i:j])
				out.WriteByte('`')
				i = j
				continue
			}
		}
		out.WriteByte(desc[i])
		i++
	}
	return out.String()
}

// descWithEnum appends enum info and collapses newlines into spaces for table cells.
func descWithEnum(prop Property) string {
	desc := strings.ReplaceAll(prop.Description, "\n", " ")
	if len(prop.Enum) == 1 {
		desc += fmt.Sprintf(" Always `%v`.", prop.Enum[0])
	} else if len(prop.Enum) > 1 {
		var vals []string
		for _, v := range prop.Enum {
			vals = append(vals, fmt.Sprintf("`%v`", v))
		}
		desc += fmt.Sprintf(" Values: %s", strings.Join(vals, ", "))
	}
	return desc
}

func getDescriptionWithEnum(prop Property) string {
	return escapeDescriptionForMDX(descWithEnum(prop))
}

// splitDescriptionExample extracts "For example: {...}" from a property description
// so the table cell can show only the main text and the JSON can be rendered as a
// code block below the table. Returns (mainDescForCell, exampleJSON, true) when
// found, or (fullDesc, "", false).
func splitDescriptionExample(prop Property) (cellDesc string, exampleJSON string, hasExample bool) {
	desc := descWithEnum(prop)
	idx := strings.Index(desc, "For example: ")
	if idx < 0 {
		return escapeDescriptionForMDX(desc), "", false
	}
	mainDesc := strings.TrimSpace(desc[:idx])
	start := idx + len("For example: ")
	for start < len(desc) && desc[start] == ' ' {
		start++
	}
	if start >= len(desc) || desc[start] != '{' {
		return escapeDescriptionForMDX(desc), "", false
	}
	depth := 1
	end := start + 1
	for end < len(desc) && depth > 0 {
		switch desc[end] {
		case '{':
			depth++
		case '}':
			depth--
		}
		end++
	}
	if depth != 0 {
		return escapeDescriptionForMDX(desc), "", false
	}
	exampleJSON = desc[start:end]
	return escapeDescriptionForMDX(mainDesc), exampleJSON, true
}

// getTagDescription finds the description for a tag from the spec's top-level tags
func getTagDescription(tagName string, tags []Tag) string {
	for _, tag := range tags {
		if tag.Name == tagName {
			return tag.Description
		}
	}
	return ""
}

// collectSubSchemaRefs walks a schema's properties and returns the names of all
// referenced sub-schemas (via $ref or allOf), excluding List_ wrappers and the
// resource itself. It recurses into sub-schemas to capture transitive refs.
func collectSubSchemaRefs(schema Schema, spec OpenAPISpec, exclude map[string]bool) []string {
	var refs []string
	seen := make(map[string]bool)
	for k := range exclude {
		seen[k] = true
	}

	var walk func(s Schema)
	walk = func(s Schema) {
		for _, key := range s.Properties.Keys {
			prop := s.Properties.Values[key]
			var refName string
			switch {
			case prop.Ref != "":
				refName = strings.TrimPrefix(prop.Ref, "#/components/schemas/")
			case len(prop.AllOf) > 0:
				for _, sub := range prop.AllOf {
					if sub.Ref != "" {
						refName = strings.TrimPrefix(sub.Ref, "#/components/schemas/")
						break
					}
				}
			case prop.Items != nil && prop.Items.Ref != "":
				refName = strings.TrimPrefix(prop.Items.Ref, "#/components/schemas/")
			}
			if refName == "" || seen[refName] || strings.HasPrefix(refName, "List_") {
				continue
			}
			seen[refName] = true
			if sub, ok := spec.Components.Schemas[refName]; ok {
				refs = append(refs, refName)
				walk(sub)
			}
		}
	}
	walk(schema)
	return refs
}

// inferMainResource finds the main resource schema by looking for List_<Name> response refs
func inferMainResource(paths map[string]PathItem, spec OpenAPISpec) (string, Schema, bool) {
	for _, item := range paths {
		ops := []*Operation{item.Get, item.Post, item.Put, item.Delete, item.Patch}
		for _, op := range ops {
			if op == nil {
				continue
			}
			for _, resp := range op.Responses {
				if resp.Content == nil {
					continue
				}
				mediaType, ok := resp.Content["application/json"]
				if !ok || mediaType.Schema.Ref == "" {
					continue
				}
				refName := strings.TrimPrefix(mediaType.Schema.Ref, "#/components/schemas/")
				if strings.HasPrefix(refName, "List_") {
					resourceName := strings.TrimPrefix(refName, "List_")
					if schema, ok := spec.Components.Schemas[resourceName]; ok {
						return resourceName, schema, true
					}
				}
			}
		}
	}
	return "", Schema{}, false
}

// inferDetailResource finds the detail resource schema by looking for GET responses
// on parameterized paths (e.g. /v1/resource/{id}) that return a non-List_ schema.
func inferDetailResource(paths map[string]PathItem, spec OpenAPISpec) (string, Schema, bool) {
	for apiPath, item := range paths {
		if !strings.Contains(apiPath, "{") {
			continue
		}
		if item.Get == nil {
			continue
		}
		for code, resp := range item.Get.Responses {
			if !strings.HasPrefix(code, "2") {
				continue
			}
			if resp.Content == nil {
				continue
			}
			mediaType, ok := resp.Content["application/json"]
			if !ok || mediaType.Schema.Ref == "" {
				continue
			}
			refName := strings.TrimPrefix(mediaType.Schema.Ref, "#/components/schemas/")
			if strings.HasPrefix(refName, "List_") {
				continue
			}
			if schema, ok := spec.Components.Schemas[refName]; ok {
				return refName, schema, true
			}
		}
	}
	return "", Schema{}, false
}

func resolveSchema(ref string, spec OpenAPISpec) (Schema, string, bool) {
	name := strings.TrimPrefix(ref, "#/components/schemas/")
	schema, ok := spec.Components.Schemas[name]
	return schema, name, ok
}

// --- Main ---

func main() {
	specPath := filepath.Join("specs", "public_openapi_spec.json")
	if _, err := os.Stat(specPath); os.IsNotExist(err) {
		fmt.Println("No OpenAPI spec found, skipping API endpoint generation")
		return
	}

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

	apiRefDir := filepath.Join("src", "docs", "developer-resources", "api-reference")

	// Clean up old generated files (both old and new locations)
	os.RemoveAll(filepath.Join("src", "docs", "api-reference"))
	os.RemoveAll(apiRefDir)

	if err := os.MkdirAll(apiRefDir, 0755); err != nil {
		fmt.Printf("Error creating directory: %v\n", err)
		os.Exit(1)
	}

	// Group endpoints by their operation tag
	tagPaths := make(map[string]map[string]PathItem)
	for apiPath, item := range spec.Paths {
		ops := []struct {
			method string
			op     *Operation
		}{
			{"GET", item.Get},
			{"POST", item.Post},
			{"PUT", item.Put},
			{"PATCH", item.Patch},
			{"DELETE", item.Delete},
		}
		for _, opInfo := range ops {
			if opInfo.op == nil {
				continue
			}
			tags := opInfo.op.Tags
			if len(tags) == 0 {
				tags = []string{"Other"}
			}
			for _, tag := range tags {
				if _, exists := tagPaths[tag]; !exists {
					tagPaths[tag] = make(map[string]PathItem)
				}
				existing := tagPaths[tag][apiPath]
				switch opInfo.method {
				case "GET":
					existing.Get = opInfo.op
				case "POST":
					existing.Post = opInfo.op
				case "PUT":
					existing.Put = opInfo.op
				case "DELETE":
					existing.Delete = opInfo.op
				case "PATCH":
					existing.Patch = opInfo.op
				}
				tagPaths[tag][apiPath] = existing
			}
		}
	}

	// Sort tag names for deterministic output
	var tagNames []string
	for tag := range tagPaths {
		tagNames = append(tagNames, tag)
	}
	sort.Strings(tagNames)

	// Collect union of all sub-schemas and list-item schemas across tags for the shared resources page.
	// This allows us to document them once on resources.mdx and link from tag pages instead of inlining.
	allObjectPageSchemas := make(map[string]bool)
	for _, tagName := range tagNames {
		paths := tagPaths[tagName]
		listResourceName, listResourceSchema, hasListResource := inferMainResource(paths, spec)
		detailResourceName, detailResourceSchema, hasDetailResource := inferDetailResource(paths, spec)
		var resourceName string
		var resourceSchema Schema
		var listItemName string
		var listItemSchema Schema
		if hasDetailResource && hasListResource && detailResourceName != listResourceName {
			resourceName = detailResourceName
			resourceSchema = detailResourceSchema
			listItemName = listResourceName
			listItemSchema = listResourceSchema
		} else if hasListResource {
			resourceName = listResourceName
			resourceSchema = listResourceSchema
		} else if hasDetailResource {
			resourceName = detailResourceName
			resourceSchema = detailResourceSchema
		}
		if resourceName == "" {
			continue
		}
		exclude := map[string]bool{resourceName: true}
		subRefs := collectSubSchemaRefs(resourceSchema, spec, exclude)
		for _, ref := range subRefs {
			allObjectPageSchemas[ref] = true
		}
		if listItemName != "" {
			allObjectPageSchemas[listItemName] = true
			exclude[listItemName] = true
			listItemSubRefs := collectSubSchemaRefs(listItemSchema, spec, exclude)
			for _, ref := range listItemSubRefs {
				allObjectPageSchemas[ref] = true
			}
		}
	}

	// Generate shared resources page so tag pages can link here instead of inlining sub-objects.
	resourcesPagePath := filepath.Join(apiRefDir, "resources.mdx")
	if len(allObjectPageSchemas) > 0 {
		var objectNames []string
		for name := range allObjectPageSchemas {
			objectNames = append(objectNames, name)
		}
		sort.Strings(objectNames)
		resourcesContent := `---
title: "Resources"
subtitle: "Shared resource types used across API responses"
route: "/api-reference/resources"
nav:
    title: "Resources"
    section: "API"
    subsection: "API Reference"
    order: 2
---

Reference for shared resource types.

`
		for _, subName := range objectNames {
			subSchema := spec.Components.Schemas[subName]
			anchor := strings.ToLower(strings.ReplaceAll(subName, "_", "-"))
			resourcesContent += fmt.Sprintf("### The %s resource%s\n\n", subName, tocHidden("("+anchor+")"))
			if subSchema.Description != "" {
				resourcesContent += fmt.Sprintf("%s\n\n", subSchema.Description)
			}
			subProps := getOrderedProperties(subSchema)
			if len(subProps) > 0 {
				resourcesContent += "| Field | Type | Nullable | Required | Description |\n"
				resourcesContent += "|-------|------|----------|----------|-------------|\n"
				var exampleShapes []struct{ name, json string }
				for _, sp := range subProps {
					required := ""
					for _, req := range subSchema.Required {
						if req == sp.Name {
							required = "<center>Yes</center>"
							break
						}
					}
					cellDesc, exampleJSON, hasExample := splitDescriptionExample(sp.Property)
					if hasExample {
						exampleShapes = append(exampleShapes, struct{ name, json string }{sp.Name, exampleJSON})
					}
					resourcesContent += fmt.Sprintf("| `%s` | %s | %s | %s | %s |\n",
						sp.Name, getTypeDisplayLinked(sp.Property, allObjectPageSchemas, ""), getNullableDisplay(sp.Property), required, cellDesc)
				}
				resourcesContent += "\n"
				for _, ex := range exampleShapes {
					resourcesContent += fmt.Sprintf("**Example shape for `%s`:**\n\n```json\n%s\n```\n\n", ex.name, indentJSONString(ex.json))
				}
			}
			if len(subSchema.Example) > 0 {
				resourcesContent += fmt.Sprintf("<p className=\"text-base font-semibold mt-6 mb-2\">Example of %s</p>\n\n", subName)
				resourcesContent += "```json\n"
				resourcesContent += indentJSON(subSchema.Example) + "\n"
				resourcesContent += "```\n\n"
			}
		}
		if err := os.WriteFile(resourcesPagePath, []byte(resourcesContent), 0644); err != nil {
			fmt.Printf("Error writing resources page %s: %v\n", resourcesPagePath, err)
		} else {
			fmt.Printf("Generated: %s\n", resourcesPagePath)
		}
	}

	resourcesBaseURL := "/api-reference/resources"

	// Cross-links from API reference pages to their corresponding guide pages.
	// Maps tag slug to {pathKey, label} for generating InternalLink at the top.
	type guideLink struct {
		PathKey string
		Label   string
	}
	tagGuideLinks := map[string]guideLink{
		"request-log-management": {PathKey: "api.requestLogs", Label: "Request Logs guide"},
	}

	// Generate a file for each tag group
	for i, tagName := range tagNames {
		paths := tagPaths[tagName]
		tagDesc := getTagDescription(tagName, spec.Tags)
		slug := tagToSlug(tagName)

		// Escape quotes and collapse newlines for YAML frontmatter
		escapedTitle := strings.ReplaceAll(tagName, `"`, `\"`)
		escapedDesc := strings.ReplaceAll(strings.ReplaceAll(tagDesc, "\n", " "), `"`, `\"`)

		// Build frontmatter
		content := fmt.Sprintf(`---
title: "%s"
subtitle: "%s"
route: "/api-reference/%s"
nav:
    title: "%s"
    section: "API"
    subsection: "API Reference"
    order: %d
---

`, escapedTitle, escapedDesc, slug, escapedTitle, i+3)

		// Add cross-link to guide page if one exists
		if guide, ok := tagGuideLinks[slug]; ok {
			content += fmt.Sprintf(
				"For a conceptual overview, Dashboard usage, and debugging tips, see the <InternalLink pathKey=\"%s\" text=\"%s\" />.\n\n",
				guide.PathKey, guide.Label,
			)
		}

		// Infer and show main resource schema
		listResourceName, listResourceSchema, hasListResource := inferMainResource(paths, spec)
		detailResourceName, detailResourceSchema, hasDetailResource := inferDetailResource(paths, spec)

		var resourceName string
		var resourceSchema Schema
		var hasResource bool
		var listItemName string

		if hasDetailResource && hasListResource && detailResourceName != listResourceName {
			// Divergent schemas: detail is primary, list item is secondary (linked from objects page)
			resourceName = detailResourceName
			resourceSchema = detailResourceSchema
			hasResource = true
			listItemName = listResourceName
		} else if hasListResource {
			resourceName = listResourceName
			resourceSchema = listResourceSchema
			hasResource = true
		} else if hasDetailResource {
			resourceName = detailResourceName
			resourceSchema = detailResourceSchema
			hasResource = true
		}

		if hasResource {
			content += fmt.Sprintf("## The %s resource\n\n", resourceName)
			if resourceSchema.Description != "" {
				content += fmt.Sprintf("%s\n\n", resourceSchema.Description)
			}

			orderedProps := getOrderedProperties(resourceSchema)
			if len(orderedProps) > 0 {
				content += "| Field | Type | Nullable | Required | Description |\n"
				content += "|-------|------|----------|----------|-------------|\n"
				var exampleShapes []struct{ name, json string }
				for _, op := range orderedProps {
					required := ""
					for _, req := range resourceSchema.Required {
						if req == op.Name {
							required = "<center>Yes</center>"
							break
						}
					}
					cellDesc, exampleJSON, hasExample := splitDescriptionExample(op.Property)
					if hasExample {
						exampleShapes = append(exampleShapes, struct{ name, json string }{op.Name, exampleJSON})
					}
					content += fmt.Sprintf("| `%s` | %s | %s | %s | %s |\n",
						op.Name, getTypeDisplayLinked(op.Property, allObjectPageSchemas, resourcesBaseURL), getNullableDisplay(op.Property), required, cellDesc)
				}
				content += "\n"
				for _, ex := range exampleShapes {
					content += fmt.Sprintf("**Example shape for `%s`:**\n\n```json\n%s\n```\n\n", ex.name, indentJSONString(ex.json))
				}
			}

			if len(resourceSchema.Example) > 0 {
				content += fmt.Sprintf("<p className=\"text-lg font-semibold mt-6 mb-2\">Example of %s</p>\n\n", resourceName)
				content += "```json\n"
				content += indentJSON(resourceSchema.Example) + "\n"
				content += "```\n\n"
			}
		}

		// Collect and sort paths deterministically
		var sortedPaths []string
		for p := range paths {
			sortedPaths = append(sortedPaths, p)
		}
		sortPaths(sortedPaths)

		// Generate endpoint sections
		content += "## Endpoints\n\n"

		firstEndpoint := true
		for _, apiPath := range sortedPaths {
			item := paths[apiPath]
			ops := []struct {
				method string
				op     *Operation
			}{
				{"GET", item.Get},
				{"POST", item.Post},
				{"PUT", item.Put},
				{"PATCH", item.Patch},
				{"DELETE", item.Delete},
			}

			for _, opInfo := range ops {
				if opInfo.op == nil {
					continue
				}

				if !firstEndpoint {
					content += "---\n\n"
				}
				firstEndpoint = false

					if opInfo.op.XPreview {
					content += fmt.Sprintf("### %s <span className=\"toc-hidden\"><BetaTag /></span>\n\n", opInfo.op.Summary)
				} else {
					content += fmt.Sprintf("### %s\n\n", opInfo.op.Summary)
				}
				content += fmt.Sprintf("%s\n\n", opInfo.op.Description)
				content += fmt.Sprintf("```http\n%s %s\n```\n\n", opInfo.method, apiPath)

				// Parameters
				if len(opInfo.op.Parameters) > 0 {
					var pathParams, queryParams []Parameter
					for _, p := range opInfo.op.Parameters {
						switch p.In {
						case "path":
							pathParams = append(pathParams, p)
						case "query":
							queryParams = append(queryParams, p)
						}
					}

					if len(pathParams) > 0 {
						content += fmt.Sprintf("#### Path Parameters%s\n\n", tocHidden("for "+opInfo.op.Summary))
						content += "| Parameter | Type | Required | Description |\n"
						content += "|-----------|------|----------|-------------|\n"
						for _, p := range pathParams {
							required := ""
							if p.Required {
								required = "<center>Yes</center>"
							}
							paramType := p.Schema.Type
							if paramType == "" {
								paramType = "string"
							}
							content += fmt.Sprintf("| `%s` | `%s` | %s | %s |\n",
								p.Name, paramType, required, escapeDescriptionForMDX(strings.ReplaceAll(p.Description, "\n", " ")))
						}
						content += "\n"
					}

					if len(queryParams) > 0 {
						content += fmt.Sprintf("#### Query Parameters%s\n\n", tocHidden("for "+opInfo.op.Summary))
						content += "| Parameter | Type | Required | Description |\n"
						content += "|-----------|------|----------|-------------|\n"
						for _, p := range queryParams {
							required := ""
							if p.Required {
								required = "<center>Yes</center>"
							}
							paramType := p.Schema.Type
							if paramType == "" {
								paramType = "string"
							}
							desc := strings.ReplaceAll(p.Description, "\n", " ")
							if paramType == "array" && p.Schema.Items != nil && len(p.Schema.Items.Enum) > 0 {
								var enumVals []string
								for _, v := range p.Schema.Items.Enum {
									enumVals = append(enumVals, fmt.Sprintf("`%v`", v))
								}
								desc += fmt.Sprintf(" Values: %s", strings.Join(enumVals, ", "))
							}
							content += fmt.Sprintf("| `%s` | `%s` | %s | %s |\n",
								p.Name, paramType, required, escapeDescriptionForMDX(desc))
						}
						content += "\n"
					}
				}

				// Request body
				if opInfo.op.RequestBody != nil {
					content += fmt.Sprintf("#### Request Body%s\n\n", tocHidden("for "+opInfo.op.Summary))

					if mediaType, ok := opInfo.op.RequestBody.Content["application/json"]; ok {
						schema := mediaType.Schema
						if schema.Ref != "" {
							if resolved, _, ok := resolveSchema(schema.Ref, spec); ok {
								schema = resolved
							}
						}

						orderedProps := getOrderedProperties(schema)
						if len(orderedProps) > 0 {
							content += "| Field | Type | Nullable | Required | Description |\n"
							content += "|-------|------|----------|----------|-------------|\n"
							var exampleShapes []struct{ name, json string }
							for _, op := range orderedProps {
								required := ""
								for _, req := range schema.Required {
									if req == op.Name {
										required = "<center>Yes</center>"
										break
									}
								}
								cellDesc, exampleJSON, hasExample := splitDescriptionExample(op.Property)
								if hasExample {
									exampleShapes = append(exampleShapes, struct{ name, json string }{op.Name, exampleJSON})
								}
								content += fmt.Sprintf("| `%s` | %s | %s | %s | %s |\n",
									op.Name, getTypeDisplayLinked(op.Property, allObjectPageSchemas, resourcesBaseURL), getNullableDisplay(op.Property), required, cellDesc)
							}
							content += "\n"
							for _, ex := range exampleShapes {
								content += fmt.Sprintf("**Example shape for `%s`:**\n\n```json\n%s\n```\n\n", ex.name, indentJSONString(ex.json))
							}
						}

						if len(schema.Example) > 0 {
							content += "**Example:**\n\n"
							content += "```json\n"
							content += indentJSON(schema.Example) + "\n"
							content += "```\n\n"
						} else if len(mediaType.Example) > 0 {
							content += "**Example:**\n\n"
							content += "```json\n"
							content += indentJSON(mediaType.Example) + "\n"
							content += "```\n\n"
						}
					}
				}

				// Responses
				content += fmt.Sprintf("#### Response%s\n\n", tocHidden("for "+opInfo.op.Summary))

				var codes []string
				for code := range opInfo.op.Responses {
					codes = append(codes, code)
				}
				sort.Strings(codes)

				// Show success responses in detail
				for _, code := range codes {
					resp := opInfo.op.Responses[code]
					if !strings.HasPrefix(code, "2") {
						continue
					}

					content += fmt.Sprintf("**`%s`** %s\n\n", code, escapeDescriptionForMDX(resp.Description))

					if resp.Content != nil {
						if mediaType, ok := resp.Content["application/json"]; ok {
							if mediaType.Schema.Ref != "" {
								if _, schemaName, ok := resolveSchema(mediaType.Schema.Ref, spec); ok {
									if schemaName == resourceName && hasResource {
										// Link to the resource section on the same page
										anchor := strings.ToLower(strings.ReplaceAll(resourceName, "_", "-"))
										content += fmt.Sprintf("Returns a [`%s`](#the-%s-resource) object.\n\n", schemaName, anchor)
									} else if strings.HasPrefix(schemaName, "List_") {
										// Paginated list — link to inner resource and pagination docs
										innerName := strings.TrimPrefix(schemaName, "List_")
										if innerName == resourceName && hasResource {
											anchor := strings.ToLower(strings.ReplaceAll(resourceName, "_", "-"))
											content += fmt.Sprintf("Returns a paginated list of [`%s`](#the-%s-resource) objects. See [Pagination](/api/pagination) for envelope details.\n\n", innerName, anchor)
										} else if listItemName != "" && innerName == listItemName {
											anchor := subObjectSlug(listItemName)
											content += fmt.Sprintf("Returns a paginated list of [`%s`](%s#%s) objects. See [Pagination](/api/pagination) for envelope details.\n\n", innerName, resourcesBaseURL, anchor)
										} else {
											content += fmt.Sprintf("Returns a paginated list of `%s` objects. See [Pagination](/api/pagination) for envelope details.\n\n", innerName)
										}
									} else {
										// Other schema — no meaningful anchor, just inline code
										content += fmt.Sprintf("Returns a `%s` object.\n\n", schemaName)
									}
								}
							}

							if len(mediaType.Example) > 0 {
								content += "**Example:**\n\n"
								content += "```json\n"
								content += indentJSON(mediaType.Example) + "\n"
								content += "```\n\n"
							}
						}
					}
				}

				}
		}

		// Write the file
		filePath := filepath.Join(apiRefDir, slug+".mdx")
		if err := os.WriteFile(filePath, []byte(content), 0644); err != nil {
			fmt.Printf("Error writing file %s: %v\n", filePath, err)
		} else {
			fmt.Printf("Generated: %s\n", filePath)
		}
	}

	fmt.Printf("Generated %d API reference files\n", len(tagNames))
}
