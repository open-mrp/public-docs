'use client';

import LinkButton from '@/components/buttons/LinkButton';
import DocFooter from '@/components/navigation/DocFooter';
import HomeNavBar from '@/components/navigation/HomeNavBar';
import { useIsAuthenticated } from '@/lib/auth-store';
import { paths } from '@/static/paths';
import { BlendText, ChevronRightIcon, RGBColor, useDarkMode, WaveShader } from '@augno/ui';
import { ApiKeysCard } from './ApiKeysCard';
import { RecentlyVisitedCard } from './RecentlyVisitedCard';

const LIGHT_BACKGROUND_COLOR: RGBColor = [255, 255, 255];
const BLACK_BACKGROUND_COLOR: RGBColor = [15, 14, 24];

export function HomePageContent() {
    const { isDark, hasMounted } = useDarkMode();
    const isAuthenticated = useIsAuthenticated();

    const backgroundColor = hasMounted && !isDark ? LIGHT_BACKGROUND_COLOR : BLACK_BACKGROUND_COLOR;
    const revertColor = 'var(--home-title)';
    const color = 'var(--home-title)';
    const blendMode = 'color-burn';
    const revertOpacity = hasMounted && !isDark ? 0.3 : 0.7;

    return (
        <>
            <HomeNavBar />

            {/* Background wave shader */}
            <div className="absolute inset-0 pointer-events-none z-1">
                <WaveShader
                    skew="bottom"
                    height={1000}
                    maintainHeight={0.3}
                    seed={16192}
                    numWaves={8}
                    backgroundColor={backgroundColor}
                />
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
                <section className="hidden lg:flex mt-[88px] relative z-10 flex-row gap-6 max-w-3xl">
                    {isAuthenticated && (
                        <div className="flex-1 max-w-md">
                            <ApiKeysCard />
                        </div>
                    )}
                    <div className="flex-1 max-w-sm">
                        <RecentlyVisitedCard />
                    </div>
                </section>

                <DocFooter className="mt-auto relative z-10" />
            </div>
        </>
    );
}
