import { BRAND_ACCENT, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '@/lib/site';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT };
export const OG_CONTENT_TYPE = 'image/png';

/**
 * Renders a branded Open Graph / Twitter card. Used by the route-level
 * `opengraph-image` handlers so every page gets a unique social preview built
 * from its title and breadcrumb. Relies on next/og's bundled default font, so
 * no network font fetch is needed at build time.
 */
export function renderOgImage({
    eyebrow,
    title,
    subtitle,
}: {
    eyebrow: string;
    title: string;
    subtitle?: string;
}) {
    // Keep the title readable: cap length so it never overflows the card.
    const safeTitle = title.length > 90 ? `${title.slice(0, 87)}…` : title;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#0b0b0f',
                    backgroundImage: `radial-gradient(circle at 100% 0%, rgba(14,185,129,0.18), transparent 55%)`,
                    padding: '80px',
                    color: '#ffffff',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            backgroundColor: BRAND_ACCENT,
                            marginRight: 16,
                        }}
                    />
                    <div
                        style={{
                            fontSize: 28,
                            letterSpacing: 4,
                            textTransform: 'uppercase',
                            color: '#a1a1aa',
                            fontWeight: 600,
                        }}
                    >
                        {eyebrow}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            fontSize: safeTitle.length > 48 ? 64 : 80,
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: -1.5,
                        }}
                    >
                        {safeTitle}
                    </div>
                    {subtitle ? (
                        <div
                            style={{
                                marginTop: 28,
                                fontSize: 32,
                                color: '#a1a1aa',
                                lineHeight: 1.3,
                            }}
                        >
                            {subtitle.length > 120 ? `${subtitle.slice(0, 117)}…` : subtitle}
                        </div>
                    ) : null}
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #27272a',
                        paddingTop: 28,
                        fontSize: 26,
                        color: '#71717a',
                    }}
                >
                    <div style={{ display: 'flex' }}>docs.openmrp.ai</div>
                    <div style={{ display: 'flex', color: BRAND_ACCENT, fontWeight: 600 }}>OpenMRP</div>
                </div>
            </div>
        ),
        { ...OG_SIZE },
    );
}
