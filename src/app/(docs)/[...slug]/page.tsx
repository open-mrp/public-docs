import { fetchPageBySlug } from '@/lib/mdx/fetchPageBySlug';
import { MarkdownPage } from '../../_components/MarkdownPage';

const getPageContent = async (slug: string[]) => {
    const { meta, content, cleanMarkdown } = await fetchPageBySlug(slug);
    return { meta, content, cleanMarkdown };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const { meta } = await getPageContent(slug);
    return { title: meta.title + ' | Augno Documentation' };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const { content, meta, cleanMarkdown } = await getPageContent(slug);

    if (meta.layout === 'api-reference') {
        return <>{content}</>;
    }

    return <MarkdownPage meta={meta} content={content} cleanMarkdown={cleanMarkdown} />;
}

export function generateStaticParams() {
  return [
  {
    "slug": [
      "development"
    ]
  },
  {
    "slug": [
      "workflows"
    ]
  },
  {
    "slug": [
      "api-reference"
    ]
  },
  {
    "slug": [
      "api",
      "overview"
    ]
  },
  {
    "slug": [
      "get-started"
    ]
  },
  {
    "slug": [
      "manage-account",
      "plans-and-billing"
    ]
  },
  {
    "slug": [
      "manage-account",
      "api-keys"
    ]
  },
  {
    "slug": [
      "manage-account",
      "integrations"
    ]
  },
  {
    "slug": [
      "manage-account",
      "security"
    ]
  },
  {
    "slug": [
      "manage-account",
      "sandboxes"
    ]
  },
  {
    "slug": [
      "manage-account",
      "overview"
    ]
  },
  {
    "slug": [
      "collect-payments",
      "overview"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-portal"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "overview"
    ]
  },
  {
    "slug": [
      "build-products",
      "overview"
    ]
  },
  {
    "slug": [
      "ship-products",
      "picking",
      "overview"
    ]
  },
  {
    "slug": [
      "ship-products",
      "shipping",
      "overview"
    ]
  },
  {
    "slug": [
      "ship-products",
      "overview"
    ]
  },
  {
    "slug": [
      "ship-products",
      "packing",
      "overview"
    ]
  },
  {
    "slug": [
      "dashboards",
      "overview"
    ]
  },
  {
    "slug": [
      "api-reference",
      "audit-event-management",
      "get-audit-event"
    ]
  },
  {
    "slug": [
      "api-reference",
      "audit-event-management",
      "list-audit-event-resource-types"
    ]
  },
  {
    "slug": [
      "api-reference",
      "audit-event-management",
      "list-audit-events"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-groups",
      "delete-account-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-groups",
      "update-account-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-groups",
      "get-account-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-groups",
      "list-account-groups"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-groups",
      "create-account-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "payment-terms-management",
      "delete-payment-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "payment-terms-management",
      "list-payment-terms"
    ]
  },
  {
    "slug": [
      "api-reference",
      "payment-terms-management",
      "create-payment-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "payment-terms-management",
      "get-payment-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "payment-terms-management",
      "update-payment-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "email-logs",
      "get-email-log"
    ]
  },
  {
    "slug": [
      "api-reference",
      "email-logs",
      "list-email-logs"
    ]
  },
  {
    "slug": [
      "api-reference",
      "priorities",
      "list-priorities"
    ]
  },
  {
    "slug": [
      "api-reference",
      "priorities",
      "get-priority"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "delete-attribute"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "get-property"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "delete-property"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "create-attribute"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "update-attribute"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "list-properties"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "get-attribute"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "create-property"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "list-attributes"
    ]
  },
  {
    "slug": [
      "api-reference",
      "properties-management",
      "update-property"
    ]
  },
  {
    "slug": [
      "api-reference",
      "address-management",
      "update-address"
    ]
  },
  {
    "slug": [
      "api-reference",
      "address-management",
      "delete-address"
    ]
  },
  {
    "slug": [
      "api-reference",
      "address-management",
      "create-address"
    ]
  },
  {
    "slug": [
      "api-reference",
      "address-management",
      "get-address"
    ]
  },
  {
    "slug": [
      "api-reference",
      "address-management",
      "list-addresses"
    ]
  },
  {
    "slug": [
      "api-reference",
      "shipping-terms-management",
      "get-shipping-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "shipping-terms-management",
      "update-shipping-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "shipping-terms-management",
      "delete-shipping-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "shipping-terms-management",
      "create-shipping-term"
    ]
  },
  {
    "slug": [
      "api-reference",
      "shipping-terms-management",
      "list-shipping-terms"
    ]
  },
  {
    "slug": [
      "api-reference",
      "request-log-management",
      "get-request-log"
    ]
  },
  {
    "slug": [
      "api-reference",
      "request-log-management",
      "list-request-logs"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "create-item-category"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "list-item-categories"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "remove-item-category-property"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "change-item-category-unit-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "delete-item-category"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "add-item-category-property"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "update-item-category"
    ]
  },
  {
    "slug": [
      "api-reference",
      "item-categories-management",
      "get-item-category"
    ]
  },
  {
    "slug": [
      "api-reference",
      "location-management",
      "get-location"
    ]
  },
  {
    "slug": [
      "api-reference",
      "location-management",
      "get-location-type"
    ]
  },
  {
    "slug": [
      "api-reference",
      "location-management",
      "delete-location"
    ]
  },
  {
    "slug": [
      "api-reference",
      "location-management",
      "list-locations"
    ]
  },
  {
    "slug": [
      "api-reference",
      "location-management",
      "list-location-types"
    ]
  },
  {
    "slug": [
      "api-reference",
      "location-management",
      "update-location"
    ]
  },
  {
    "slug": [
      "api-reference",
      "location-management",
      "create-location"
    ]
  },
  {
    "slug": [
      "api-reference",
      "units-management",
      "create-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "units-management",
      "delete-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "units-management",
      "get-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "units-management",
      "update-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "units-management",
      "list-units"
    ]
  },
  {
    "slug": [
      "api-reference",
      "scanning-stations-management",
      "create-scanning-station"
    ]
  },
  {
    "slug": [
      "api-reference",
      "scanning-stations-management",
      "update-scanning-station"
    ]
  },
  {
    "slug": [
      "api-reference",
      "scanning-stations-management",
      "get-scanning-station"
    ]
  },
  {
    "slug": [
      "api-reference",
      "scanning-stations-management",
      "delete-scanning-station"
    ]
  },
  {
    "slug": [
      "api-reference",
      "scanning-stations-management",
      "list-scanning-stations"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-users-management",
      "create-account-user"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-users-management",
      "get-account-user"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-users-management",
      "update-account-user-status"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-users-management",
      "update-account-user"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-users-management",
      "list-account-users"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-statuses",
      "list-account-statuses"
    ]
  },
  {
    "slug": [
      "api-reference",
      "account-statuses",
      "get-account-status"
    ]
  },
  {
    "slug": [
      "api-reference",
      "roles",
      "create-role"
    ]
  },
  {
    "slug": [
      "api-reference",
      "roles",
      "delete-role"
    ]
  },
  {
    "slug": [
      "api-reference",
      "roles",
      "list-roles"
    ]
  },
  {
    "slug": [
      "api-reference",
      "roles",
      "get-role"
    ]
  },
  {
    "slug": [
      "api-reference",
      "roles",
      "update-role"
    ]
  },
  {
    "slug": [
      "api-reference",
      "api-key-management",
      "get-api-key"
    ]
  },
  {
    "slug": [
      "api-reference",
      "api-key-management",
      "rotate-api-key"
    ]
  },
  {
    "slug": [
      "api-reference",
      "api-key-management",
      "list-api-keys"
    ]
  },
  {
    "slug": [
      "api-reference",
      "api-key-management",
      "create-api-key"
    ]
  },
  {
    "slug": [
      "api-reference",
      "api-key-management",
      "revoke-api-key"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "update-unit-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "list-unit-group-units"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "delete-unit-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "create-unit-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "list-unit-groups"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "get-unit-group-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "create-unit-group-associated-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "update-unit-group-associated-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "delete-unit-group-associated-unit"
    ]
  },
  {
    "slug": [
      "api-reference",
      "unit-groups-management",
      "get-unit-group"
    ]
  },
  {
    "slug": [
      "api-reference",
      "address-validation",
      "list-address-suggestions"
    ]
  },
  {
    "slug": [
      "api-reference",
      "address-validation",
      "validate-address"
    ]
  },
  {
    "slug": [
      "api-reference",
      "product-lines-management",
      "delete-product-line"
    ]
  },
  {
    "slug": [
      "api-reference",
      "product-lines-management",
      "list-product-lines"
    ]
  },
  {
    "slug": [
      "api-reference",
      "product-lines-management",
      "get-product-line"
    ]
  },
  {
    "slug": [
      "api-reference",
      "product-lines-management",
      "create-product-line"
    ]
  },
  {
    "slug": [
      "api-reference",
      "product-lines-management",
      "update-product-line"
    ]
  },
  {
    "slug": [
      "api-reference",
      "sandbox-management",
      "get-sandbox"
    ]
  },
  {
    "slug": [
      "api-reference",
      "sandbox-management",
      "create-sandbox"
    ]
  },
  {
    "slug": [
      "api-reference",
      "sandbox-management",
      "delete-sandbox"
    ]
  },
  {
    "slug": [
      "api-reference",
      "sandbox-management",
      "list-sandboxes"
    ]
  },
  {
    "slug": [
      "api-reference",
      "customers",
      "get-customer"
    ]
  },
  {
    "slug": [
      "api-reference",
      "customers",
      "delete-customer"
    ]
  },
  {
    "slug": [
      "api-reference",
      "customers",
      "create-customer"
    ]
  },
  {
    "slug": [
      "api-reference",
      "customers",
      "update-customer"
    ]
  },
  {
    "slug": [
      "api-reference",
      "customers",
      "merge-customers"
    ]
  },
  {
    "slug": [
      "api-reference",
      "customers",
      "list-customers"
    ]
  },
  {
    "slug": [
      "api",
      "api-keys"
    ]
  },
  {
    "slug": [
      "api",
      "managing-api-keys"
    ]
  },
  {
    "slug": [
      "api",
      "errors"
    ]
  },
  {
    "slug": [
      "api-tour"
    ]
  },
  {
    "slug": [
      "api",
      "idempotency"
    ]
  },
  {
    "slug": [
      "api",
      "request-ids"
    ]
  },
  {
    "slug": [
      "api",
      "uris"
    ]
  },
  {
    "slug": [
      "api",
      "versioning"
    ]
  },
  {
    "slug": [
      "api",
      "include"
    ]
  },
  {
    "slug": [
      "api",
      "pagination"
    ]
  },
  {
    "slug": [
      "api",
      "rate-limiting"
    ]
  },
  {
    "slug": [
      "api-request"
    ]
  },
  {
    "slug": [
      "release-phases"
    ]
  },
  {
    "slug": [
      "go-live"
    ]
  },
  {
    "slug": [
      "manage-account",
      "team",
      "roles-and-permissions"
    ]
  },
  {
    "slug": [
      "manage-account",
      "team",
      "team-members"
    ]
  },
  {
    "slug": [
      "api",
      "request-logs"
    ]
  },
  {
    "slug": [
      "manage-account",
      "account-settings",
      "business-information"
    ]
  },
  {
    "slug": [
      "manage-account",
      "account-settings",
      "profile"
    ]
  },
  {
    "slug": [
      "collect-payments",
      "collecting",
      "settlements"
    ]
  },
  {
    "slug": [
      "collect-payments",
      "collecting",
      "overview"
    ]
  },
  {
    "slug": [
      "account",
      "activate"
    ]
  },
  {
    "slug": [
      "account",
      "checklist"
    ]
  },
  {
    "slug": [
      "account"
    ]
  },
  {
    "slug": [
      "collect-payments",
      "invoicing",
      "overview"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer",
      "overview"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer",
      "contacts"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer",
      "create"
    ]
  },
  {
    "slug": [
      "collect-payments",
      "accounts-receivable",
      "overview"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "payment-terms"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "account-statuses"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "addresses"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "shipping-terms"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "exemptions"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "priorities"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "default-carriers"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "customer-groups"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-setup",
      "default-sales-reps"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "sales-team",
      "territories"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "sales-team",
      "sales-targets"
    ]
  },
  {
    "slug": [
      "build-products",
      "items",
      "parts"
    ]
  },
  {
    "slug": [
      "build-products",
      "items",
      "materials"
    ]
  },
  {
    "slug": [
      "build-products",
      "items",
      "products"
    ]
  },
  {
    "slug": [
      "build-products",
      "items",
      "overview"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-pricing",
      "discount-codes"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-pricing",
      "customer-prices"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "customer-pricing",
      "volume-discounts"
    ]
  },
  {
    "slug": [
      "build-products",
      "scanning",
      "scanning-stations"
    ]
  },
  {
    "slug": [
      "build-products",
      "scanning",
      "labels"
    ]
  },
  {
    "slug": [
      "build-products",
      "inventory",
      "change-logs"
    ]
  },
  {
    "slug": [
      "build-products",
      "inventory",
      "storage-and-lots"
    ]
  },
  {
    "slug": [
      "build-products",
      "inventory",
      "inventory"
    ]
  },
  {
    "slug": [
      "build-products",
      "inventory",
      "reconciliation"
    ]
  },
  {
    "slug": [
      "dashboards",
      "forecasting",
      "demand-forecast"
    ]
  },
  {
    "slug": [
      "dashboards",
      "forecasting",
      "sales-targets"
    ]
  },
  {
    "slug": [
      "dashboards",
      "financial",
      "accounts-receivable"
    ]
  },
  {
    "slug": [
      "dashboards",
      "financial",
      "payments-data"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "sales-order",
      "generate-production-run"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "sales-order",
      "overview"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "sales-order",
      "issue"
    ]
  },
  {
    "slug": [
      "generate-sales",
      "sales-order",
      "create"
    ]
  },
  {
    "slug": [
      "build-products",
      "bom",
      "costing"
    ]
  },
  {
    "slug": [
      "build-products",
      "bom",
      "production-flows"
    ]
  },
  {
    "slug": [
      "build-products",
      "bom",
      "consumptions-and-productions"
    ]
  },
  {
    "slug": [
      "build-products",
      "bom",
      "production-steps"
    ]
  },
  {
    "slug": [
      "dashboards",
      "sales",
      "order-analytics"
    ]
  },
  {
    "slug": [
      "dashboards",
      "sales",
      "quarterly-orders"
    ]
  },
  {
    "slug": [
      "dashboards",
      "sales",
      "products-on-order"
    ]
  },
  {
    "slug": [
      "dashboards",
      "sales",
      "order-data"
    ]
  },
  {
    "slug": [
      "dashboards",
      "sales",
      "weeks-of-sales"
    ]
  },
  {
    "slug": [
      "build-products",
      "production",
      "production-runs"
    ]
  },
  {
    "slug": [
      "build-products",
      "production",
      "batch-operations"
    ]
  },
  {
    "slug": [
      "build-products",
      "production",
      "batches"
    ]
  },
  {
    "slug": [
      "build-products",
      "purchasing",
      "purchase-orders"
    ]
  },
  {
    "slug": [
      "build-products",
      "purchasing",
      "suppliers"
    ]
  },
  {
    "slug": [
      "build-products",
      "purchasing",
      "deliveries-and-receiving"
    ]
  },
  {
    "slug": [
      "dashboards",
      "operations",
      "material-analytics"
    ]
  },
  {
    "slug": [
      "dashboards",
      "operations",
      "delivery-analytics"
    ]
  },
  {
    "slug": [
      "dashboards",
      "operations",
      "manufacturing-analytics"
    ]
  }
] as { slug: string[] }[];
}

export const dynamicParams = false;
