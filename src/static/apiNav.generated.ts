// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
//
// Compact per-version endpoint listing for the API reference sidenav and
// version selector. Deliberately small so it is safe to ship to the client.

export interface ApiNavEntry {
    domain: string;
    /** Static URL segments of the endpoint path, used to build the nested sidenav tree. */
    segments: string[];
    tagSlug: string;
    endpointSlug: string;
    /** Short action label shown in the sidenav, e.g. "List", "Create". */
    label: string;
}

export const apiNavEntriesByVersion: Record<string, ApiNavEntry[]> = {
    "1.0.forge-preview.2": [
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "create-api-key",
            "label": "Create"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "list-api-keys",
            "label": "List"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "retrieve-api-key",
            "label": "Retrieve"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "revoke-api-key",
            "label": "Delete"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "rotate-api-key",
            "label": "Rotate API Key"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "create-sandbox",
            "label": "Create"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "list-sandboxes",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "retrieve-sandbox",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "delete-sandbox",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log-management",
            "endpointSlug": "list-request-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log-management",
            "endpointSlug": "retrieve-request-log",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "list-audit-events",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events",
                "resource-types"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "list-audit-event-resource-types",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "retrieve-audit-event",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "create-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "update-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "list-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "retrieve-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "delete-unit",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "create-unit-group",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "update-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "list-unit-groups",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "retrieve-unit-group",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "delete-unit-group",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "create-unit-group-associated-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "update-unit-group-associated-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "list-unit-group-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "retrieve-unit-group-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "delete-unit-group-associated-unit",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "create-account-group",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "update-account-group",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "list-account-groups",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "retrieve-account-group",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "delete-account-group",
            "label": "Delete"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "create-payment-term",
            "label": "Create"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "update-payment-term",
            "label": "Update"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "list-payment-terms",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "retrieve-payment-term",
            "label": "Retrieve"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "delete-payment-term",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "create-shipping-term",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "update-shipping-term",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "list-shipping-terms",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "retrieve-shipping-term",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "delete-shipping-term",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "create-address",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "update-address",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "list-addresses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "retrieve-address",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "delete-address",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "addresses",
                "suggestions"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "list-address-suggestions",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "validate-address",
            "label": "Validate Address"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "list-account-statuses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "retrieve-account-status",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "create-account-user",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "update-account-user",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "list-account-users",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "retrieve-account-user",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "activate-account-user",
            "label": "Activate Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "disable-account-user",
            "label": "Disable Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "remove-account-user",
            "label": "Remove Account User"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "create-property",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "update-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "list-properties",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "retrieve-property",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "delete-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "create-attribute",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "update-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "list-attributes",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "retrieve-attribute",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "delete-attribute",
            "label": "Delete"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "create-account-integration",
            "label": "Create"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "update-account-integration",
            "label": "Update"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "list-account-integrations",
            "label": "List"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "delete-account-integration",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "list-priorities",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "retrieve-priority",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "create-carrier",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "update-carrier",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "list-carriers",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "retrieve-carrier",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "delete-carrier",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "create-service-level",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "update-service-level",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "list-service-levels",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "retrieve-service-level",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "delete-service-level",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "list-items",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "retrieve-item",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "add-item-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "category"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "change-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "retrieve-item-inventory",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "remove-item-attribute",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "create-item-category",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "update-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "list-item-categories",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "retrieve-item-category",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "delete-item-category",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "add-item-category-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "unit-groups"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "change-item-category-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "remove-item-category-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "create-material",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "update-material",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "list-materials",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "retrieve-material",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "delete-material",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "create-part",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "update-part",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "list-parts",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "retrieve-part",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "delete-part",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "list-email-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "retrieve-email-log",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "create-customer",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "update-customer",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "list-customers",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "delete-customer",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "merge-customers",
            "label": "Merge Customers"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "create-product-line",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "update-product-line",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "list-product-lines",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "retrieve-product-line",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "delete-product-line",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "create-product",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "update-product",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "list-products",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "retrieve-product",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "delete-product",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products",
                "product-line"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "change-product-product-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "statuses"
            ],
            "tagSlug": "sales-order-statuses",
            "endpointSlug": "list-sales-order-statuses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-sales-order",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "list-sales-orders",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "adjustment-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-adjustment-types",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-methods"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-methods",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "create-location",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "update-location",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "list-location-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "list-locations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "retrieve-location-type",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "retrieve-location",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "delete-location",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "create-scanning-station",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "update-scanning-station",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "list-scanning-stations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "retrieve-scanning-station",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "delete-scanning-station",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "create-role",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "update-role",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "list-roles",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "retrieve-role",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "delete-role",
            "label": "Delete"
        }
    ],
    "1.0.forge-preview.1": [
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "create-api-key",
            "label": "Create"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "list-api-keys",
            "label": "List"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "retrieve-api-key",
            "label": "Retrieve"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "revoke-api-key",
            "label": "Delete"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "rotate-api-key",
            "label": "Rotate API Key"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "create-sandbox",
            "label": "Create"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "list-sandboxes",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "retrieve-sandbox",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "delete-sandbox",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log-management",
            "endpointSlug": "list-request-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log-management",
            "endpointSlug": "retrieve-request-log",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "list-audit-events",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events",
                "resource-types"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "list-audit-event-resource-types",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "retrieve-audit-event",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "create-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "update-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "list-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "retrieve-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "delete-unit",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "create-unit-group",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "update-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "list-unit-groups",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "retrieve-unit-group",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "delete-unit-group",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "create-unit-group-associated-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "update-unit-group-associated-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "list-unit-group-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "retrieve-unit-group-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "delete-unit-group-associated-unit",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "create-account-group",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "update-account-group",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "list-account-groups",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "retrieve-account-group",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "delete-account-group",
            "label": "Delete"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "create-payment-term",
            "label": "Create"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "update-payment-term",
            "label": "Update"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "list-payment-terms",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "retrieve-payment-term",
            "label": "Retrieve"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "delete-payment-term",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "create-shipping-term",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "update-shipping-term",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "list-shipping-terms",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "retrieve-shipping-term",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "delete-shipping-term",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "create-address",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "update-address",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "list-addresses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "retrieve-address",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "delete-address",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "addresses",
                "suggestions"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "list-address-suggestions",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "validate-address",
            "label": "Validate Address"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "list-account-statuses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "retrieve-account-status",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "create-account-user",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "update-account-user",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "list-account-users",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "retrieve-account-user",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "activate-account-user",
            "label": "Activate Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "disable-account-user",
            "label": "Disable Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "remove-account-user",
            "label": "Remove Account User"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "create-property",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "update-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "list-properties",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "retrieve-property",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "delete-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "create-attribute",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "update-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "list-attributes",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "retrieve-attribute",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "delete-attribute",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "list-priorities",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "retrieve-priority",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "create-carrier",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "update-carrier",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "list-carriers",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "retrieve-carrier",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "delete-carrier",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "create-service-level",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "update-service-level",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "list-service-levels",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "retrieve-service-level",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "delete-service-level",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "list-items",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "retrieve-item",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "add-item-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "category"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "change-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "retrieve-item-inventory",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "remove-item-attribute",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "create-item-category",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "update-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "list-item-categories",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "retrieve-item-category",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "delete-item-category",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "add-item-category-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "unit-groups"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "change-item-category-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "remove-item-category-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "create-material",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "update-material",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "list-materials",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "retrieve-material",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "delete-material",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "create-part",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "update-part",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "list-parts",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "retrieve-part",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "delete-part",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "list-email-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "retrieve-email-log",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "create-customer",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "update-customer",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "list-customers",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "delete-customer",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "merge-customers",
            "label": "Merge Customers"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "create-product-line",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "update-product-line",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "list-product-lines",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "retrieve-product-line",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "delete-product-line",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "create-product",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "update-product",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "list-products",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "retrieve-product",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "delete-product",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products",
                "product-line"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "change-product-product-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "statuses"
            ],
            "tagSlug": "sales-order-statuses",
            "endpointSlug": "list-sales-order-statuses",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "adjustment-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-adjustment-types",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-methods"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-methods",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "create-location",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "update-location",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "list-location-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "list-locations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "retrieve-location-type",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "retrieve-location",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "delete-location",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "create-scanning-station",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "update-scanning-station",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "list-scanning-stations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "retrieve-scanning-station",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "delete-scanning-station",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "create-role",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "update-role",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "list-roles",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "retrieve-role",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "delete-role",
            "label": "Delete"
        }
    ]
};

export function getApiNavEntries(version: string): ApiNavEntry[] {
    return apiNavEntriesByVersion[version] ?? [];
}
