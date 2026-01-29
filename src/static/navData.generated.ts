// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.

import { NavSection } from '@augno/ui';

export interface TabbedNavData {
    [tabId: string]: NavSection[];
}

export const navData: TabbedNavData = {
    "get-started": [
        {
            "title": "Get Started",
            "links": [
                {
                    "href": "/get-started",
                    "children": "Overview"
                },
                {
                    "title": "About the APIs",
                    "items": [
                        {
                            "href": "/api-tour",
                            "children": "API tour"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Start Building",
            "links": [
                {
                    "title": "Create an account",
                    "items": [
                        {
                            "href": "/account",
                            "children": "Overview"
                        },
                        {
                            "href": "/account/activate",
                            "children": "Activate your account"
                        },
                        {
                            "href": "/account/checklist",
                            "children": "Checklist"
                        }
                    ]
                },
                {
                    "title": "Start developing",
                    "items": [
                        {
                            "href": "/api-request",
                            "children": "Send your first API request"
                        },
                        {
                            "href": "/go-live",
                            "children": "Go live checklist"
                        },
                        {
                            "href": "/release-phases",
                            "children": "Release phases"
                        }
                    ]
                }
            ]
        }
    ],
    "workflows": [
        {
            "title": "Workflows",
            "links": [
                {
                    "href": "/workflows",
                    "children": "Overview"
                }
            ]
        },
        {
            "title": "Build products",
            "links": [
                {
                    "href": "/build-products/overview",
                    "children": "Overview"
                },
                {
                    "title": "Items",
                    "items": [
                        {
                            "href": "/build-products/items/overview",
                            "children": "Overview"
                        },
                        {
                            "href": "/build-products/items/materials",
                            "children": "Materials"
                        },
                        {
                            "href": "/build-products/items/parts",
                            "children": "Parts"
                        },
                        {
                            "href": "/build-products/items/products",
                            "children": "Products"
                        }
                    ]
                },
                {
                    "title": "Purchasing",
                    "items": [
                        {
                            "href": "/build-products/purchasing/suppliers",
                            "children": "Suppliers"
                        },
                        {
                            "href": "/build-products/purchasing/purchase-orders",
                            "children": "Purchase Orders"
                        },
                        {
                            "href": "/build-products/purchasing/deliveries-and-receiving",
                            "children": "Deliveries & Receiving"
                        }
                    ]
                },
                {
                    "title": "BOMs",
                    "items": [
                        {
                            "href": "/build-products/bom/production-steps",
                            "children": "Production Steps"
                        },
                        {
                            "href": "/build-products/bom/consumptions-and-productions",
                            "children": "Consumptions & Productions"
                        },
                        {
                            "href": "/build-products/bom/production-flows",
                            "children": "Production Flows"
                        },
                        {
                            "href": "/build-products/bom/costing",
                            "children": "Costing (COGS)"
                        }
                    ]
                },
                {
                    "title": "Production",
                    "items": [
                        {
                            "href": "/build-products/production/production-runs",
                            "children": "Production Runs"
                        },
                        {
                            "href": "/build-products/production/batches",
                            "children": "Batches"
                        },
                        {
                            "href": "/build-products/production/batch-operations",
                            "children": "Batch Operations"
                        }
                    ]
                },
                {
                    "title": "Scanning",
                    "items": [
                        {
                            "href": "/build-products/scanning/scanning-stations",
                            "children": "Scanning Stations"
                        },
                        {
                            "href": "/build-products/scanning/labels",
                            "children": "Labels"
                        }
                    ]
                },
                {
                    "title": "Inventory",
                    "items": [
                        {
                            "href": "/build-products/inventory/inventory",
                            "children": "Inventory Overview"
                        },
                        {
                            "href": "/build-products/inventory/storage-and-lots",
                            "children": "Storage Locations & Lots"
                        },
                        {
                            "href": "/build-products/inventory/change-logs",
                            "children": "Inventory Change Logs"
                        },
                        {
                            "href": "/build-products/inventory/reconciliation",
                            "children": "Reconciliation & Bulk Updates"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Generate sales",
            "links": [
                {
                    "href": "/generate-sales/overview",
                    "children": "Overview"
                },
                {
                    "title": "Customer setup",
                    "items": [
                        {
                            "href": "/generate-sales/customer-setup/customer-groups",
                            "children": "Customer groups"
                        },
                        {
                            "href": "/generate-sales/customer-setup/shipping-terms",
                            "children": "Shipping terms"
                        },
                        {
                            "href": "/generate-sales/customer-setup/payment-terms",
                            "children": "Payment terms"
                        },
                        {
                            "href": "/generate-sales/customer-setup/priorities",
                            "children": "Priorities"
                        },
                        {
                            "href": "/generate-sales/customer-setup/account-statuses",
                            "children": "Account statuses"
                        },
                        {
                            "href": "/generate-sales/customer-setup/exemptions",
                            "children": "Commission & freight exemption"
                        },
                        {
                            "href": "/generate-sales/customer-setup/default-sales-reps",
                            "children": "Default sales reps"
                        },
                        {
                            "href": "/generate-sales/customer-setup/default-carriers",
                            "children": "Default carriers & options"
                        },
                        {
                            "href": "/generate-sales/customer-setup/addresses",
                            "children": "Addresses"
                        }
                    ]
                },
                {
                    "title": "Customer",
                    "items": [
                        {
                            "href": "/generate-sales/customer/overview",
                            "children": "Overview"
                        },
                        {
                            "href": "/generate-sales/customer/create",
                            "children": "Create a customer"
                        },
                        {
                            "href": "/generate-sales/customer/contacts",
                            "children": "Contacts"
                        }
                    ]
                },
                {
                    "title": "Customer pricing",
                    "items": [
                        {
                            "href": "/generate-sales/customer-pricing/customer-prices",
                            "children": "Customer prices"
                        },
                        {
                            "href": "/generate-sales/customer-pricing/volume-discounts",
                            "children": "Volume discounts"
                        },
                        {
                            "href": "/generate-sales/customer-pricing/discount-codes",
                            "children": "Discount codes"
                        }
                    ]
                },
                {
                    "title": "Sales order",
                    "items": [
                        {
                            "href": "/generate-sales/sales-order/overview",
                            "children": "Overview"
                        },
                        {
                            "href": "/generate-sales/sales-order/create",
                            "children": "Create a sales order"
                        },
                        {
                            "href": "/generate-sales/sales-order/generate-production-run",
                            "children": "Generate a production run"
                        },
                        {
                            "href": "/generate-sales/sales-order/issue",
                            "children": "Issue a sales order"
                        }
                    ]
                },
                {
                    "title": "Sales team",
                    "items": [
                        {
                            "href": "/generate-sales/sales-team/territories",
                            "children": "Territories"
                        },
                        {
                            "href": "/generate-sales/sales-team/sales-targets",
                            "children": "Sales targets"
                        }
                    ]
                },
                {
                    "href": "/generate-sales/customer-portal",
                    "children": "Customer portal"
                }
            ]
        },
        {
            "title": "Ship products",
            "links": [
                {
                    "href": "/ship-products/overview",
                    "children": "Overview"
                },
                {
                    "href": "/ship-products/picking/overview",
                    "children": "Picking"
                },
                {
                    "href": "/ship-products/packing/overview",
                    "children": "Packing"
                },
                {
                    "href": "/ship-products/shipping/overview",
                    "children": "Shipping"
                }
            ]
        },
        {
            "title": "Collect payments",
            "links": [
                {
                    "href": "/collect-payments/overview",
                    "children": "Overview"
                },
                {
                    "href": "/collect-payments/invoicing/overview",
                    "children": "Invoicing"
                },
                {
                    "href": "/collect-payments/accounts-receivable/overview",
                    "children": "Accounts receivable"
                },
                {
                    "title": "Collecting",
                    "items": [
                        {
                            "href": "/collect-payments/collecting/overview",
                            "children": "Overview"
                        },
                        {
                            "href": "/collect-payments/collecting/settlements",
                            "children": "Settlements"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Dashboards",
            "links": [
                {
                    "href": "/dashboards/overview",
                    "children": "Overview"
                },
                {
                    "title": "Sales",
                    "items": [
                        {
                            "href": "/dashboards/sales/order-analytics",
                            "children": "Order analytics"
                        },
                        {
                            "href": "/dashboards/sales/order-data",
                            "children": "Order data"
                        },
                        {
                            "href": "/dashboards/sales/quarterly-orders",
                            "children": "Quarterly orders"
                        },
                        {
                            "href": "/dashboards/sales/products-on-order",
                            "children": "Products on order"
                        },
                        {
                            "href": "/dashboards/sales/weeks-of-sales",
                            "children": "Weeks of sales"
                        }
                    ]
                },
                {
                    "title": "Operations",
                    "items": [
                        {
                            "href": "/dashboards/operations/delivery-analytics",
                            "children": "Delivery analytics"
                        },
                        {
                            "href": "/dashboards/operations/manufacturing-analytics",
                            "children": "Manufacturing analytics"
                        },
                        {
                            "href": "/dashboards/operations/material-analytics",
                            "children": "Material analytics"
                        }
                    ]
                },
                {
                    "title": "Financial",
                    "items": [
                        {
                            "href": "/dashboards/financial/accounts-receivable",
                            "children": "Accounts receivable"
                        },
                        {
                            "href": "/dashboards/financial/payments-data",
                            "children": "Payments data"
                        }
                    ]
                },
                {
                    "title": "Forecasting & targets",
                    "items": [
                        {
                            "href": "/dashboards/forecasting/demand-forecast",
                            "children": "Demand forecast"
                        },
                        {
                            "href": "/dashboards/forecasting/sales-targets",
                            "children": "Sales targets"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Manage your account",
            "links": [
                {
                    "href": "/manage-account/overview",
                    "children": "Overview"
                },
                {
                    "title": "Account settings",
                    "items": [
                        {
                            "href": "/manage-account/account-settings/profile",
                            "children": "Your profile"
                        },
                        {
                            "href": "/manage-account/account-settings/business-information",
                            "children": "Business information"
                        }
                    ]
                },
                {
                    "title": "Team",
                    "items": [
                        {
                            "href": "/manage-account/team/team-members",
                            "children": "Team members"
                        },
                        {
                            "href": "/manage-account/team/roles-and-permissions",
                            "children": "Roles and permissions"
                        }
                    ]
                },
                {
                    "href": "/manage-account/integrations",
                    "children": "Integrations"
                },
                {
                    "href": "/manage-account/api-keys",
                    "children": "API keys"
                },
                {
                    "href": "/manage-account/sandboxes",
                    "children": "Sandboxes"
                },
                {
                    "href": "/manage-account/security",
                    "children": "Security"
                },
                {
                    "href": "/manage-account/plans-and-billing",
                    "children": "Plans & billing"
                }
            ]
        }
    ],
    "developer-resources": [
        {
            "title": "Developer resources",
            "links": [
                {
                    "href": "/development",
                    "children": "Overview"
                }
            ]
        },
        {
            "title": "API",
            "links": [
                {
                    "href": "/api/overview",
                    "children": "Overview"
                },
                {
                    "title": "Authentication",
                    "items": [
                        {
                            "href": "/api/api-keys",
                            "children": "API Keys"
                        },
                        {
                            "href": "/api/managing-api-keys",
                            "children": "Managing API Keys"
                        }
                    ]
                },
                {
                    "title": "Make Requests",
                    "items": [
                        {
                            "href": "/api/uris",
                            "children": "API URIs"
                        },
                        {
                            "href": "/api/idempotency",
                            "children": "Idempotency"
                        },
                        {
                            "href": "/api/rate-limiting",
                            "children": "Rate limiting"
                        },
                        {
                            "href": "/api/versioning",
                            "children": "API versioning"
                        },
                        {
                            "href": "/api/pagination",
                            "children": "Pagination"
                        },
                        {
                            "href": "/api/request-ids",
                            "children": "Request IDs"
                        }
                    ]
                },
                {
                    "title": "Handling Errors",
                    "items": [
                        {
                            "href": "/api/errors",
                            "children": "API errors"
                        }
                    ]
                },
                {
                    "title": "Monitoring",
                    "items": [
                        {
                            "href": "/api/request-logs",
                            "children": "Request logs"
                        }
                    ]
                },
                {
                    "title": "API Reference",
                    "items": [
                        {
                            "href": "/api-reference",
                            "children": "Overview"
                        },
                        {
                            "href": "/api-reference/api-key-management",
                            "children": "API Key Management"
                        },
                        {
                            "href": "/api-reference/request-log-management",
                            "children": "Request Log Management"
                        },
                        {
                            "href": "/api-reference/sandbox-management",
                            "children": "Sandbox Management"
                        },
                        {
                            "href": "/api-reference/units-management",
                            "children": "Units Management"
                        }
                    ]
                }
            ]
        }
    ]
};
