'use client';

import { useState } from 'react';
import { Chip } from './Chip';
import { ToggleLink } from './ToggleLink';

export function EnumChips({ values }: { values: string[] }) {
    const [expanded, setExpanded] = useState(false);
    const maxShown = 3;
    const baseValues = values.slice(0, maxShown);
    const extraValues = values.slice(maxShown);
    const extraCount = extraValues.length;

    return (
        <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-[var(--text-secondary)]">
            <span className="shrink-0">Values:</span>
            {baseValues.map((v, i) => (
                <Chip key={`${v}-${i}`} mono>
                    {v}
                </Chip>
            ))}
            {!expanded && extraCount > 0 && (
                <ToggleLink onClick={() => setExpanded(true)}>and {extraCount} more</ToggleLink>
            )}
            {expanded && extraCount > 0 && (
                <>
                    {extraValues.map((v, i) => (
                        <Chip key={`${v}-${i}`} mono>
                            {v}
                        </Chip>
                    ))}
                    <ToggleLink onClick={() => setExpanded(false)}>Show less</ToggleLink>
                </>
            )}
        </span>
    );
}
