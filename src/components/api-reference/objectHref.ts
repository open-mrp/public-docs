import type { ObjectHrefResolver } from './ParameterTable';

/**
 * Builds a resolver that maps an object discriminator (e.g. `sales_order`) to its
 * object-page href, but only for objects that actually have a page in this version.
 * Returns undefined when there are no object pages, so callers can skip linking.
 */
export function makeObjectHref(
    basePath: string,
    objectSlugs?: string[],
): ObjectHrefResolver | undefined {
    if (!objectSlugs || objectSlugs.length === 0) return undefined;
    const slugs = new Set(objectSlugs);
    return (objectType: string) => {
        const slug = objectType.replace(/_/g, '-');
        return slugs.has(slug) ? `${basePath}/objects/${slug}` : undefined;
    };
}
