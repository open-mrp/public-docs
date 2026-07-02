import { ObjectPage } from '@/components/api-reference/ObjectPage';
import { getObjectForVersion, getObjectsForVersion } from '@/static/apiVersionData.generated';
import { LATEST_API_VERSION, apiReferenceBasePath } from '@/static/apiVersions.generated';

export function ApiObject({
    version = LATEST_API_VERSION,
    slug,
}: {
    version?: string;
    slug: string;
}) {
    const object = getObjectForVersion(version, slug);

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
            basePath={apiReferenceBasePath(version)}
            objectSlugs={(getObjectsForVersion(version) ?? []).map((o) => o.slug)}
        />
    );
}
