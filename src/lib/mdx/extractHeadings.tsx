import { TocItem } from '@/types/toc';

function normalizeHeadingText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
}

export function extractHeadingsFromDom(root: ParentNode): TocItem[] {
    const headings: TocItem[] = [];
    const nodes = root.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]');

    nodes.forEach((el) => {
        // Skip headings inside blockquotes
        if (el.closest('blockquote')) return;

        const tag = el.tagName.toLowerCase();
        const level = tag.startsWith('h') ? parseInt(tag.slice(1), 10) : NaN;
        const id = (el as HTMLElement).id;

        // Try to find if there's a number span (from DocHeading)
        const numberEl = el.querySelector('.text-gray-500');
        const number = numberEl ? normalizeHeadingText(numberEl.textContent ?? '') : undefined;

        // Try to find the main text span
        const textEl = el.querySelector('span:not(.text-gray-500)');
        const text = normalizeHeadingText((textEl ? textEl.textContent : el.textContent) ?? '');

        if (!id || !text || !Number.isFinite(level)) return;
        if (level < 1 || level > 6) return;

        headings.push({ id, text, level, number });
    });

    return headings;
}
