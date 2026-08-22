import { Metadata } from 'next';
import { NotFoundContent } from './_components/NotFoundContent';

export const metadata: Metadata = {
    title: 'Page not found | OpenMRP Documentation',
    description: 'The page you requested could not be found.',
};

export default function NotFound() {
    return <NotFoundContent />;
}
