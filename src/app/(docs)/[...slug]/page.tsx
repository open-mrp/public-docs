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

    return <MarkdownPage meta={meta} content={content} cleanMarkdown={cleanMarkdown} />;
}

export function generateStaticParams() {
  return [
  {
    "slug": [
      "api-reference"
    ]
  },
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
      "api",
      "overview"
    ]
  },
  {
    "slug": [
      "api-reference",
      "request-log-management"
    ]
  },
  {
    "slug": [
      "api-reference",
      "api-key-management"
    ]
  },
  {
    "slug": [
      "api-reference",
      "units-management"
    ]
  },
  {
    "slug": [
      "api-reference",
      "sandbox-management"
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
      "build-products",
      "overview"
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
      "dashboards",
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
      "get-started"
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
      "request-logs"
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
      "api",
      "errors"
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
      "collect-payments",
      "invoicing",
      "overview"
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
      "api-tour"
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
  }
];
}

export const dynamicParams = false;
