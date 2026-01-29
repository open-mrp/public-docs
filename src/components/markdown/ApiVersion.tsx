'use client';

import { API_VERSION } from '@/static/apiVersion.generated';
import { CopyableText } from './CopyableText';

interface ApiVersionProps {
    className?: string;
}

export function ApiVersion({ className }: ApiVersionProps) {
    return <CopyableText value={API_VERSION.current} className={className} />;
}
