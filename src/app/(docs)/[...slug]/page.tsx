import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, techArticleJsonLd } from '@/lib/jsonLd';
import { socialMeta } from '@/lib/metadata';
import { fetchPageBySlug } from '@/lib/mdx/fetchPageBySlug';
import { ogImage } from '@/lib/site';
import { buildBreadcrumbsFromRoute } from '@/static/breadcrumbConfig';
import type { Metadata } from 'next';
import { MarkdownPage } from '../../_components/MarkdownPage';

const getPageContent = async (slug: string[]) => {
    const { meta, content, cleanMarkdown } = await fetchPageBySlug(slug);
    return { meta, content, cleanMarkdown };
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { meta } = await getPageContent(slug);
    const route = '/' + slug.join('/');

    const trail = buildBreadcrumbsFromRoute(route, meta.title)
        .map((c) => c.label)
        .filter((label) => label && label !== 'Home' && label !== meta.title);
    const card = ogImage({
        title: meta.title,
        eyebrow: 'Augno Docs',
        subtitle: trail.length > 0 ? trail.join(' › ') : meta.subtitle,
    });

    return {
        title: meta.title,
        description: meta.subtitle,
        alternates: { canonical: route },
        ...socialMeta({ title: meta.title, description: meta.subtitle, url: route, card }),
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const { content, meta, cleanMarkdown } = await getPageContent(slug);
    const route = '/' + slug.join('/');

    return (
        <>
            <JsonLd
                data={[
                    techArticleJsonLd({ title: meta.title, description: meta.subtitle, route }),
                    breadcrumbJsonLd(route, meta.title),
                ]}
            />
            <MarkdownPage meta={meta} content={content} cleanMarkdown={cleanMarkdown} />
        </>
    );
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
