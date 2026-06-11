// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export interface PagePreview {
    title: string;
    subtitle?: string;
}

export const pagePreviewData: Record<string, PagePreview> = {
    "/api/api-keys": {
        "title": "API Keys",
        "subtitle": "Learn how to authenticate requests with API keys."
    },
    "/api/managing-api-keys": {
        "title": "Managing API Keys",
        "subtitle": "Learn the best practices for managing secret API keys."
    },
    "/api/errors": {
        "title": "API Errors",
        "subtitle": "Standard error envelope format for consistent error handling."
    },
    "/api/uris": {
        "title": "Augno API URIs",
        "subtitle": "Learn the general format of Augno API URIs."
    },
    "/api/idempotency": {
        "title": "Idempotency",
        "subtitle": "Safely retry requests without duplicating work."
    },
    "/api/include": {
        "title": "Include Parameter",
        "subtitle": "Expand sub-objects in API responses to get the data you need."
    },
    "/api/pagination": {
        "title": "Pagination",
        "subtitle": "Iterating through paginated list results."
    },
    "/api/rate-limiting": {
        "title": "Rate Limiting",
        "subtitle": "Understand rate limits and implement retry strategies."
    },
    "/api/request-ids": {
        "title": "Request IDs",
        "subtitle": "Use request IDs to debug issues and get support."
    },
    "/api/versioning": {
        "title": "API Versioning",
        "subtitle": "Understand how Augno versions its API and manage version upgrades."
    },
    "/api/request-logs": {
        "title": "Request Logs",
        "subtitle": "Monitor and debug your API activity with request logs."
    },
    "/api/overview": {
        "title": "Augno's APIs",
        "subtitle": "Learn more about Augno's APIs."
    },
    "/api/go-sdk": {
        "title": "Go SDK",
        "subtitle": "Call the Augno API from Go applications."
    },
    "/api/typescript-sdk": {
        "title": "TypeScript SDK",
        "subtitle": "Call the Augno API from server-side TypeScript or JavaScript."
    },
    "/development": {
        "title": "Developer resources",
        "subtitle": "Technical documentation, API references, and guides for developers."
    },
    "/api-tour": {
        "title": "Tour of the Augno API",
        "subtitle": "See how Augno API objects fit together and learn best practices for combining them effectively."
    },
    "/get-started": {
        "title": "Get started",
        "subtitle": "Create an account and learn how to build on Augno."
    },
    "/account/activate": {
        "title": "Activate your account",
        "subtitle": "Learn how to activate and manage your Augno account."
    },
    "/account/checklist": {
        "title": "Account activation checklist",
        "subtitle": "Complete this checklist before putting your Augno account into production."
    },
    "/account": {
        "title": "Create an Augno account",
        "subtitle": "Learn how to activate and manage your Augno account, from initial setup to advanced configurations."
    },
    "/api-request": {
        "title": "Send your first Augno API request",
        "subtitle": "Get started with the Augno API."
    },
    "/go-live": {
        "title": "Go live checklist",
        "subtitle": "Use this checklist to ensure a smooth transition putting your integration into production."
    },
    "/release-phases": {
        "title": "Product Release Phases",
        "subtitle": "Learn how Augno describes product release phases and what to expect from each."
    },
    "/build-products/bom/consumptions-and-productions": {
        "title": "Consumptions & Productions",
        "subtitle": "The inputs and outputs of each production step - what materials are used up and what parts or products are created."
    },
    "/build-products/bom/costing": {
        "title": "Costing (COGS)",
        "subtitle": "Real-time cost of goods sold calculation from production step definitions - material, labor, and overhead costs."
    },
    "/build-products/bom/production-flows": {
        "title": "Production Flows",
        "subtitle": "The connected sequence of production steps that transforms raw materials into finished products."
    },
    "/build-products/bom/production-steps": {
        "title": "Production Steps",
        "subtitle": "The core building block of manufacturing in Augno - defining inputs, outputs, and costs for each stage of production."
    },
    "/build-products/inventory/change-logs": {
        "title": "Inventory Change Logs",
        "subtitle": "A complete audit trail of every inventory movement - who changed what, when, by how much, and why."
    },
    "/build-products/inventory/inventory": {
        "title": "Inventory Overview",
        "subtitle": "Real-time visibility into every unit of material, part, and product - what you have, where it is, and what it costs."
    },
    "/build-products/inventory/reconciliation": {
        "title": "Reconciliation & Bulk Updates",
        "subtitle": "Correct inventory counts when the system and physical reality diverge, with full audit trail logging."
    },
    "/build-products/inventory/storage-and-lots": {
        "title": "Storage Locations & Lots",
        "subtitle": "Where inventory is physically stored and how batch-level traceability is maintained."
    },
    "/build-products/items/materials": {
        "title": "Materials",
        "subtitle": "Raw materials and supplies you purchase from vendors for use in production."
    },
    "/build-products/items/overview": {
        "title": "Items overview",
        "subtitle": "Materials, parts, and products - the core objects you buy, make, and sell in Augno."
    },
    "/build-products/items/parts": {
        "title": "Parts",
        "subtitle": "Intermediate items you manufacture or assemble from materials during production."
    },
    "/build-products/items/products": {
        "title": "Products",
        "subtitle": "Finished goods you price, stock, and sell to customers."
    },
    "/build-products/overview": {
        "title": "Build Products",
        "subtitle": "Purchasing, manufacturing, production tracking, and inventory management."
    },
    "/build-products/production/batch-operations": {
        "title": "Batch Operations",
        "subtitle": "Initialize, move, split, and merge - the core actions that advance batches through the production flow."
    },
    "/build-products/production/batches": {
        "title": "Batches",
        "subtitle": "Physical units of product tracked through production - recording quantities, quality grades, and location as they move through manufacturing."
    },
    "/build-products/production/production-runs": {
        "title": "Production Runs",
        "subtitle": "Coordinated manufacturing executions that group related batches and track progress from start to completion."
    },
    "/build-products/purchasing/deliveries-and-receiving": {
        "title": "Deliveries & Receiving",
        "subtitle": "Track the physical arrival of materials from suppliers and convert purchase order quantities into usable inventory."
    },
    "/build-products/purchasing/purchase-orders": {
        "title": "Purchase Orders",
        "subtitle": "Transaction records for buying materials from suppliers, tracking orders through delivery and fulfillment."
    },
    "/build-products/purchasing/suppliers": {
        "title": "Suppliers",
        "subtitle": "Vendors you purchase materials from, defining the source for your raw material procurement."
    },
    "/build-products/scanning/labels": {
        "title": "Labels",
        "subtitle": "Batch identification labels printed at scanning stations - two formats and four sizes for production floor tracking."
    },
    "/build-products/scanning/scanning-stations": {
        "title": "Scanning Stations",
        "subtitle": "Configured points in your production workflow where batch operations happen - each linked to a specific operation type and production step."
    },
    "/collect-payments/accounts-receivable/overview": {
        "title": "Accounts receivable",
        "subtitle": "Track what customers owe, how long balances have been outstanding, and take action to collect."
    },
    "/collect-payments/collecting/overview": {
        "title": "Collecting",
        "subtitle": "Record the money received from customers and apply it to open invoices through transactions and settlements."
    },
    "/collect-payments/collecting/settlements": {
        "title": "Settlements",
        "subtitle": "Formally record which transactions pay which invoices by creating settlements with allocations."
    },
    "/collect-payments/invoicing/overview": {
        "title": "Invoicing",
        "subtitle": "Invoices are the billing records Augno generates for each shipment, capturing what was shipped, to whom, and for how much."
    },
    "/collect-payments/overview": {
        "title": "Collect Payments",
        "subtitle": "Learn about collecting payments in Augno."
    },
    "/dashboards/financial/accounts-receivable": {
        "title": "Accounts receivable dashboard",
        "subtitle": "An aging report showing what customers owe across current, 30, 60, 90, and 120-day buckets."
    },
    "/dashboards/financial/payments-data": {
        "title": "Payments data",
        "subtitle": "View payment allocations across invoices with support for invoice and balance view modes."
    },
    "/dashboards/forecasting/demand-forecast": {
        "title": "Demand forecast",
        "subtitle": "Forecast demand, order revenue, and sales revenue with confidence intervals based on historical data."
    },
    "/dashboards/forecasting/sales-targets": {
        "title": "Sales targets dashboard",
        "subtitle": "View and create revenue targets for sales reps by month."
    },
    "/dashboards/operations/delivery-analytics": {
        "title": "Delivery analytics",
        "subtitle": "Track on-time delivery rates, average delivery time, and time to first shipment with period-over-period comparison."
    },
    "/dashboards/operations/manufacturing-analytics": {
        "title": "Manufacturing analytics",
        "subtitle": "Monitor production output, cost efficiency, margin, quality, and labor efficiency with month-over-month comparison."
    },
    "/dashboards/operations/material-analytics": {
        "title": "Material analytics",
        "subtitle": "View material inventory levels, demand, and reorder needs by supplier."
    },
    "/dashboards/overview": {
        "title": "Dashboards",
        "subtitle": "Analytics and reporting dashboards that give you real-time visibility into sales, operations, finances, and forecasting."
    },
    "/dashboards/sales/order-analytics": {
        "title": "Order analytics",
        "subtitle": "A comprehensive view of sales performance with profit metrics, cumulative revenue, best sellers, and distribution breakdowns."
    },
    "/dashboards/sales/order-data": {
        "title": "Order data",
        "subtitle": "A raw, line-level data grid of all sales transactions with Excel export."
    },
    "/dashboards/sales/products-on-order": {
        "title": "Products on order",
        "subtitle": "View open orders, back-order quantities, and top ordered products at a glance."
    },
    "/dashboards/sales/quarterly-orders": {
        "title": "Quarterly orders",
        "subtitle": "Visualize order quantity trends by quarter across multiple years."
    },
    "/dashboards/sales/weeks-of-sales": {
        "title": "Weeks of sales",
        "subtitle": "See how many weeks of inventory you have on hand based on recent sales velocity."
    },
    "/generate-sales/customer-portal": {
        "title": "Customer portal",
        "subtitle": "A branded, self-service portal where your customers register, place orders, submit payments, and track inventory."
    },
    "/generate-sales/customer-pricing/customer-prices": {
        "title": "Customer prices",
        "subtitle": "Define product-line-specific pricing for individual customers, overriding base product prices."
    },
    "/generate-sales/customer-pricing/discount-codes": {
        "title": "Discount codes",
        "subtitle": "Promotional codes applied at the order level to reduce the total by a percentage or fixed amount."
    },
    "/generate-sales/customer-pricing/volume-discounts": {
        "title": "Volume discounts",
        "subtitle": "Automatically reduce pricing based on order quantity with tiered percentage discounts."
    },
    "/generate-sales/customer-setup/account-statuses": {
        "title": "Account statuses",
        "subtitle": "Control whether a customer can place orders and receive shipments."
    },
    "/generate-sales/customer-setup/addresses": {
        "title": "Addresses",
        "subtitle": "Billing and shipping locations for customers, used on orders, invoices, and shipments."
    },
    "/generate-sales/customer-setup/customer-groups": {
        "title": "Customer groups",
        "subtitle": "Classify customers by segment and control which pricing and discounts they receive."
    },
    "/generate-sales/customer-setup/default-carriers": {
        "title": "Default carriers & options",
        "subtitle": "Define the shipping carrier and service level automatically applied to a customer's orders."
    },
    "/generate-sales/customer-setup/default-sales-reps": {
        "title": "Default sales reps",
        "subtitle": "The team member automatically assigned to new orders for a customer."
    },
    "/generate-sales/customer-setup/exemptions": {
        "title": "Commission & freight exemption",
        "subtitle": "Exclude customers or customer groups from commission calculations and freight charges."
    },
    "/generate-sales/customer-setup/payment-terms": {
        "title": "Payment terms",
        "subtitle": "Define when and how a customer is expected to pay for an order."
    },
    "/generate-sales/customer-setup/priorities": {
        "title": "Priorities",
        "subtitle": "Control order-processing precedence to determine which work gets attention first."
    },
    "/generate-sales/customer-setup/shipping-terms": {
        "title": "Shipping terms",
        "subtitle": "Define who pays for freight, how charges are calculated, and when freight is waived."
    },
    "/generate-sales/customer/contacts": {
        "title": "Contacts",
        "subtitle": "Manage the people associated with a customer and control who receives order confirmations and invoices."
    },
    "/generate-sales/customer/create": {
        "title": "Create a customer",
        "subtitle": "Learn how to create a customer in Augno."
    },
    "/generate-sales/customer/overview": {
        "title": "Customers",
        "subtitle": "The central record connecting sales orders, invoices, shipments, and payments."
    },
    "/generate-sales/overview": {
        "title": "Generate Sales",
        "subtitle": "Customers, pricing, orders, and the sales team - everything that drives revenue in Augno."
    },
    "/generate-sales/sales-order/create": {
        "title": "Create a sales order",
        "subtitle": "Learn how to create a sales order in Augno."
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
    "/generate-sales/sales-team/sales-targets": {
        "title": "Sales targets",
        "subtitle": "Define revenue goals for sales reps over a date range, optionally by product line."
    },
    "/generate-sales/sales-team/territories": {
        "title": "Territories",
        "subtitle": "Map geographic regions to sales representatives, optionally scoped by product line."
    },
    "/workflows": {
        "title": "Workflows",
        "subtitle": "End-to-end guides for common business processes in Augno."
    },
    "/manage-account/account-settings/business-information": {
        "title": "Business information",
        "subtitle": "Configure your account name, logo, contact details, and portal slug."
    },
    "/manage-account/account-settings/profile": {
        "title": "Your profile",
        "subtitle": "Update your display name, email address, and profile photo."
    },
    "/manage-account/api-keys": {
        "title": "API keys",
        "subtitle": "Create, rotate, and revoke API keys for programmatic access to Augno."
    },
    "/manage-account/integrations": {
        "title": "Integrations",
        "subtitle": "Connect third-party services like Stripe and Shippo to your Augno account."
    },
    "/manage-account/overview": {
        "title": "Manage Your Account",
        "subtitle": "Configure your account settings, team, integrations, security, and billing."
    },
    "/manage-account/plans-and-billing": {
        "title": "Plans and billing",
        "subtitle": "View your subscription, switch plans, and manage billing through Stripe."
    },
    "/manage-account/sandboxes": {
        "title": "Sandboxes",
        "subtitle": "Create isolated testing environments to develop and experiment without affecting production data."
    },
    "/manage-account/security": {
        "title": "Security",
        "subtitle": "Manage your password and keep your account secure."
    },
    "/manage-account/team/roles-and-permissions": {
        "title": "Roles and permissions",
        "subtitle": "Control what team members and API keys can access with granular, role-based permissions."
    },
    "/manage-account/team/team-members": {
        "title": "Team members",
        "subtitle": "Invite, manage, and remove the people who use your Augno account."
    },
    "/ship-products/overview": {
        "title": "Ship Products",
        "subtitle": "Learn about shipping products in Augno."
    },
    "/ship-products/packing/overview": {
        "title": "Packing",
        "subtitle": "Pack picked items into shipping cases and create shipments ready for the carrier."
    },
    "/ship-products/picking/overview": {
        "title": "Picking",
        "subtitle": "Select and pull the right products from inventory to fulfill a sales order."
    },
    "/ship-products/shipping/overview": {
        "title": "Shipping",
        "subtitle": "Generate shipping labels, assign tracking numbers, and ship packed orders through your carrier."
    },
    "/api-reference": {
        "title": "API Reference",
        "subtitle": "Complete API documentation for all endpoints"
    },
    "/api-reference/api-key-management/create-api-key": {
        "title": "Create API Key",
        "subtitle": "POST /v1/auth/api-keys"
    },
    "/api-reference/api-key-management/list-api-keys": {
        "title": "List API Keys",
        "subtitle": "GET /v1/auth/api-keys"
    },
    "/api-reference/api-key-management/retrieve-api-key": {
        "title": "Retrieve API Key",
        "subtitle": "GET /v1/auth/api-keys/{id}"
    },
    "/api-reference/api-key-management/revoke-api-key": {
        "title": "Revoke API Key",
        "subtitle": "DELETE /v1/auth/api-keys/{id}"
    },
    "/api-reference/api-key-management/rotate-api-key": {
        "title": "Rotate API Key",
        "subtitle": "POST /v1/auth/api-keys/{id}/actions/rotate"
    },
    "/api-reference/sandbox-management/create-sandbox": {
        "title": "Create Sandbox",
        "subtitle": "POST /v1/core/sandboxes"
    },
    "/api-reference/sandbox-management/list-sandboxes": {
        "title": "List Sandboxes",
        "subtitle": "GET /v1/core/sandboxes"
    },
    "/api-reference/sandbox-management/retrieve-sandbox": {
        "title": "Retrieve Sandbox",
        "subtitle": "GET /v1/core/sandboxes/{id}"
    },
    "/api-reference/sandbox-management/delete-sandbox": {
        "title": "Delete Sandbox",
        "subtitle": "DELETE /v1/core/sandboxes/{id}"
    },
    "/api-reference/request-log-management/list-request-logs": {
        "title": "List Request Logs",
        "subtitle": "GET /v1/core/request-logs"
    },
    "/api-reference/request-log-management/retrieve-request-log": {
        "title": "Retrieve Request Log",
        "subtitle": "GET /v1/core/request-logs/{id}"
    },
    "/api-reference/audit-event-management/list-audit-events": {
        "title": "List Audit Events",
        "subtitle": "GET /v1/core/audit-events"
    },
    "/api-reference/audit-event-management/list-audit-event-resource-types": {
        "title": "List Audit Event Resource Types",
        "subtitle": "GET /v1/core/audit-events/resource-types"
    },
    "/api-reference/audit-event-management/retrieve-audit-event": {
        "title": "Retrieve Audit Event",
        "subtitle": "GET /v1/core/audit-events/{id}"
    },
    "/api-reference/units-management/create-unit": {
        "title": "Create Unit",
        "subtitle": "POST /v1/catalog/units"
    },
    "/api-reference/units-management/update-unit": {
        "title": "Update Unit",
        "subtitle": "PATCH /v1/catalog/units/{id}"
    },
    "/api-reference/units-management/list-units": {
        "title": "List Units",
        "subtitle": "GET /v1/catalog/units"
    },
    "/api-reference/units-management/retrieve-unit": {
        "title": "Retrieve Unit",
        "subtitle": "GET /v1/catalog/units/{id}"
    },
    "/api-reference/units-management/delete-unit": {
        "title": "Delete Unit",
        "subtitle": "DELETE /v1/catalog/units/{id}"
    },
    "/api-reference/unit-groups-management/create-unit-group": {
        "title": "Create Unit Group",
        "subtitle": "POST /v1/catalog/unit-groups"
    },
    "/api-reference/unit-groups-management/update-unit-group": {
        "title": "Update Unit Group",
        "subtitle": "PATCH /v1/catalog/unit-groups/{id}"
    },
    "/api-reference/unit-groups-management/list-unit-groups": {
        "title": "List Unit Groups",
        "subtitle": "GET /v1/catalog/unit-groups"
    },
    "/api-reference/unit-groups-management/retrieve-unit-group": {
        "title": "Retrieve Unit Group",
        "subtitle": "GET /v1/catalog/unit-groups/{id}"
    },
    "/api-reference/unit-groups-management/delete-unit-group": {
        "title": "Delete Unit Group",
        "subtitle": "DELETE /v1/catalog/unit-groups/{id}"
    },
    "/api-reference/unit-groups-management/create-unit-group-associated-unit": {
        "title": "Create Unit Group Associated Unit",
        "subtitle": "POST /v1/catalog/unit-groups/{unit_group_id}/units"
    },
    "/api-reference/unit-groups-management/update-unit-group-associated-unit": {
        "title": "Update Unit Group Associated Unit",
        "subtitle": "PATCH /v1/catalog/unit-groups/{unit_group_id}/units/{id}"
    },
    "/api-reference/unit-groups-management/list-unit-group-units": {
        "title": "List Unit Group Units",
        "subtitle": "GET /v1/catalog/unit-groups/{unit_group_id}/units"
    },
    "/api-reference/unit-groups-management/retrieve-unit-group-unit": {
        "title": "Retrieve Unit Group Unit",
        "subtitle": "GET /v1/catalog/unit-groups/{unit_group_id}/units/{id}"
    },
    "/api-reference/unit-groups-management/delete-unit-group-associated-unit": {
        "title": "Delete Unit Group Associated Unit",
        "subtitle": "DELETE /v1/catalog/unit-groups/{unit_group_id}/units/{id}"
    },
    "/api-reference/account-groups/create-account-group": {
        "title": "Create Account Group",
        "subtitle": "POST /v1/sales/account-groups"
    },
    "/api-reference/account-groups/update-account-group": {
        "title": "Update Account Group",
        "subtitle": "PATCH /v1/sales/account-groups/{id}"
    },
    "/api-reference/account-groups/list-account-groups": {
        "title": "List Account Groups",
        "subtitle": "GET /v1/sales/account-groups"
    },
    "/api-reference/account-groups/retrieve-account-group": {
        "title": "Retrieve Account Group",
        "subtitle": "GET /v1/sales/account-groups/{id}"
    },
    "/api-reference/account-groups/delete-account-group": {
        "title": "Delete Account Group",
        "subtitle": "DELETE /v1/sales/account-groups/{id}"
    },
    "/api-reference/payment-terms-management/create-payment-term": {
        "title": "Create Payment Term",
        "subtitle": "POST /v1/finance/payment-terms"
    },
    "/api-reference/payment-terms-management/update-payment-term": {
        "title": "Update Payment Term",
        "subtitle": "PATCH /v1/finance/payment-terms/{id}"
    },
    "/api-reference/payment-terms-management/list-payment-terms": {
        "title": "List Payment Terms",
        "subtitle": "GET /v1/finance/payment-terms"
    },
    "/api-reference/payment-terms-management/retrieve-payment-term": {
        "title": "Retrieve Payment Term",
        "subtitle": "GET /v1/finance/payment-terms/{id}"
    },
    "/api-reference/payment-terms-management/delete-payment-term": {
        "title": "Delete Payment Term",
        "subtitle": "DELETE /v1/finance/payment-terms/{id}"
    },
    "/api-reference/shipping-terms-management/create-shipping-term": {
        "title": "Create Shipping Term",
        "subtitle": "POST /v1/operations/shipping-terms"
    },
    "/api-reference/shipping-terms-management/update-shipping-term": {
        "title": "Update Shipping Term",
        "subtitle": "PATCH /v1/operations/shipping-terms/{id}"
    },
    "/api-reference/shipping-terms-management/list-shipping-terms": {
        "title": "List Shipping Terms",
        "subtitle": "GET /v1/operations/shipping-terms"
    },
    "/api-reference/shipping-terms-management/retrieve-shipping-term": {
        "title": "Retrieve Shipping Term",
        "subtitle": "GET /v1/operations/shipping-terms/{id}"
    },
    "/api-reference/shipping-terms-management/delete-shipping-term": {
        "title": "Delete Shipping Term",
        "subtitle": "DELETE /v1/operations/shipping-terms/{id}"
    },
    "/api-reference/address-management/create-address": {
        "title": "Create Address",
        "subtitle": "POST /v1/sales/addresses"
    },
    "/api-reference/address-management/update-address": {
        "title": "Update Address",
        "subtitle": "PATCH /v1/sales/addresses/{id}"
    },
    "/api-reference/address-management/list-addresses": {
        "title": "List Addresses",
        "subtitle": "GET /v1/sales/addresses"
    },
    "/api-reference/address-management/retrieve-address": {
        "title": "Retrieve Address",
        "subtitle": "GET /v1/sales/addresses/{id}"
    },
    "/api-reference/address-management/delete-address": {
        "title": "Delete Address",
        "subtitle": "DELETE /v1/sales/addresses/{id}"
    },
    "/api-reference/address-validation/list-address-suggestions": {
        "title": "List Address Suggestions",
        "subtitle": "GET /v1/core/addresses/suggestions"
    },
    "/api-reference/address-validation/validate-address": {
        "title": "Validate Address",
        "subtitle": "PUT /v1/core/addresses/actions/validate"
    },
    "/api-reference/account-statuses/list-account-statuses": {
        "title": "List Account Statuses",
        "subtitle": "GET /v1/sales/account-statuses"
    },
    "/api-reference/account-statuses/retrieve-account-status": {
        "title": "Retrieve Account Status",
        "subtitle": "GET /v1/sales/account-statuses/{id}"
    },
    "/api-reference/account-users-management/create-account-user": {
        "title": "Create Account User",
        "subtitle": "POST /v1/identity/account-users"
    },
    "/api-reference/account-users-management/update-account-user": {
        "title": "Update Account User",
        "subtitle": "PATCH /v1/identity/account-users/{id}"
    },
    "/api-reference/account-users-management/list-account-users": {
        "title": "List Account Users",
        "subtitle": "GET /v1/identity/account-users"
    },
    "/api-reference/account-users-management/retrieve-account-user": {
        "title": "Retrieve Account User",
        "subtitle": "GET /v1/identity/account-users/{id}"
    },
    "/api-reference/account-users-management/activate-account-user": {
        "title": "Activate Account User",
        "subtitle": "PUT /v1/identity/account-users/{id}/actions/activate"
    },
    "/api-reference/account-users-management/disable-account-user": {
        "title": "Disable Account User",
        "subtitle": "PUT /v1/identity/account-users/{id}/actions/disable"
    },
    "/api-reference/account-users-management/remove-account-user": {
        "title": "Remove Account User",
        "subtitle": "PUT /v1/identity/account-users/{id}/actions/remove"
    },
    "/api-reference/properties-management/create-property": {
        "title": "Create Property",
        "subtitle": "POST /v1/catalog/properties"
    },
    "/api-reference/properties-management/update-property": {
        "title": "Update Property",
        "subtitle": "PATCH /v1/catalog/properties/{id}"
    },
    "/api-reference/properties-management/list-properties": {
        "title": "List Properties",
        "subtitle": "GET /v1/catalog/properties"
    },
    "/api-reference/properties-management/retrieve-property": {
        "title": "Retrieve Property",
        "subtitle": "GET /v1/catalog/properties/{id}"
    },
    "/api-reference/properties-management/delete-property": {
        "title": "Delete Property",
        "subtitle": "DELETE /v1/catalog/properties/{id}"
    },
    "/api-reference/properties-management/create-attribute": {
        "title": "Create Attribute",
        "subtitle": "POST /v1/catalog/properties/{property_id}/attributes"
    },
    "/api-reference/properties-management/update-attribute": {
        "title": "Update Attribute",
        "subtitle": "PATCH /v1/catalog/properties/{property_id}/attributes/{id}"
    },
    "/api-reference/properties-management/list-attributes": {
        "title": "List Attributes",
        "subtitle": "GET /v1/catalog/properties/{property_id}/attributes"
    },
    "/api-reference/properties-management/retrieve-attribute": {
        "title": "Retrieve Attribute",
        "subtitle": "GET /v1/catalog/properties/{property_id}/attributes/{id}"
    },
    "/api-reference/properties-management/delete-attribute": {
        "title": "Delete Attribute",
        "subtitle": "DELETE /v1/catalog/properties/{property_id}/attributes/{id}"
    },
    "/api-reference/priorities/list-priorities": {
        "title": "List Priorities",
        "subtitle": "GET /v1/sales/priorities"
    },
    "/api-reference/priorities/retrieve-priority": {
        "title": "Retrieve Priority",
        "subtitle": "GET /v1/sales/priorities/{id}"
    },
    "/api-reference/carriers-management/create-carrier": {
        "title": "Create Carrier",
        "subtitle": "POST /v1/operations/carriers"
    },
    "/api-reference/carriers-management/update-carrier": {
        "title": "Update Carrier",
        "subtitle": "PATCH /v1/operations/carriers/{id}"
    },
    "/api-reference/carriers-management/list-carriers": {
        "title": "List Carriers",
        "subtitle": "GET /v1/operations/carriers"
    },
    "/api-reference/carriers-management/retrieve-carrier": {
        "title": "Retrieve Carrier",
        "subtitle": "GET /v1/operations/carriers/{id}"
    },
    "/api-reference/carriers-management/delete-carrier": {
        "title": "Delete Carrier",
        "subtitle": "DELETE /v1/operations/carriers/{id}"
    },
    "/api-reference/service-levels-management/create-service-level": {
        "title": "Create Service Level",
        "subtitle": "POST /v1/operations/carriers/{carrier_id}/service-levels"
    },
    "/api-reference/service-levels-management/update-service-level": {
        "title": "Update Service Level",
        "subtitle": "PATCH /v1/operations/carriers/{carrier_id}/service-levels/{id}"
    },
    "/api-reference/service-levels-management/list-service-levels": {
        "title": "List Service Levels",
        "subtitle": "GET /v1/operations/carriers/{carrier_id}/service-levels"
    },
    "/api-reference/service-levels-management/retrieve-service-level": {
        "title": "Retrieve Service Level",
        "subtitle": "GET /v1/operations/carriers/{carrier_id}/service-levels/{id}"
    },
    "/api-reference/service-levels-management/delete-service-level": {
        "title": "Delete Service Level",
        "subtitle": "DELETE /v1/operations/carriers/{carrier_id}/service-levels/{id}"
    },
    "/api-reference/items-management/list-items": {
        "title": "List Items",
        "subtitle": "GET /v1/catalog/items"
    },
    "/api-reference/items-management/retrieve-item": {
        "title": "Retrieve Item",
        "subtitle": "GET /v1/catalog/items/{id}"
    },
    "/api-reference/items-management/add-item-attribute": {
        "title": "Add Item Attribute",
        "subtitle": "PUT /v1/catalog/items/{id}/attributes/{attribute_id}"
    },
    "/api-reference/items-management/change-item-category": {
        "title": "Change Item Category",
        "subtitle": "PUT /v1/catalog/items/{id}/category/{category_id}"
    },
    "/api-reference/items-management/retrieve-item-inventory": {
        "title": "Retrieve Item Inventory",
        "subtitle": "GET /v1/catalog/items/{id}/inventory"
    },
    "/api-reference/items-management/remove-item-attribute": {
        "title": "Remove Item Attribute",
        "subtitle": "DELETE /v1/catalog/items/{id}/attributes/{attribute_id}"
    },
    "/api-reference/item-categories-management/create-item-category": {
        "title": "Create Item Category",
        "subtitle": "POST /v1/catalog/item-categories"
    },
    "/api-reference/item-categories-management/update-item-category": {
        "title": "Update Item Category",
        "subtitle": "PATCH /v1/catalog/item-categories/{id}"
    },
    "/api-reference/item-categories-management/list-item-categories": {
        "title": "List Item Categories",
        "subtitle": "GET /v1/catalog/item-categories"
    },
    "/api-reference/item-categories-management/retrieve-item-category": {
        "title": "Retrieve Item Category",
        "subtitle": "GET /v1/catalog/item-categories/{id}"
    },
    "/api-reference/item-categories-management/delete-item-category": {
        "title": "Delete Item Category",
        "subtitle": "DELETE /v1/catalog/item-categories/{id}"
    },
    "/api-reference/item-categories-management/add-item-category-property": {
        "title": "Add Item Category Property",
        "subtitle": "PUT /v1/catalog/item-categories/{id}/properties/{property_id}"
    },
    "/api-reference/item-categories-management/change-item-category-unit-group": {
        "title": "Change Item Category Unit Group",
        "subtitle": "PUT /v1/catalog/item-categories/{id}/unit-groups/{unit_group_id}"
    },
    "/api-reference/item-categories-management/remove-item-category-property": {
        "title": "Remove Item Category Property",
        "subtitle": "DELETE /v1/catalog/item-categories/{id}/properties/{property_id}"
    },
    "/api-reference/materials-management/create-material": {
        "title": "Create Material",
        "subtitle": "POST /v1/catalog/materials"
    },
    "/api-reference/materials-management/update-material": {
        "title": "Update Material",
        "subtitle": "PATCH /v1/catalog/materials/{id}"
    },
    "/api-reference/materials-management/list-materials": {
        "title": "List Materials",
        "subtitle": "GET /v1/catalog/materials"
    },
    "/api-reference/materials-management/retrieve-material": {
        "title": "Retrieve Material",
        "subtitle": "GET /v1/catalog/materials/{id}"
    },
    "/api-reference/materials-management/delete-material": {
        "title": "Delete Material",
        "subtitle": "DELETE /v1/catalog/materials/{id}"
    },
    "/api-reference/parts-management/create-part": {
        "title": "Create Part",
        "subtitle": "POST /v1/catalog/parts"
    },
    "/api-reference/parts-management/update-part": {
        "title": "Update Part",
        "subtitle": "PATCH /v1/catalog/parts/{id}"
    },
    "/api-reference/parts-management/list-parts": {
        "title": "List Parts",
        "subtitle": "GET /v1/catalog/parts"
    },
    "/api-reference/parts-management/retrieve-part": {
        "title": "Retrieve Part",
        "subtitle": "GET /v1/catalog/parts/{id}"
    },
    "/api-reference/parts-management/delete-part": {
        "title": "Delete Part",
        "subtitle": "DELETE /v1/catalog/parts/{id}"
    },
    "/api-reference/email-logs/list-email-logs": {
        "title": "List Email Logs",
        "subtitle": "GET /v1/core/email-logs"
    },
    "/api-reference/email-logs/retrieve-email-log": {
        "title": "Retrieve Email Log",
        "subtitle": "GET /v1/core/email-logs/{id}"
    },
    "/api-reference/customers/create-customer": {
        "title": "Create Customer",
        "subtitle": "POST /v1/sales/customers"
    },
    "/api-reference/customers/update-customer": {
        "title": "Update Customer",
        "subtitle": "PATCH /v1/sales/customers/{id}"
    },
    "/api-reference/customers/list-customers": {
        "title": "List Customers",
        "subtitle": "GET /v1/sales/customers"
    },
    "/api-reference/customers/retrieve-customer": {
        "title": "Retrieve Customer",
        "subtitle": "GET /v1/sales/customers/{id}"
    },
    "/api-reference/customers/delete-customer": {
        "title": "Delete Customer",
        "subtitle": "DELETE /v1/sales/customers/{id}"
    },
    "/api-reference/customers/merge-customers": {
        "title": "Merge Customers",
        "subtitle": "POST /v1/sales/customers/{id}/actions/merge"
    },
    "/api-reference/product-lines-management/create-product-line": {
        "title": "Create Product Line",
        "subtitle": "POST /v1/catalog/product-lines"
    },
    "/api-reference/product-lines-management/update-product-line": {
        "title": "Update Product Line",
        "subtitle": "PATCH /v1/catalog/product-lines/{id}"
    },
    "/api-reference/product-lines-management/list-product-lines": {
        "title": "List Product Lines",
        "subtitle": "GET /v1/catalog/product-lines"
    },
    "/api-reference/product-lines-management/retrieve-product-line": {
        "title": "Retrieve Product Line",
        "subtitle": "GET /v1/catalog/product-lines/{id}"
    },
    "/api-reference/product-lines-management/delete-product-line": {
        "title": "Delete Product Line",
        "subtitle": "DELETE /v1/catalog/product-lines/{id}"
    },
    "/api-reference/products-management/create-product": {
        "title": "Create Product",
        "subtitle": "POST /v1/catalog/products"
    },
    "/api-reference/products-management/update-product": {
        "title": "Update Product",
        "subtitle": "PATCH /v1/catalog/products/{id}"
    },
    "/api-reference/products-management/list-products": {
        "title": "List Products",
        "subtitle": "GET /v1/catalog/products"
    },
    "/api-reference/products-management/retrieve-product": {
        "title": "Retrieve Product",
        "subtitle": "GET /v1/catalog/products/{id}"
    },
    "/api-reference/products-management/delete-product": {
        "title": "Delete Product",
        "subtitle": "DELETE /v1/catalog/products/{id}"
    },
    "/api-reference/products-management/change-product-product-line": {
        "title": "Change Product Product Line",
        "subtitle": "PUT /v1/catalog/products/{id}/product-line/{product_line_id}"
    },
    "/api-reference/sales-order-statuses/list-sales-order-statuses": {
        "title": "List Sales Order Statuses",
        "subtitle": "GET /v1/sales/sales-orders/statuses"
    },
    "/api-reference/transactions/list-adjustment-types": {
        "title": "List Adjustment Types",
        "subtitle": "GET /v1/finance/adjustment-types"
    },
    "/api-reference/transactions/list-transaction-methods": {
        "title": "List Transaction Methods",
        "subtitle": "GET /v1/finance/transaction-methods"
    },
    "/api-reference/transactions/list-transaction-types": {
        "title": "List Transaction Types",
        "subtitle": "GET /v1/finance/transaction-types"
    },
    "/api-reference/location-management/create-location": {
        "title": "Create Location",
        "subtitle": "POST /v1/operations/locations"
    },
    "/api-reference/location-management/update-location": {
        "title": "Update Location",
        "subtitle": "PATCH /v1/operations/locations/{id}"
    },
    "/api-reference/location-management/list-location-types": {
        "title": "List Location Types",
        "subtitle": "GET /v1/operations/location-types"
    },
    "/api-reference/location-management/list-locations": {
        "title": "List Locations",
        "subtitle": "GET /v1/operations/locations"
    },
    "/api-reference/location-management/retrieve-location-type": {
        "title": "Retrieve Location Type",
        "subtitle": "GET /v1/operations/location-types/{id}"
    },
    "/api-reference/location-management/retrieve-location": {
        "title": "Retrieve Location",
        "subtitle": "GET /v1/operations/locations/{id}"
    },
    "/api-reference/location-management/delete-location": {
        "title": "Delete Location",
        "subtitle": "DELETE /v1/operations/locations/{id}"
    },
    "/api-reference/scanning-stations-management/create-scanning-station": {
        "title": "Create Scanning Station",
        "subtitle": "POST /v1/operations/scanning-stations"
    },
    "/api-reference/scanning-stations-management/update-scanning-station": {
        "title": "Update Scanning Station",
        "subtitle": "PATCH /v1/operations/scanning-stations/{id}"
    },
    "/api-reference/scanning-stations-management/list-scanning-stations": {
        "title": "List Scanning Stations",
        "subtitle": "GET /v1/operations/scanning-stations"
    },
    "/api-reference/scanning-stations-management/retrieve-scanning-station": {
        "title": "Retrieve Scanning Station",
        "subtitle": "GET /v1/operations/scanning-stations/{id}"
    },
    "/api-reference/scanning-stations-management/delete-scanning-station": {
        "title": "Delete Scanning Station",
        "subtitle": "DELETE /v1/operations/scanning-stations/{id}"
    },
    "/api-reference/roles/create-role": {
        "title": "Create Role",
        "subtitle": "POST /v1/identity/roles"
    },
    "/api-reference/roles/update-role": {
        "title": "Update Role",
        "subtitle": "PATCH /v1/identity/roles/{id}"
    },
    "/api-reference/roles/list-roles": {
        "title": "List Roles",
        "subtitle": "GET /v1/identity/roles"
    },
    "/api-reference/roles/retrieve-role": {
        "title": "Retrieve Role",
        "subtitle": "GET /v1/identity/roles/{id}"
    },
    "/api-reference/roles/delete-role": {
        "title": "Delete Role",
        "subtitle": "DELETE /v1/identity/roles/{id}"
    }
};

export function getPagePreview(path: string): PagePreview | undefined {
    return pagePreviewData[path];
}
