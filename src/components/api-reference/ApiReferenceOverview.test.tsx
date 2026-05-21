import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ApiReferenceOverviewContent } from './ApiReferenceOverview';

describe('ApiReferenceOverviewContent', () => {
    test('renders endpoint summaries and paths in overview rows', () => {
        const html = renderToStaticMarkup(
            <ApiReferenceOverviewContent
                domains={[
                    {
                        name: 'Core',
                        slug: 'core',
                        resources: [
                            {
                                name: 'Customers',
                                slug: 'customers',
                                endpoints: [
                                    {
                                        summary: 'Create Customer',
                                        method: 'POST',
                                        path: '/v1/core/customers',
                                        actionType: 'create',
                                        href: '/api-reference/customers/create-customer',
                                    },
                                ],
                            },
                        ],
                    },
                ]}
            />,
        );

        expect(html).toContain('Create Customer');
        expect(html).toContain('/v1/core/customers');
        expect(html).toContain('/api-reference/customers/create-customer');
        expect(html).not.toContain('>Create</p>');
    });
});
