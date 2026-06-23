'use client';

import LinkButton from '@/components/buttons/LinkButton';
import { FrostedSurface } from '@/components/FrostedSurface';
import DocFooter from '@/components/navigation/DocFooter';
import HomeNavBar from '@/components/navigation/HomeNavBar';
import { useIsAuthenticated } from '@/lib/auth-store';
import { BlendText, ChevronRightIcon, RGBColor, useDarkMode, WaveShader } from '@augno/ui';
import { useEffect, useState } from 'react';
import { ApiKeysCard } from './ApiKeysCard';
import { RecentlyVisitedCard } from './RecentlyVisitedCard';

const LIGHT_BACKGROUND_COLOR: RGBColor = [255, 255, 255];
const BLACK_BACKGROUND_COLOR: RGBColor = [15, 14, 24];
/** Max CSS height for the WebGL canvas (4096 internal px at 2x DPR). */
const MAX_WAVE_SHADER_HEIGHT = 2048;

export function HomePageContent() {
    const { isDark, hasMounted } = useDarkMode();
    const isAuthenticated = useIsAuthenticated();

    const [isDesktop, setIsDesktop] = useState(false);
    const [shaderHeight, setShaderHeight] = useState(1000);

    useEffect(() => {
        const updateHeight = () => {
            setIsDesktop(window.innerWidth > 800);
            setShaderHeight(Math.max(window.innerHeight, document.documentElement.scrollHeight));
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        const ro = new ResizeObserver(updateHeight);
        ro.observe(document.body);
        return () => {
            window.removeEventListener('resize', updateHeight);
            ro.disconnect();
        };
    }, []);

    const waveShaderHeight = Math.min(shaderHeight, MAX_WAVE_SHADER_HEIGHT);
    const waveShaderScaleY = shaderHeight / waveShaderHeight;

    // Before mount, always default to dark so SSR and the first client render
    // produce identical markup (avoids hydration mismatch). Once mounted, trust
    // the hook state which reflects the real theme.
    const effectiveIsDark = hasMounted ? isDark : true;

    const backgroundColor = !effectiveIsDark ? LIGHT_BACKGROUND_COLOR : BLACK_BACKGROUND_COLOR;
    const revertColor = 'var(--home-title)';
    const color = 'var(--home-title)';
    const blendMode = 'color-burn';
    const revertOpacity = !effectiveIsDark ? 0.3 : 0.7;

    return (
        <>
            <HomeNavBar />

            {/* Background wave shader - full page height so it covers footer when scrolling */}
            <div
                className={`absolute inset-x-0 top-0 pointer-events-none z-1 ${isDesktop ? '' : 'overflow-hidden'}`}
                style={{ height: shaderHeight }}
            >
                {hasMounted && (
                    <div
                        style={{
                            height: waveShaderHeight,
                            transform: waveShaderScaleY > 1 ? `scaleY(${waveShaderScaleY})` : undefined,
                            transformOrigin: 'top left',
                        }}
                    >
                        <WaveShader
                            height={waveShaderHeight}
                            seed={16192}
                            numWaves={8}
                            backgroundColor={backgroundColor}
                            fallbackImage={{
                                dark: '/wave-shader-still-dark.webp',
                                light: '/wave-shader-still-light.webp',
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Main content */}
            <div className="relative max-w-4xl mx-auto px-4 py-6 flex-1 flex flex-col">
                <section className="mt-12 flex flex-col gap-2">
                    <BlendText
                        revertColor={revertColor}
                        color={color}
                        blendMode={blendMode}
                        revertOpacity={revertOpacity}
                        style={{
                            fontWeight: 600,
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em',
                            margin: '0px',
                        }}
                        className="text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] 2xl:text-[6rem]"
                    >
                        Augno Documentation
                    </BlendText>
                    <BlendText
                        revertColor={revertColor}
                        color={color}
                        blendMode={blendMode}
                        revertOpacity={revertOpacity}
                        style={{ fontWeight: 500, lineHeight: 1.6, padding: '0px', margin: '0px' }}
                        className="text-[1.0rem] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[1.8rem]"
                    >
                        Explore our guides and examples to integrate Augno into your business.
                    </BlendText>
                    <LinkButton
                        className="mt-8 relative z-10"
                        href="/get-started"
                        variant="text"
                        blur
                        size="lg"
                        color={color}
                    >
                        <span className="mr-2">Get started</span>
                        <ChevronRightIcon />
                    </LinkButton>
                </section>
                {/* Cards + footer in one grid for aligned width; stack on small, two columns on lg */}
                <div className="relative z-10 flex-1 flex flex-col mt-[88px] w-full max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                        {isAuthenticated && (
                            <div className="min-w-0">
                                <ApiKeysCard />
                            </div>
                        )}
                        <div className={`min-w-0 ${!isAuthenticated ? 'lg:col-span-2' : ''}`}>
                            <RecentlyVisitedCard />
                        </div>
                    </div>
                    <div className="mt-auto pt-16 w-full">
                        <FrostedSurface className="rounded-2xl px-4 [&_footer]:border-t-0 [&_footer]:mt-0">
                            <DocFooter className="mt-0 pt-0" />
                        </FrostedSurface>
                    </div>
                </div>
            </div>
        </>
    );
}
