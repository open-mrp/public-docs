'use client';

import { useCallback, useEffect, useState } from 'react';

export interface RecentlyVisitedPage {
    path: string;
    title: string;
    visitedAt: number;
}

const STORAGE_KEY = 'augno-recently-visited-pages';
const MAX_PAGES = 3;

/**
 * Retrieves the recently visited pages from localStorage.
 */
function getStoredPages(): RecentlyVisitedPage[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

/**
 * Saves the recently visited pages to localStorage.
 */
function saveStoredPages(pages: RecentlyVisitedPage[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch {
        // Ignore storage errors
    }
}

/**
 * Builds an updated recently-visited list: most recent path first,
 * duplicates removed (revisit bumps to top), capped at MAX_PAGES.
 * Reads the current persisted list so merged history survives fresh component mounts
 * (e.g. first paint on a route, switching between Markdown and API-reference trees).
 */
function mergeVisitIntoHistory(path: string, title: string): RecentlyVisitedPage[] {
    const stored = getStoredPages();
    const filtered = stored.filter((p) => p.path !== path);

    const newPages: RecentlyVisitedPage[] = [
        { path, title, visitedAt: Date.now() },
        ...filtered,
    ].slice(0, MAX_PAGES);

    saveStoredPages(newPages);
    return newPages;
}

/**
 * Hook to track and retrieve the last few visited doc pages.
 * Does not track the home page.
 */
export function useRecentlyVisitedPages() {
    const [pages, setPages] = useState<RecentlyVisitedPage[]>([]);
    const [hasMounted, setHasMounted] = useState(false);

    // Load pages from localStorage on mount
    useEffect(() => {
        queueMicrotask(() => {
            setPages(getStoredPages());
            setHasMounted(true);
        });
    }, []);

    const addPage = useCallback((path: string, title: string) => {
        // Don't track home page
        if (path === '/' || path === '') return;

        setPages(() => mergeVisitIntoHistory(path, title));
    }, []);

    const clearPages = useCallback(() => {
        setPages([]);
        saveStoredPages([]);
    }, []);

    return {
        pages,
        addPage,
        clearPages,
        hasMounted,
    };
}
