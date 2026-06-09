import { JsonLd } from '@/components/seo/JsonLd';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/jsonLd';
import { socialMeta } from '@/lib/metadata';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site';
import { Metadata } from 'next';
import { HomePageContent } from './_components/HomePageContent';

export const metadata: Metadata = {
    // Use the full title verbatim on the home page (no template suffix).
    title: { absolute: SITE_TITLE },
    description: SITE_DESCRIPTION,
    alternates: { canonical: '/' },
    // No `card` → falls back to the file-convention /opengraph-image.
    ...socialMeta({ title: SITE_TITLE, description: SITE_DESCRIPTION, url: '/', type: 'website' }),
};

export default async function DocumentationPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
            <HomePageContent />
        </main>
    );
}
