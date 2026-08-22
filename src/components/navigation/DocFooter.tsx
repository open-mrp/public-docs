import { paths } from '@/static/paths';
import { cn } from '@/utils/cn';
import { OpenMRPLogo, Footer, HelpIcon, QuestionMarkIcon, useDarkMode } from '@openmrp/ui';
import Link from 'next/link';
import AIIcon from '../icons/AIIcon';

interface DocFooterProps {
    className?: string;
}
export default function DocFooter({ className }: DocFooterProps) {
    const { isDark, hasMounted } = useDarkMode();

    const color = hasMounted && !isDark ? '#3a3a3a' : '#f4f4f4';

    return (
        <div className={cn('mt-auto w-full pt-16', className)}>
            <Footer
                home={{
                    icon: <OpenMRPLogo color={color} />,
                    href: paths.home,
                }}
                supportLinks={[
                    {
                        icon: <HelpIcon />,
                        text: 'Need help?',
                        link: {
                            text: 'Contact Support',
                            href: 'mailto:support@augno.com',
                        },
                    },
                    {
                        icon: <QuestionMarkIcon />,
                        text: 'Questions?',
                        link: {
                            text: 'Contact Sales',
                            href: 'mailto:sales@augno.com',
                        },
                    },
                    {
                        icon: <AIIcon className="mr-2" />,
                        text: 'LLM?',
                        link: {
                            text: 'Read llms.txt',
                            href: '/llms.txt',
                        },
                    },
                ]}
                renderLink={(props) =>
                    props.href === '/llms.txt' ? (
                        <a href={props.href}>{props.children}</a>
                    ) : (
                        <Link href={props.href}>{props.children}</Link>
                    )
                }
            />
        </div>
    );
}
