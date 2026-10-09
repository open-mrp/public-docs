import { ObjectPage } from '@/components/api-reference/ObjectPage';
import { findObject, getLatestApiVersionData, type ApiVersionData } from '@/lib/api-reference-data';
import { apiReferenceBasePath } from '@/static/apiVersions.generated';

export function ApiObject({
    data = getLatestApiVersionData(),
    slug,
}: {
    data?: ApiVersionData;
    slug: string;
}) {
    const object = findObject(data, slug);

    if (!object) {
        return (
            <div className="rounded-xl border border-[var(--border-color)] p-4">
                <p className="text-sm text-[var(--text-secondary)]">
                    Object not found: <code className="font-mono">{slug}</code>
                </p>
            </div>
        );
    }

    return (
        <ObjectPage
            object={object}
            basePath={apiReferenceBasePath(data.version)}
            objectSlugs={data.objects.map((o) => o.slug)}
        />
    );
}
