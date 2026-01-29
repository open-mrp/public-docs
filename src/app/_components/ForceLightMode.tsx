'use client';

import { useEffect } from 'react';

export function ForceLightMode() {
    useEffect(() => {
        // Force light mode by removing dark class and preventing theme changes
        const html = document.documentElement;
        html.classList.remove('dark');

        // Prevent theme toggling on this page
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (html.classList.contains('dark')) {
                        html.classList.remove('dark');
                    }
                }
            });
        });

        observer.observe(html, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return null;
}
