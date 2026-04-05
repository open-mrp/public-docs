// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export interface PagePreview {
    title: string;
    subtitle?: string;
}

export const pagePreviewData: Record<string, PagePreview> = {
    "/development": {
        "title": "Developer resources",
        "subtitle": "Technical documentation, API references, and guides for developers."
    },
    "/workflows": {
        "title": "Workflows",
        "subtitle": "End-to-end guides for common business processes in Augno."
    },
    "/api-reference": {
        "title": "API Reference",
        "subtitle": "Complete API documentation for all endpoints"
    },
    "/api/overview": {
        "title": "Augno's APIs",
        "subtitle": "Learn more about Augno's APIs."
    },
    "/build-products/overview": {
        "title": "Build Products",
        "subtitle": "Purchasing, manufacturing, production tracking, and inventory management."
    },
    "/dashboards/overview": {
        "title": "Dashboards",
        "subtitle": "Analytics and reporting dashboards that give you real-time visibility into sales, operations, finances, and forecasting."
    },
    "/collect-payments/overview": {
        "title": "Collect Payments",
        "subtitle": "Learn about collecting payments in Augno."
    },
    "/generate-sales/overview": {
        "title": "Generate Sales",
        "subtitle": "Customers, pricing, orders, and the sales team - everything that drives revenue in Augno."
    },
    "/generate-sales/customer-portal": {
        "title": "Customer portal",
        "subtitle": "A branded, self-service portal where your customers register, place orders, submit payments, and track inventory."
    },
    "/manage-account/security": {
        "title": "Security",
        "subtitle": "Manage your password and keep your account secure."
    },
    "/manage-account/overview": {
        "title": "Manage Your Account",
        "subtitle": "Configure your account settings, team, integrations, security, and billing."
    },
    "/manage-account/plans-and-billing": {
        "title": "Plans and billing",
        "subtitle": "View your subscription, switch plans, and manage billing through Stripe."
    },
    "/manage-account/api-keys": {
        "title": "API keys",
        "subtitle": "Create, rotate, and revoke API keys for programmatic access to Augno."
    },
    "/manage-account/sandboxes": {
        "title": "Sandboxes",
        "subtitle": "Create isolated testing environments to develop and experiment without affecting production data."
    },
    "/manage-account/integrations": {
        "title": "Integrations",
        "subtitle": "Connect third-party services like Stripe and Shippo to your Augno account."
    },
    "/ship-products/packing/overview": {
        "title": "Packing",
        "subtitle": "Pack picked items into shipping cases and create shipments ready for the carrier."
    },
    "/ship-products/overview": {
        "title": "Ship Products",
        "subtitle": "Learn about shipping products in Augno."
    },
    "/ship-products/picking/overview": {
        "title": "Picking",
        "subtitle": "Select and pull the right products from inventory to fulfill a sales order."
    },
    "/ship-products/shipping/overview": {
        "title": "Shipping",
        "subtitle": "Generate shipping labels, assign tracking numbers, and ship packed orders through your carrier."
    },
    "/get-started": {
        "title": "Get started",
        "subtitle": "Create an account and learn how to build on Augno."
    },
    "/api-reference/audit-event-management/list-audit-events": {
        "title": "List Audit Events",
        "subtitle": "GET /v1/core/audit-events"
    },
    "/api-reference/audit-event-management/get-audit-event": {
        "title": "Get Audit Event",
        "subtitle": "GET /v1/core/audit-events/{id}"
    },
    "/api-reference/roles/delete-role": {
        "title": "Delete Role",
        "subtitle": "DELETE /v1/identity/roles/{id}"
    },
    "/api-reference/roles/create-role": {
        "title": "Create Role",
        "subtitle": "POST /v1/identity/roles"
    },
    "/api-reference/roles/update-role": {
        "title": "Update Role",
        "subtitle": "PATCH /v1/identity/roles/{id}"
    },
    "/api-reference/roles/get-role": {
        "title": "Get Role",
        "subtitle": "GET /v1/identity/roles/{id}"
    },
    "/api-reference/roles/list-roles": {
        "title": "List Roles",
        "subtitle": "GET /v1/identity/roles"
    },
    "/api-reference/product-lines-management/get-product-line": {
        "title": "Get Product Line",
        "subtitle": "GET /v1/catalog/product-lines/{id}"
    },
    "/api-reference/product-lines-management/delete-product-line": {
        "title": "Delete Product Line",
        "subtitle": "DELETE /v1/catalog/product-lines/{id}"
    },
    "/api-reference/product-lines-management/list-product-lines": {
        "title": "List Product Lines",
        "subtitle": "GET /v1/catalog/product-lines"
    },
    "/api-reference/product-lines-management/update-product-line": {
        "title": "Update Product Line",
        "subtitle": "PATCH /v1/catalog/product-lines/{id}"
    },
    "/api-reference/product-lines-management/create-product-line": {
        "title": "Create Product Line",
        "subtitle": "POST /v1/catalog/product-lines"
    },
    "/api-reference/account-groups/list-account-groups": {
        "title": "List Account Groups",
        "subtitle": "GET /v1/sales/account-groups"
    },
    "/api-reference/account-groups/create-account-group": {
        "title": "Create Account Group",
        "subtitle": "POST /v1/sales/account-groups"
    },
    "/api-reference/account-groups/update-account-group": {
        "title": "Update Account Group",
        "subtitle": "PATCH /v1/sales/account-groups/{id}"
    },
    "/api-reference/account-groups/retrieve-account-group": {
        "title": "Retrieve Account Group",
        "subtitle": "GET /v1/sales/account-groups/{id}"
    },
    "/api-reference/account-groups/delete-account-group": {
        "title": "Delete Account Group",
        "subtitle": "DELETE /v1/sales/account-groups/{id}"
    },
    "/api-reference/units-management/list-units": {
        "title": "List Units",
        "subtitle": "GET /v1/catalog/units"
    },
    "/api-reference/units-management/delete-unit": {
        "title": "Delete Unit",
        "subtitle": "DELETE /v1/catalog/units/{id}"
    },
    "/api-reference/units-management/update-unit": {
        "title": "Update Unit",
        "subtitle": "PATCH /v1/catalog/units/{id}"
    },
    "/api-reference/units-management/get-unit": {
        "title": "Get Unit",
        "subtitle": "GET /v1/catalog/units/{id}"
    },
    "/api-reference/units-management/create-unit": {
        "title": "Create Unit",
        "subtitle": "POST /v1/catalog/units"
    },
    "/api-reference/sandbox-management/list-sandboxes": {
        "title": "List Sandboxes",
        "subtitle": "GET /v1/core/sandboxes"
    },
    "/api-reference/sandbox-management/delete-sandbox": {
        "title": "Delete Sandbox",
        "subtitle": "DELETE /v1/core/sandboxes/{id}"
    },
    "/api-reference/sandbox-management/get-sandbox": {
        "title": "Get Sandbox",
        "subtitle": "GET /v1/core/sandboxes/{id}"
    },
    "/api-reference/sandbox-management/create-sandbox": {
        "title": "Create Sandbox",
        "subtitle": "POST /v1/core/sandboxes"
    },
    "/api-reference/payment-terms-management/get-payment-term": {
        "title": "Get Payment Term",
        "subtitle": "GET /v1/finance/payment-terms/{id}"
    },
    "/api-reference/payment-terms-management/list-payment-terms": {
        "title": "List Payment Terms",
        "subtitle": "GET /v1/finance/payment-terms"
    },
    "/api-reference/payment-terms-management/update-payment-term": {
        "title": "Update Payment Term",
        "subtitle": "PATCH /v1/finance/payment-terms/{id}"
    },
    "/api-reference/payment-terms-management/create-payment-term": {
        "title": "Create Payment Term",
        "subtitle": "POST /v1/finance/payment-terms"
    },
    "/api-reference/payment-terms-management/delete-payment-term": {
        "title": "Delete Payment Term",
        "subtitle": "DELETE /v1/finance/payment-terms/{id}"
    },
    "/api-reference/address-validation/validate-address": {
        "title": "Validate Address",
        "subtitle": "POST /v1/core/addresses/validate"
    },
    "/api-reference/address-validation/autocomplete-address": {
        "title": "Autocomplete Address",
        "subtitle": "GET /v1/core/addresses/autocomplete"
    },
    "/api-reference/api-key-management/create-api-key": {
        "title": "Create API Key",
        "subtitle": "POST /v1/auth/api-keys"
    },
    "/api-reference/api-key-management/rotate-api-key": {
        "title": "Rotate API Key",
        "subtitle": "POST /v1/auth/api-keys/{id}/actions/rotate"
    },
    "/api-reference/api-key-management/list-api-keys": {
        "title": "List API Keys",
        "subtitle": "GET /v1/auth/api-keys"
    },
    "/api-reference/api-key-management/revoke-api-key": {
        "title": "Revoke API Key",
        "subtitle": "DELETE /v1/auth/api-keys/{id}"
    },
    "/api-reference/api-key-management/get-api-key": {
        "title": "Get API Key",
        "subtitle": "GET /v1/auth/api-keys/{id}"
    },
    "/api-reference/priorities/get-priority": {
        "title": "Get Priority",
        "subtitle": "GET /v1/sales/priorities/{id}"
    },
    "/api-reference/priorities/list-priorities": {
        "title": "List Priorities",
        "subtitle": "GET /v1/sales/priorities"
    },
    "/api-reference/email-logs/list-email-logs": {
        "title": "List Email Logs",
        "subtitle": "GET /v1/core/email-logs"
    },
    "/api-reference/email-logs/get-email-log": {
        "title": "Get Email Log",
        "subtitle": "GET /v1/core/email-logs/{id}"
    },
    "/api-reference/address-management/list-addresses": {
        "title": "List Addresses",
        "subtitle": "GET /v1/sales/addresses"
    },
    "/api-reference/address-management/create-address": {
        "title": "Create Address",
        "subtitle": "POST /v1/sales/addresses"
    },
    "/api-reference/address-management/get-address": {
        "title": "Get Address",
        "subtitle": "GET /v1/sales/addresses/{id}"
    },
    "/api-reference/address-management/delete-address": {
        "title": "Delete Address",
        "subtitle": "DELETE /v1/sales/addresses/{id}"
    },
    "/api-reference/address-management/update-address": {
        "title": "Update Address",
        "subtitle": "PATCH /v1/sales/addresses/{id}"
    },
    "/api-reference/properties-management/list-attributes": {
        "title": "List Attributes",
        "subtitle": "GET /v1/catalog/properties/{property_id}/attributes"
    },
    "/api-reference/properties-management/get-attribute": {
        "title": "Get Attribute",
        "subtitle": "GET /v1/catalog/properties/{property_id}/attributes/{id}"
    },
    "/api-reference/properties-management/create-attribute": {
        "title": "Create Attribute",
        "subtitle": "POST /v1/catalog/properties/{property_id}/attributes"
    },
    "/api-reference/properties-management/create-property": {
        "title": "Create Property",
        "subtitle": "POST /v1/catalog/properties"
    },
    "/api-reference/properties-management/delete-attribute": {
        "title": "Delete Attribute",
        "subtitle": "DELETE /v1/catalog/properties/{property_id}/attributes/{id}"
    },
    "/api-reference/properties-management/list-properties": {
        "title": "List Properties",
        "subtitle": "GET /v1/catalog/properties"
    },
    "/api-reference/properties-management/get-property": {
        "title": "Get Property",
        "subtitle": "GET /v1/catalog/properties/{id}"
    },
    "/api-reference/properties-management/update-attribute": {
        "title": "Update Attribute",
        "subtitle": "PATCH /v1/catalog/properties/{property_id}/attributes/{id}"
    },
    "/api-reference/properties-management/delete-property": {
        "title": "Delete Property",
        "subtitle": "DELETE /v1/catalog/properties/{id}"
    },
    "/api-reference/properties-management/update-property": {
        "title": "Update Property",
        "subtitle": "PATCH /v1/catalog/properties/{id}"
    },
    "/api-reference/shipping-terms-management/list-shipping-terms": {
        "title": "List Shipping Terms",
        "subtitle": "GET /v1/operations/shipping-terms"
    },
    "/api-reference/shipping-terms-management/update-shipping-term": {
        "title": "Update Shipping Term",
        "subtitle": "PATCH /v1/operations/shipping-terms/{id}"
    },
    "/api-reference/shipping-terms-management/get-shipping-term": {
        "title": "Get Shipping Term",
        "subtitle": "GET /v1/operations/shipping-terms/{id}"
    },
    "/api-reference/shipping-terms-management/create-shipping-term": {
        "title": "Create Shipping Term",
        "subtitle": "POST /v1/operations/shipping-terms"
    },
    "/api-reference/shipping-terms-management/delete-shipping-term": {
        "title": "Delete Shipping Term",
        "subtitle": "DELETE /v1/operations/shipping-terms/{id}"
    },
    "/api-reference/scanning-stations-management/update-scanning-station": {
        "title": "Update Scanning Station",
        "subtitle": "PATCH /v1/operations/scanning-stations/{id}"
    },
    "/api-reference/scanning-stations-management/create-scanning-station": {
        "title": "Create Scanning Station",
        "subtitle": "POST /v1/operations/scanning-stations"
    },
    "/api-reference/scanning-stations-management/list-scanning-stations": {
        "title": "List Scanning Stations",
        "subtitle": "GET /v1/operations/scanning-stations"
    },
    "/api-reference/scanning-stations-management/get-scanning-station": {
        "title": "Get Scanning Station",
        "subtitle": "GET /v1/operations/scanning-stations/{id}"
    },
    "/api-reference/scanning-stations-management/delete-scanning-station": {
        "title": "Delete Scanning Station",
        "subtitle": "DELETE /v1/operations/scanning-stations/{id}"
    },
    "/api-reference/customers/merge-customers": {
        "title": "Merge Customers",
        "subtitle": "POST /v1/sales/customers/{id}/actions/merge"
    },
    "/api-reference/customers/delete-customer": {
        "title": "Delete Customer",
        "subtitle": "DELETE /v1/sales/customers/{id}"
    },
    "/api-reference/customers/create-customer": {
        "title": "Create Customer",
        "subtitle": "POST /v1/sales/customers"
    },
    "/api-reference/customers/get-customer": {
        "title": "Get Customer",
        "subtitle": "GET /v1/sales/customers/{id}"
    },
    "/api-reference/customers/update-customer": {
        "title": "Update Customer",
        "subtitle": "PATCH /v1/sales/customers/{id}"
    },
    "/api-reference/location-management/create-location": {
        "title": "Create Location",
        "subtitle": "POST /v1/operations/locations"
    },
    "/api-reference/location-management/delete-location": {
        "title": "Delete Location",
        "subtitle": "DELETE /v1/operations/locations/{id}"
    },
    "/api-reference/location-management/get-location-type": {
        "title": "Get Location Type",
        "subtitle": "GET /v1/operations/location-types/{id}"
    },
    "/api-reference/location-management/list-location-types": {
        "title": "List Location Types",
        "subtitle": "GET /v1/operations/location-types"
    },
    "/api-reference/location-management/list-locations": {
        "title": "List Locations",
        "subtitle": "GET /v1/operations/locations"
    },
    "/api-reference/location-management/update-location": {
        "title": "Update Location",
        "subtitle": "PATCH /v1/operations/locations/{id}"
    },
    "/api-reference/location-management/get-location": {
        "title": "Get Location",
        "subtitle": "GET /v1/operations/locations/{id}"
    },
    "/api-reference/item-categories-management/change-item-category-unit-group": {
        "title": "Change Item Category Unit Group",
        "subtitle": "PUT /v1/catalog/item-categories/{id}/unit-groups/{unit_group_id}"
    },
    "/api-reference/item-categories-management/create-item-category": {
        "title": "Create Item Category",
        "subtitle": "POST /v1/catalog/item-categories"
    },
    "/api-reference/item-categories-management/update-item-category": {
        "title": "Update Item Category",
        "subtitle": "PATCH /v1/catalog/item-categories/{id}"
    },
    "/api-reference/item-categories-management/add-item-category-property": {
        "title": "Add Item Category Property",
        "subtitle": "PUT /v1/catalog/item-categories/{id}/properties/{property_id}"
    },
    "/api-reference/item-categories-management/get-item-category": {
        "title": "Get Item Category",
        "subtitle": "GET /v1/catalog/item-categories/{id}"
    },
    "/api-reference/item-categories-management/list-item-categories": {
        "title": "List Item Categories",
        "subtitle": "GET /v1/catalog/item-categories"
    },
    "/api-reference/item-categories-management/delete-item-category": {
        "title": "Delete Item Category",
        "subtitle": "DELETE /v1/catalog/item-categories/{id}"
    },
    "/api-reference/item-categories-management/remove-item-category-property": {
        "title": "Remove Item Category Property",
        "subtitle": "DELETE /v1/catalog/item-categories/{id}/properties/{property_id}"
    },
    "/api-reference/unit-groups-management/list-unit-groups": {
        "title": "List Unit Groups",
        "subtitle": "GET /v1/catalog/unit-groups"
    },
    "/api-reference/unit-groups-management/get-unit-group-unit": {
        "title": "Get Unit Group Unit",
        "subtitle": "GET /v1/catalog/unit-groups/{unitGroupId}/units/{id}"
    },
    "/api-reference/unit-groups-management/update-unit-group": {
        "title": "Update Unit Group",
        "subtitle": "PATCH /v1/catalog/unit-groups/{id}"
    },
    "/api-reference/unit-groups-management/get-unit-group": {
        "title": "Get Unit Group",
        "subtitle": "GET /v1/catalog/unit-groups/{id}"
    },
    "/api-reference/unit-groups-management/create-unit-group": {
        "title": "Create Unit Group",
        "subtitle": "POST /v1/catalog/unit-groups"
    },
    "/api-reference/unit-groups-management/list-unit-group-units": {
        "title": "List Unit Group Units",
        "subtitle": "GET /v1/catalog/unit-groups/{unitGroupId}/units"
    },
    "/api-reference/unit-groups-management/delete-unit-group": {
        "title": "Delete Unit Group",
        "subtitle": "DELETE /v1/catalog/unit-groups/{id}"
    },
    "/api-reference/unit-groups-management/update-unit-group-associated-unit": {
        "title": "Update Unit Group Associated Unit",
        "subtitle": "PATCH /v1/catalog/unit-groups/{unitGroupId}/units/{id}"
    },
    "/api-reference/unit-groups-management/create-unit-group-associated-unit": {
        "title": "Create Unit Group Associated Unit",
        "subtitle": "POST /v1/catalog/unit-groups/{unitGroupId}/units"
    },
    "/api-reference/unit-groups-management/delete-unit-group-associated-unit": {
        "title": "Delete Unit Group Associated Unit",
        "subtitle": "DELETE /v1/catalog/unit-groups/{unitGroupId}/units/{id}"
    },
    "/api-reference/request-log-management/list-request-logs": {
        "title": "List Request Logs",
        "subtitle": "GET /v1/core/request-logs"
    },
    "/api-reference/request-log-management/get-request-log": {
        "title": "Get Request Log",
        "subtitle": "GET /v1/core/request-logs/{id}"
    },
    "/api/managing-api-keys": {
        "title": "Managing API Keys",
        "subtitle": "Learn the best practices for managing secret API keys."
    },
    "/api/api-keys": {
        "title": "API Keys",
        "subtitle": "Learn how to authenticate requests with API keys."
    },
    "/api/request-logs": {
        "title": "Request Logs",
        "subtitle": "Monitor and debug your API activity with request logs."
    },
    "/api/rate-limiting": {
        "title": "Rate Limiting",
        "subtitle": "Understand rate limits and implement retry strategies."
    },
    "/api/idempotency": {
        "title": "Idempotency",
        "subtitle": "Safely retry requests without duplicating work."
    },
    "/api/request-ids": {
        "title": "Request IDs",
        "subtitle": "Use request IDs to debug issues and get support."
    },
    "/api/include": {
        "title": "Include Parameter",
        "subtitle": "Expand sub-objects in API responses to get the data you need."
    },
    "/api/pagination": {
        "title": "Pagination",
        "subtitle": "Iterating through paginated list results."
    },
    "/api/versioning": {
        "title": "API Versioning",
        "subtitle": "Understand how Augno versions its API and manage version upgrades."
    },
    "/api/uris": {
        "title": "Augno API URIs",
        "subtitle": "Learn the general format of Augno API URIs."
    },
    "/api/errors": {
        "title": "API Errors",
        "subtitle": "Standard error envelope format for consistent error handling."
    },
    "/build-products/inventory/storage-and-lots": {
        "title": "Storage Locations & Lots",
        "subtitle": "Where inventory is physically stored and how batch-level traceability is maintained."
    },
    "/build-products/inventory/change-logs": {
        "title": "Inventory Change Logs",
        "subtitle": "A complete audit trail of every inventory movement - who changed what, when, by how much, and why."
    },
    "/build-products/inventory/reconciliation": {
        "title": "Reconciliation & Bulk Updates",
        "subtitle": "Correct inventory counts when the system and physical reality diverge, with full audit trail logging."
    },
    "/build-products/inventory/inventory": {
        "title": "Inventory Overview",
        "subtitle": "Real-time visibility into every unit of material, part, and product - what you have, where it is, and what it costs."
    },
    "/build-products/production/production-runs": {
        "title": "Production Runs",
        "subtitle": "Coordinated manufacturing executions that group related batches and track progress from start to completion."
    },
    "/build-products/production/batch-operations": {
        "title": "Batch Operations",
        "subtitle": "Initialize, move, split, and merge - the core actions that advance batches through the production flow."
    },
    "/build-products/production/batches": {
        "title": "Batches",
        "subtitle": "Physical units of product tracked through production - recording quantities, quality grades, and location as they move through manufacturing."
    },
    "/build-products/scanning/labels": {
        "title": "Labels",
        "subtitle": "Batch identification labels printed at scanning stations - two formats and four sizes for production floor tracking."
    },
    "/build-products/scanning/scanning-stations": {
        "title": "Scanning Stations",
        "subtitle": "Configured points in your production workflow where batch operations happen - each linked to a specific operation type and production step."
    },
    "/build-products/purchasing/purchase-orders": {
        "title": "Purchase Orders",
        "subtitle": "Transaction records for buying materials from suppliers, tracking orders through delivery and fulfillment."
    },
    "/build-products/purchasing/deliveries-and-receiving": {
        "title": "Deliveries & Receiving",
        "subtitle": "Track the physical arrival of materials from suppliers and convert purchase order quantities into usable inventory."
    },
    "/build-products/purchasing/suppliers": {
        "title": "Suppliers",
        "subtitle": "Vendors you purchase materials from, defining the source for your raw material procurement."
    },
    "/build-products/bom/consumptions-and-productions": {
        "title": "Consumptions & Productions",
        "subtitle": "The inputs and outputs of each production step - what materials are used up and what parts or products are created."
    },
    "/build-products/bom/production-flows": {
        "title": "Production Flows",
        "subtitle": "The connected sequence of production steps that transforms raw materials into finished products."
    },
    "/build-products/bom/costing": {
        "title": "Costing (COGS)",
        "subtitle": "Real-time cost of goods sold calculation from production step definitions - material, labor, and overhead costs."
    },
    "/build-products/bom/production-steps": {
        "title": "Production Steps",
        "subtitle": "The core building block of manufacturing in Augno - defining inputs, outputs, and costs for each stage of production."
    },
    "/build-products/items/overview": {
        "title": "Items overview",
        "subtitle": "Materials, parts, and products - the core objects you buy, make, and sell in Augno."
    },
    "/build-products/items/materials": {
        "title": "Materials",
        "subtitle": "Raw materials and supplies you purchase from vendors for use in production."
    },
    "/build-products/items/parts": {
        "title": "Parts",
        "subtitle": "Intermediate items you manufacture or assemble from materials during production."
    },
    "/build-products/items/products": {
        "title": "Products",
        "subtitle": "Finished goods you price, stock, and sell to customers."
    },
    "/dashboards/financial/accounts-receivable": {
        "title": "Accounts receivable dashboard",
        "subtitle": "An aging report showing what customers owe across current, 30, 60, 90, and 120-day buckets."
    },
    "/dashboards/financial/payments-data": {
        "title": "Payments data",
        "subtitle": "View payment allocations across invoices with support for invoice and balance view modes."
    },
    "/dashboards/forecasting/sales-targets": {
        "title": "Sales targets dashboard",
        "subtitle": "View and create revenue targets for sales reps by month."
    },
    "/dashboards/forecasting/demand-forecast": {
        "title": "Demand forecast",
        "subtitle": "Forecast demand, order revenue, and sales revenue with confidence intervals based on historical data."
    },
    "/dashboards/operations/material-analytics": {
        "title": "Material analytics",
        "subtitle": "View material inventory levels, demand, and reorder needs by supplier."
    },
    "/dashboards/operations/delivery-analytics": {
        "title": "Delivery analytics",
        "subtitle": "Track on-time delivery rates, average delivery time, and time to first shipment with period-over-period comparison."
    },
    "/dashboards/operations/manufacturing-analytics": {
        "title": "Manufacturing analytics",
        "subtitle": "Monitor production output, cost efficiency, margin, quality, and labor efficiency with month-over-month comparison."
    },
    "/dashboards/sales/order-analytics": {
        "title": "Order analytics",
        "subtitle": "A comprehensive view of sales performance with profit metrics, cumulative revenue, best sellers, and distribution breakdowns."
    },
    "/dashboards/sales/products-on-order": {
        "title": "Products on order",
        "subtitle": "View open orders, back-order quantities, and top ordered products at a glance."
    },
    "/dashboards/sales/weeks-of-sales": {
        "title": "Weeks of sales",
        "subtitle": "See how many weeks of inventory you have on hand based on recent sales velocity."
    },
    "/dashboards/sales/order-data": {
        "title": "Order data",
        "subtitle": "A raw, line-level data grid of all sales transactions with Excel export."
    },
    "/dashboards/sales/quarterly-orders": {
        "title": "Quarterly orders",
        "subtitle": "Visualize order quantity trends by quarter across multiple years."
    },
    "/collect-payments/collecting/settlements": {
        "title": "Settlements",
        "subtitle": "Formally record which transactions pay which invoices by creating settlements with allocations."
    },
    "/collect-payments/collecting/overview": {
        "title": "Collecting",
        "subtitle": "Record the money received from customers and apply it to open invoices through transactions and settlements."
    },
    "/collect-payments/accounts-receivable/overview": {
        "title": "Accounts receivable",
        "subtitle": "Track what customers owe, how long balances have been outstanding, and take action to collect."
    },
    "/collect-payments/invoicing/overview": {
        "title": "Invoicing",
        "subtitle": "Invoices are the billing records Augno generates for each shipment, capturing what was shipped, to whom, and for how much."
    },
    "/generate-sales/customer/overview": {
        "title": "Customers",
        "subtitle": "The central record connecting sales orders, invoices, shipments, and payments."
    },
    "/generate-sales/customer/create": {
        "title": "Create a customer",
        "subtitle": "Learn how to create a customer in Augno."
    },
    "/generate-sales/customer/contacts": {
        "title": "Contacts",
        "subtitle": "Manage the people associated with a customer and control who receives order confirmations and invoices."
    },
    "/generate-sales/customer-setup/addresses": {
        "title": "Addresses",
        "subtitle": "Billing and shipping locations for customers, used on orders, invoices, and shipments."
    },
    "/generate-sales/customer-setup/account-statuses": {
        "title": "Account statuses",
        "subtitle": "Control whether a customer can place orders and receive shipments."
    },
    "/generate-sales/customer-setup/shipping-terms": {
        "title": "Shipping terms",
        "subtitle": "Define who pays for freight, how charges are calculated, and when freight is waived."
    },
    "/generate-sales/customer-setup/payment-terms": {
        "title": "Payment terms",
        "subtitle": "Define when and how a customer is expected to pay for an order."
    },
    "/generate-sales/customer-setup/default-carriers": {
        "title": "Default carriers & options",
        "subtitle": "Define the shipping carrier and service level automatically applied to a customer's orders."
    },
    "/generate-sales/customer-setup/priorities": {
        "title": "Priorities",
        "subtitle": "Control order-processing precedence to determine which work gets attention first."
    },
    "/generate-sales/customer-setup/default-sales-reps": {
        "title": "Default sales reps",
        "subtitle": "The team member automatically assigned to new orders for a customer."
    },
    "/generate-sales/customer-setup/exemptions": {
        "title": "Commission & freight exemption",
        "subtitle": "Exclude customers or customer groups from commission calculations and freight charges."
    },
    "/generate-sales/customer-setup/customer-groups": {
        "title": "Customer groups",
        "subtitle": "Classify customers by segment and control which pricing and discounts they receive."
    },
    "/generate-sales/customer-pricing/discount-codes": {
        "title": "Discount codes",
        "subtitle": "Promotional codes applied at the order level to reduce the total by a percentage or fixed amount."
    },
    "/generate-sales/customer-pricing/customer-prices": {
        "title": "Customer prices",
        "subtitle": "Define product-line-specific pricing for individual customers, overriding base product prices."
    },
    "/generate-sales/customer-pricing/volume-discounts": {
        "title": "Volume discounts",
        "subtitle": "Automatically reduce pricing based on order quantity with tiered percentage discounts."
    },
    "/generate-sales/sales-team/sales-targets": {
        "title": "Sales targets",
        "subtitle": "Define revenue goals for sales reps over a date range, optionally by product line."
    },
    "/generate-sales/sales-team/territories": {
        "title": "Territories",
        "subtitle": "Map geographic regions to sales representatives, optionally scoped by product line."
    },
    "/generate-sales/sales-order/generate-production-run": {
        "title": "Generate a production run",
        "subtitle": "Generate a production run from a sales order in Augno."
    },
    "/generate-sales/sales-order/issue": {
        "title": "Issue a sales order",
        "subtitle": "Learn how to issue a sales order in Augno."
    },
    "/generate-sales/sales-order/overview": {
        "title": "Sales orders",
        "subtitle": "The central order for selling products to a customer, driving fulfillment from creation through payment."
    },
    "/generate-sales/sales-order/create": {
        "title": "Create a sales order",
        "subtitle": "Learn how to create a sales order in Augno."
    },
    "/manage-account/team/team-members": {
        "title": "Team members",
        "subtitle": "Invite, manage, and remove the people who use your Augno account."
    },
    "/manage-account/team/roles-and-permissions": {
        "title": "Roles and permissions",
        "subtitle": "Control what team members and API keys can access with granular, role-based permissions."
    },
    "/manage-account/account-settings/business-information": {
        "title": "Business information",
        "subtitle": "Configure your account name, logo, contact details, and portal slug."
    },
    "/manage-account/account-settings/profile": {
        "title": "Your profile",
        "subtitle": "Update your display name, email address, and profile photo."
    },
    "/api-tour": {
        "title": "Tour of the Augno API",
        "subtitle": "See how Augno API objects fit together and learn best practices for combining them effectively."
    },
    "/account": {
        "title": "Create an Augno account",
        "subtitle": "Learn how to activate and manage your Augno account, from initial setup to advanced configurations."
    },
    "/account/checklist": {
        "title": "Account activation checklist",
        "subtitle": "Complete this checklist before putting your Augno account into production."
    },
    "/account/activate": {
        "title": "Activate your account",
        "subtitle": "Learn how to activate and manage your Augno account."
    },
    "/release-phases": {
        "title": "Product Release Phases",
        "subtitle": "Learn how Augno describes product release phases and what to expect from each."
    },
    "/api-request": {
        "title": "Send your first Augno API request",
        "subtitle": "Get started with the Augno API."
    },
    "/go-live": {
        "title": "Go live checklist",
        "subtitle": "Use this checklist to ensure a smooth transition putting your integration into production."
    }
};

export function getPagePreview(path: string): PagePreview | undefined {
    return pagePreviewData[path];
}
