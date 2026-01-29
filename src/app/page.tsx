import { Metadata } from 'next';
import { HomePageContent } from './_components/HomePageContent';

export const metadata: Metadata = {
    title: 'Augno Documentation',
    description: 'Documentation for Augno',
};

export default async function DocumentationPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <HomePageContent />
        </main>
    );
}
