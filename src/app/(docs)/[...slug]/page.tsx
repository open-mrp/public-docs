import { fetchPageBySlug } from '@/lib/mdx/fetchPageBySlug';
import { MarkdownPage } from '../../_components/MarkdownPage';

const getPageContent = async (slug: string[]) => {
    const { meta, content, cleanMarkdown } = await fetchPageBySlug(slug);
    return { meta, content, cleanMarkdown };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const { meta } = await getPageContent(slug);
    return { title: meta.title + ' | OpenMRP Documentation' };
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
      "api",
      "uris"
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
      "api",
      "request-ids"
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
      "mcp-server"
    ]
  },
  {
    "slug": [
      "api",
      "audit-events"
    ]
  },
  {
    "slug": [
      "api",
      "email-logs"
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
      "overview"
    ]
  },
  {
    "slug": [
      "api",
      "go-sdk"
    ]
  },
  {
    "slug": [
      "api",
      "typescript-sdk"
    ]
  },
  {
    "slug": [
      "development"
    ]
  },
  {
    "slug": [
      "api-tour"
    ]
  },
  {
    "slug": [
      "get-started"
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
      "go-live"
    ]
  },
  {
    "slug": [
      "release-phases"
    ]
  },
  {
    "slug": [
      "automate-with-agents",
      "agents-in-chat"
    ]
  },
  {
    "slug": [
      "automate-with-agents",
      "agents"
    ]
  },
  {
    "slug": [
      "automate-with-agents",
      "memories"
    ]
  },
  {
    "slug": [
      "automate-with-agents",
      "overview"
    ]
  },
  {
    "slug": [
      "automate-with-agents",
      "runs"
    ]
  },
  {
    "slug": [
      "automate-with-agents",
      "tools-and-approvals"
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
      "production-steps"
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
      "inventory",
      "storage-and-lots"
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
      "products"
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
      "build-products",
      "plant",
      "machine-status-and-downtime"
    ]
  },
  {
    "slug": [
      "build-products",
      "plant",
      "machines-and-departments"
    ]
  },
  {
    "slug": [
      "build-products",
      "production-planning",
      "demand-overrides"
    ]
  },
  {
    "slug": [
      "build-products",
      "production-planning",
      "production-schedules"
    ]
  },
  {
    "slug": [
      "build-products",
      "production-planning",
      "publishing-and-releasing"
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
      "production",
      "production-runs"
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
      "scanning",
      "labels"
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
      "collect-payments",
      "accounts-receivable",
      "overview"
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
      "collecting",
      "settlements"
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
      "overview"
    ]
  },
  {
    "slug": [
      "communicate",
      "email"
    ]
  },
  {
    "slug": [
      "communicate",
      "inbox"
    ]
  },
  {
    "slug": [
      "communicate",
      "messages"
    ]
  },
  {
    "slug": [
      "communicate",
      "notifications"
    ]
  },
  {
    "slug": [
      "communicate",
      "overview"
    ]
  },
  {
    "slug": [
      "communicate",
      "retention-and-compliance"
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
      "operations",
      "material-analytics"
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
      "dashboards",
      "sales",
      "order-analytics"
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
      "products-on-order"
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
      "weeks-of-sales"
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
      "customer-pricing",
      "customer-prices"
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
      "volume-discounts"
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
      "customer-groups"
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
      "default-sales-reps"
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
      "payment-terms"
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
      "shipping-terms"
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
      "customer",
      "overview"
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
      "generate-sales",
      "sales-order",
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
      "issue"
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
      "sales-team",
      "sales-targets"
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
      "workflows"
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
      "manage-account",
      "api-keys"
    ]
  },
  {
    "slug": [
      "manage-account",
      "customer-portal-settings"
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
      "sandboxes"
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
      "support-routing"
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
  }
] as { slug: string[] }[];
}

export const dynamicParams = false;
