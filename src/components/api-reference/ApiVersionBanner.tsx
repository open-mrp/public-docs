import Link from 'next/link';

/**
 * Shown at the top of API reference pages pinned to an archived version,
 * pointing back to the same page (or the overview) on the latest version.
 */
export function ApiVersionBanner({
    version,
    latestVersion,
    latestHref,
}: {
    version: string;
    latestVersion: string;
    latestHref: string;
}) {
    return (
        <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-[var(--foreground)]">
            <span>
                You are viewing the API reference for version{' '}
                <code className="font-mono font-semibold">{version}</code>, which is not the latest
                version.
            </span>
            <Link href={latestHref} className="font-medium text-[var(--primary)] hover:underline">
                Switch to {latestVersion} (latest) →
            </Link>
        </div>
    );
}
