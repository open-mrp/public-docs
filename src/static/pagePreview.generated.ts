// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

export interface PagePreview {
    title: string;
    subtitle?: string;
}

export const pagePreviewData: Record<string, PagePreview> = {
    "/api-reference": {
        "title": "API Reference",
        "subtitle": "Complete API documentation for all endpoints"
    },
    "/development": {
        "title": "Developer resources",
        "subtitle": "Technical documentation, API references, and guides for developers."
    },
    "/workflows": {
        "title": "Workflows",
        "subtitle": "End-to-end guides for common business processes in Augno."
    },
    "/api/overview": {
        "title": "Augno's APIs",
        "subtitle": "Learn more about Augno's APIs."
    },
    "/api-reference/request-log-management": {
        "title": "Request Log Management",
        "subtitle": "Handles listing and retrieving request logs."
    },
    "/api-reference/api-key-management": {
        "title": "API Key Management",
        "subtitle": "Handles creating and managing API keys for programmatic access."
    },
    "/api-reference/units-management": {
        "title": "Units Management",
        "subtitle": "Handles listing and managing units."
    },
    "/api-reference/sandbox-management": {
        "title": "Sandbox Management",
        "subtitle": "Handles listing and managing sandbox environments."
    },
    "/get-started": {
        "title": "Get started",
        "subtitle": "Create an account and learn how to build on Augno."
    },
    "/generate-sales/customer-portal": {
        "title": "Customer portal",
        "subtitle": "A branded, self-service portal where your customers register, place orders, submit payments, and track inventory."
    },
    "/generate-sales/overview": {
        "title": "Generate Sales",
        "subtitle": "Customers, pricing, orders, and the sales team - everything that drives revenue in Augno."
    },
    "/manage-account/plans-and-billing": {
        "title": "Plans and billing",
        "subtitle": "View your subscription, switch plans, and manage billing through Stripe."
    },
    "/manage-account/api-keys": {
        "title": "API keys",
        "subtitle": "Create, rotate, and revoke API keys for programmatic access to Augno."
    },
    "/manage-account/integrations": {
        "title": "Integrations",
        "subtitle": "Connect third-party services like Stripe and Shippo to your Augno account."
    },
    "/manage-account/security": {
        "title": "Security",
        "subtitle": "Manage your password and keep your account secure."
    },
    "/manage-account/sandboxes": {
        "title": "Sandboxes",
        "subtitle": "Create isolated testing environments to develop and experiment without affecting production data."
    },
    "/manage-account/overview": {
        "title": "Manage Your Account",
        "subtitle": "Configure your account settings, team, integrations, security, and billing."
    },
    "/dashboards/overview": {
        "title": "Dashboards",
        "subtitle": "Analytics and reporting dashboards that give you real-time visibility into sales, operations, finances, and forecasting."
    },
    "/api/api-keys": {
        "title": "API Keys",
        "subtitle": "Learn how to authenticate requests with API keys."
    },
    "/api/managing-api-keys": {
        "title": "Managing API Keys",
        "subtitle": "Learn the best practices for managing secret API keys."
    },
    "/ship-products/picking/overview": {
        "title": "Picking",
        "subtitle": "Select and pull the right products from inventory to fulfill a sales order."
    },
    "/ship-products/shipping/overview": {
        "title": "Shipping",
        "subtitle": "Generate shipping labels, assign tracking numbers, and ship packed orders through your carrier."
    },
    "/ship-products/overview": {
        "title": "Ship Products",
        "subtitle": "Learn about shipping products in Augno."
    },
    "/ship-products/packing/overview": {
        "title": "Packing",
        "subtitle": "Pack picked items into shipping cases and create shipments ready for the carrier."
    },
    "/api/idempotency": {
        "title": "Idempotency",
        "subtitle": "Safely retry requests without duplicating work."
    },
    "/api/request-ids": {
        "title": "Request IDs",
        "subtitle": "Use request IDs to debug issues and get support."
    },
    "/api/uris": {
        "title": "Augno API URIs",
        "subtitle": "Learn the general format of Augno API URIs."
    },
    "/api/versioning": {
        "title": "API Versioning",
        "subtitle": "Understand how Augno versions its API and manage version upgrades."
    },
    "/api/pagination": {
        "title": "Pagination",
        "subtitle": "Iterating through paginated list results."
    },
    "/api/rate-limiting": {
        "title": "Rate Limiting",
        "subtitle": "Understand rate limits and implement retry strategies."
    },
    "/api/errors": {
        "title": "API Errors",
        "subtitle": "Standard error envelope format for consistent error handling."
    },
    "/api/request-logs": {
        "title": "Request Logs",
        "subtitle": "Monitor and debug your API activity with request logs."
    },
    "/collect-payments/overview": {
        "title": "Collect Payments",
        "subtitle": "Learn about collecting payments in Augno."
    },
    "/build-products/overview": {
        "title": "Build Products",
        "subtitle": "Purchasing, manufacturing, production tracking, and inventory management."
    },
    "/api-tour": {
        "title": "Tour of the Augno API",
        "subtitle": "See how Augno API objects fit together and learn best practices for combining them effectively."
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
    "/release-phases": {
        "title": "Product Release Phases",
        "subtitle": "Learn how Augno describes product release phases and what to expect from each."
    },
    "/go-live": {
        "title": "Go live checklist",
        "subtitle": "Use this checklist to ensure a smooth transition putting your integration into production."
    },
    "/generate-sales/customer/overview": {
        "title": "Customers",
        "subtitle": "The central record connecting sales orders, invoices, shipments, and payments."
    },
    "/generate-sales/customer/contacts": {
        "title": "Contacts",
        "subtitle": "Manage the people associated with a customer and control who receives order confirmations and invoices."
    },
    "/generate-sales/customer/create": {
        "title": "Create a customer",
        "subtitle": "Learn how to create a customer in Augno."
    },
    "/generate-sales/sales-team/territories": {
        "title": "Territories",
        "subtitle": "Map geographic regions to sales representatives, optionally scoped by product line."
    },
    "/generate-sales/sales-team/sales-targets": {
        "title": "Sales targets",
        "subtitle": "Define revenue goals for sales reps over a date range, optionally by product line."
    },
    "/generate-sales/sales-order/generate-production-run": {
        "title": "Generate a production run",
        "subtitle": "Generate a production run from a sales order in Augno."
    },
    "/generate-sales/sales-order/overview": {
        "title": "Sales orders",
        "subtitle": "The central order for selling products to a customer, driving fulfillment from creation through payment."
    },
    "/generate-sales/sales-order/issue": {
        "title": "Issue a sales order",
        "subtitle": "Learn how to issue a sales order in Augno."
    },
    "/generate-sales/sales-order/create": {
        "title": "Create a sales order",
        "subtitle": "Learn how to create a sales order in Augno."
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
    "/generate-sales/customer-setup/payment-terms": {
        "title": "Payment terms",
        "subtitle": "Define when and how a customer is expected to pay for an order."
    },
    "/generate-sales/customer-setup/account-statuses": {
        "title": "Account statuses",
        "subtitle": "Control whether a customer can place orders and receive shipments."
    },
    "/generate-sales/customer-setup/addresses": {
        "title": "Addresses",
        "subtitle": "Billing and shipping locations for customers, used on orders, invoices, and shipments."
    },
    "/generate-sales/customer-setup/shipping-terms": {
        "title": "Shipping terms",
        "subtitle": "Define who pays for freight, how charges are calculated, and when freight is waived."
    },
    "/generate-sales/customer-setup/exemptions": {
        "title": "Commission & freight exemption",
        "subtitle": "Exclude customers or customer groups from commission calculations and freight charges."
    },
    "/generate-sales/customer-setup/priorities": {
        "title": "Priorities",
        "subtitle": "Control order-processing precedence to determine which work gets attention first."
    },
    "/generate-sales/customer-setup/default-carriers": {
        "title": "Default carriers & options",
        "subtitle": "Define the shipping carrier and service level automatically applied to a customer's orders."
    },
    "/generate-sales/customer-setup/customer-groups": {
        "title": "Customer groups",
        "subtitle": "Classify customers by segment and control which pricing and discounts they receive."
    },
    "/generate-sales/customer-setup/default-sales-reps": {
        "title": "Default sales reps",
        "subtitle": "The team member automatically assigned to new orders for a customer."
    },
    "/manage-account/team/roles-and-permissions": {
        "title": "Roles and permissions",
        "subtitle": "Control what team members and API keys can access with granular, role-based permissions."
    },
    "/manage-account/team/team-members": {
        "title": "Team members",
        "subtitle": "Invite, manage, and remove the people who use your Augno account."
    },
    "/manage-account/account-settings/business-information": {
        "title": "Business information",
        "subtitle": "Configure your account name, logo, contact details, and portal slug."
    },
    "/manage-account/account-settings/profile": {
        "title": "Your profile",
        "subtitle": "Update your display name, email address, and profile photo."
    },
    "/dashboards/forecasting/demand-forecast": {
        "title": "Demand forecast",
        "subtitle": "Forecast demand, order revenue, and sales revenue with confidence intervals based on historical data."
    },
    "/dashboards/forecasting/sales-targets": {
        "title": "Sales targets dashboard",
        "subtitle": "View and create revenue targets for sales reps by month."
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
    "/dashboards/financial/accounts-receivable": {
        "title": "Accounts receivable dashboard",
        "subtitle": "An aging report showing what customers owe across current, 30, 60, 90, and 120-day buckets."
    },
    "/dashboards/financial/payments-data": {
        "title": "Payments data",
        "subtitle": "View payment allocations across invoices with support for invoice and balance view modes."
    },
    "/dashboards/sales/order-analytics": {
        "title": "Order analytics",
        "subtitle": "A comprehensive view of sales performance with profit metrics, cumulative revenue, best sellers, and distribution breakdowns."
    },
    "/dashboards/sales/quarterly-orders": {
        "title": "Quarterly orders",
        "subtitle": "Visualize order quantity trends by quarter across multiple years."
    },
    "/dashboards/sales/products-on-order": {
        "title": "Products on order",
        "subtitle": "View open orders, back-order quantities, and top ordered products at a glance."
    },
    "/dashboards/sales/order-data": {
        "title": "Order data",
        "subtitle": "A raw, line-level data grid of all sales transactions with Excel export."
    },
    "/dashboards/sales/weeks-of-sales": {
        "title": "Weeks of sales",
        "subtitle": "See how many weeks of inventory you have on hand based on recent sales velocity."
    },
    "/collect-payments/collecting/settlements": {
        "title": "Settlements",
        "subtitle": "Formally record which transactions pay which invoices by creating settlements with allocations."
    },
    "/collect-payments/collecting/overview": {
        "title": "Collecting",
        "subtitle": "Record the money received from customers and apply it to open invoices through transactions and settlements."
    },
    "/collect-payments/invoicing/overview": {
        "title": "Invoicing",
        "subtitle": "Invoices are the billing records Augno generates for each shipment, capturing what was shipped, to whom, and for how much."
    },
    "/collect-payments/accounts-receivable/overview": {
        "title": "Accounts receivable",
        "subtitle": "Track what customers owe, how long balances have been outstanding, and take action to collect."
    },
    "/build-products/items/parts": {
        "title": "Parts",
        "subtitle": "Intermediate items you manufacture or assemble from materials during production."
    },
    "/build-products/items/materials": {
        "title": "Materials",
        "subtitle": "Raw materials and supplies you purchase from vendors for use in production."
    },
    "/build-products/items/products": {
        "title": "Products",
        "subtitle": "Finished goods you price, stock, and sell to customers."
    },
    "/build-products/items/overview": {
        "title": "Items overview",
        "subtitle": "Materials, parts, and products - the core objects you buy, make, and sell in Augno."
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
    "/build-products/inventory/change-logs": {
        "title": "Inventory Change Logs",
        "subtitle": "A complete audit trail of every inventory movement - who changed what, when, by how much, and why."
    },
    "/build-products/inventory/storage-and-lots": {
        "title": "Storage Locations & Lots",
        "subtitle": "Where inventory is physically stored and how batch-level traceability is maintained."
    },
    "/build-products/inventory/inventory": {
        "title": "Inventory Overview",
        "subtitle": "Real-time visibility into every unit of material, part, and product - what you have, where it is, and what it costs."
    },
    "/build-products/inventory/reconciliation": {
        "title": "Reconciliation & Bulk Updates",
        "subtitle": "Correct inventory counts when the system and physical reality diverge, with full audit trail logging."
    },
    "/build-products/scanning/scanning-stations": {
        "title": "Scanning Stations",
        "subtitle": "Configured points in your production workflow where batch operations happen - each linked to a specific operation type and production step."
    },
    "/build-products/scanning/labels": {
        "title": "Labels",
        "subtitle": "Batch identification labels printed at scanning stations - two formats and four sizes for production floor tracking."
    },
    "/build-products/purchasing/purchase-orders": {
        "title": "Purchase Orders",
        "subtitle": "Transaction records for buying materials from suppliers, tracking orders through delivery and fulfillment."
    },
    "/build-products/purchasing/suppliers": {
        "title": "Suppliers",
        "subtitle": "Vendors you purchase materials from, defining the source for your raw material procurement."
    },
    "/build-products/purchasing/deliveries-and-receiving": {
        "title": "Deliveries & Receiving",
        "subtitle": "Track the physical arrival of materials from suppliers and convert purchase order quantities into usable inventory."
    },
    "/build-products/bom/costing": {
        "title": "Costing (COGS)",
        "subtitle": "Real-time cost of goods sold calculation from production step definitions - material, labor, and overhead costs."
    },
    "/build-products/bom/production-flows": {
        "title": "Production Flows",
        "subtitle": "The connected sequence of production steps that transforms raw materials into finished products."
    },
    "/build-products/bom/consumptions-and-productions": {
        "title": "Consumptions & Productions",
        "subtitle": "The inputs and outputs of each production step - what materials are used up and what parts or products are created."
    },
    "/build-products/bom/production-steps": {
        "title": "Production Steps",
        "subtitle": "The core building block of manufacturing in Augno - defining inputs, outputs, and costs for each stage of production."
    }
};

export function getPagePreview(path: string): PagePreview | undefined {
    return pagePreviewData[path];
}
