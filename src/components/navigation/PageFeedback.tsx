import { editUrl, reportUrl } from '@/static/repo';
import { cn } from '@/utils/cn';
import { GithubIcon } from '@openmrp/ui';
import PencilIcon from '../icons/PencilIcon';

interface PageFeedbackProps {
    title: string;
    slug: string;
    /**
     * Path of the page's MDX source, relative to src/docs. Omitted for the API
     * reference, which is generated from the OpenAPI spec and has no MDX to edit.
     */
    filePath?: string;
    className?: string;
}

export default function PageFeedback({ title, slug, filePath, className }: PageFeedbackProps) {
    return (
        <aside
            className={cn(
                'mt-12 flex flex-col gap-3 border-t border-[var(--border-color)] pt-6',
                'sm:flex-row sm:items-center sm:justify-between',
                className,
            )}
        >
            <p className="text-sm text-[var(--text-secondary)]">
                Found an error on this page, or something we left out?
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {filePath && (
                    <a
                        href={editUrl(filePath)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary-500 hover:text-secondary-700"
                    >
                        <PencilIcon className="shrink-0" />
                        Edit this page
                    </a>
                )}
                <a
                    href={reportUrl({ title, slug })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary-500 hover:text-secondary-700"
                >
                    <GithubIcon className="h-4 w-4 shrink-0" />
                    Report an issue
                </a>
            </div>
        </aside>
    );
}
