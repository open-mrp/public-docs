import { describe, expect, test } from 'bun:test';
import { cleanMdx } from './cleanMdx';

describe('cleanMdx', () => {
    describe('frontmatter removal', () => {
        test('removes YAML frontmatter block', () => {
            const input = `---
title: 'Test Page'
description: 'A test page'
---

# Hello World`;
            const result = cleanMdx(input);
            expect(result).not.toContain('---');
            expect(result).not.toContain('title:');
            expect(result).toContain('# Hello World');
        });

        test('handles content with no frontmatter', () => {
            const input = '# Hello World\n\nSome content';
            const result = cleanMdx(input);
            expect(result).toBe('# Hello World\n\nSome content');
        });
    });

    describe('JSX whitespace expressions', () => {
        test('converts {" "} to space', () => {
            const input = 'before{" "}after';
            const result = cleanMdx(input);
            expect(result).toBe('before after');
        });

        test("converts {' '} to space", () => {
            const input = "before{' '}after";
            const result = cleanMdx(input);
            expect(result).toBe('before after');
        });

        test('handles multiple whitespace expressions', () => {
            const input = "word1{' '}word2{' '}word3";
            const result = cleanMdx(input);
            expect(result).toBe('word1 word2 word3');
        });

        test('handles real-world checklist example', () => {
            const input = `find 2FA settings in your account security section of the{' '}
    <InternalLink pathKey="frontend.dashboard" text="OpenMRP Dashboard" />.`;
            const result = cleanMdx(input);
            expect(result).toContain('section of the');
            expect(result).toContain('OpenMRP Dashboard');
            expect(result).not.toContain("{' '}");
        });
    });

    describe('InternalLink extraction', () => {
        test('extracts text attribute from single-line InternalLink', () => {
            const input = '<InternalLink pathKey="test" text="Click here" />';
            const result = cleanMdx(input);
            expect(result).toBe('Click here');
        });

        test('extracts text attribute from multi-line InternalLink', () => {
            const input = `<InternalLink
      pathKey="account.multipleAccounts"
      text="Managing Multiple OpenMRP Accounts"
  />`;
            const result = cleanMdx(input);
            expect(result).toBe('Managing Multiple OpenMRP Accounts');
        });

        test('handles InternalLink with additional attributes', () => {
            const input = '<InternalLink pathKey="test" text="Create account" includeArrow />';
            const result = cleanMdx(input);
            expect(result).toBe('Create account');
        });

        test('handles inline InternalLink in paragraph', () => {
            const input =
                'Before diving into production, ensure your account is <InternalLink pathKey="account.activate" text="activated" />.';
            const result = cleanMdx(input);
            expect(result).toBe('Before diving into production, ensure your account is activated.');
        });
    });

    describe('DocNumberedSection extraction', () => {
        test('extracts title and converts to heading', () => {
            const input =
                '<DocNumberedSection number={1} title="Collect requirements" className="mt-6">';
            const result = cleanMdx(input);
            expect(result).toBe('### Collect requirements');
        });

        test('handles section with content', () => {
            const input = `<DocNumberedSection number={1} title="Setup">

This is the setup guide.

</DocNumberedSection>`;
            const result = cleanMdx(input);
            expect(result).toContain('### Setup');
            expect(result).toContain('This is the setup guide.');
        });
    });

    describe('LinkCard extraction', () => {
        test('extracts title and description', () => {
            const input = `<LinkCard
        pathKey="account.activate"
        title="Activate your account"
        description="Activate your OpenMRP account and unlock all features."
    />`;
            const result = cleanMdx(input);
            expect(result).toContain('### Activate your account');
            expect(result).toContain('Activate your OpenMRP account and unlock all features.');
        });

        test('handles LinkCard with different attribute order', () => {
            const input =
                '<LinkCard title="Test Title" description="Test description" pathKey="test" />';
            const result = cleanMdx(input);
            expect(result).toContain('### Test Title');
            expect(result).toContain('Test description');
        });
    });

    describe('dynamic component placeholders', () => {
        test('replaces AccountName with placeholder', () => {
            const input = "Here's your test API key for <AccountName />:";
            const result = cleanMdx(input);
            expect(result).toBe("Here's your test API key for [Account Name]:");
        });

        test('replaces ApiKeySnippet with placeholder', () => {
            const input = '| Secret | <ApiKeySnippet /> | Sandbox |';
            const result = cleanMdx(input);
            expect(result).toBe('| Secret | [API Key] | Sandbox |');
        });
    });

    describe('component tag removal', () => {
        test('removes self-closing tags', () => {
            const input = '<CustomerCRMIntegration />';
            const result = cleanMdx(input);
            expect(result).toBe('');
        });

        test('preserves content inside paired tags', () => {
            const input = `<DocHeroSection>
## Use OpenMRP without writing code

The easiest way to get started.
</DocHeroSection>`;
            const result = cleanMdx(input);
            expect(result).toContain('## Use OpenMRP without writing code');
            expect(result).toContain('The easiest way to get started.');
            expect(result).not.toContain('DocHeroSection');
        });

        test('handles nested components', () => {
            const input = `<DocHeroSection>
<DocHeroSection>
## Nested content
</DocHeroSection>
</DocHeroSection>`;
            const result = cleanMdx(input);
            expect(result).toContain('## Nested content');
            expect(result).not.toContain('DocHeroSection');
        });

        test('preserves DocLink children content', () => {
            const input =
                'Use the <DocLink pathKey="frontend.dashboard">OpenMRP Dashboard</DocLink> to manage settings.';
            const result = cleanMdx(input);
            expect(result).toBe('Use the OpenMRP Dashboard to manage settings.');
        });

        test('handles IfAuthenticated/IfUnauthenticated with children', () => {
            const input = `<IfAuthenticated>
    Here's your test API key for [Account Name]:
</IfAuthenticated>
<IfUnauthenticated>The following uses placeholder API keys.</IfUnauthenticated>`;
            const result = cleanMdx(input);
            expect(result).toContain("Here's your test API key");
            expect(result).toContain('placeholder API keys');
            expect(result).not.toContain('IfAuthenticated');
            expect(result).not.toContain('IfUnauthenticated');
        });
    });

    describe('JSX expression removal', () => {
        test('removes JSX expressions like {variableName}', () => {
            const input = 'Hello {name}, welcome!';
            const result = cleanMdx(input);
            expect(result).toBe('Hello , welcome!');
        });

        test('removes complex JSX expressions', () => {
            const input = '<DocNumberedSection number={1} title="Test">';
            const result = cleanMdx(input);
            expect(result).toBe('### Test');
        });

        test('preserves curly braces inside code blocks', () => {
            const input = `Some text

\`\`\`js
const obj = { name: "John", age: 30 };
\`\`\`

More text`;
            const result = cleanMdx(input);
            expect(result).toContain('{ name: "John", age: 30 }');
        });

        test('preserves JSON in code blocks', () => {
            const input = `\`\`\`json
{
    "id": "123",
    "data": { "nested": true }
}
\`\`\``;
            const result = cleanMdx(input);
            expect(result).toContain('"id": "123"');
            expect(result).toContain('"nested": true');
        });

        test('preserves template literals in code blocks', () => {
            const input = `\`\`\`js
const greeting = \`Hello \${name}\`;
\`\`\``;
            const result = cleanMdx(input);
            expect(result).toContain('${name}');
        });
    });

    describe('whitespace cleanup', () => {
        test('collapses multiple blank lines', () => {
            const input = 'Line 1\n\n\n\n\nLine 2';
            const result = cleanMdx(input);
            expect(result).toBe('Line 1\n\nLine 2');
        });

        test('trims trailing whitespace from lines', () => {
            const input = 'Line with spaces   \nAnother line  ';
            const result = cleanMdx(input);
            expect(result).toBe('Line with spaces\nAnother line');
        });

        test('trims final result', () => {
            const input = '  \n\nContent\n\n  ';
            const result = cleanMdx(input);
            expect(result).toBe('Content');
        });
    });

    describe('real-world MDX samples', () => {
        test('processes get-started.mdx content correctly', () => {
            const input = `---
title: 'Get started'
description: 'Get started with OpenMRP'
breadcrumbs:
    - label: 'Home'
      pathKey: 'home'
    - label: 'Get started'
header:
    title: 'Get started'
    subtitle: 'Create an account and learn how to build on OpenMRP.'
---

<DocHeroSection>
<DocHeroSection>
## Use OpenMRP without writing code

The easiest way to get started with OpenMRP is to use the <DocLink pathKey="frontend.dashboard">OpenMRP Dashboard</DocLink>. This application is a complete solution for
most business needs and is the fastest way to get started.

</DocHeroSection>
<InternalLink pathKey="account.activate" text="Create account" includeArrow />
</DocHeroSection>`;

            const result = cleanMdx(input);

            // Should not contain frontmatter
            expect(result).not.toContain('title:');
            expect(result).not.toContain('---');

            // Should preserve markdown headings and content
            expect(result).toContain('## Use OpenMRP without writing code');
            expect(result).toContain('OpenMRP Dashboard');
            expect(result).toContain('Create account');

            // Should not contain JSX components
            expect(result).not.toContain('DocHeroSection');
            expect(result).not.toContain('DocLink');
            expect(result).not.toContain('InternalLink');
        });

        test('processes checklist.mdx content with {" "} expressions', () => {
            const input = `<DocChecklistItem id="enable-2fa">
    **Enable Two-Factor Authentication (2FA)**: For security purposes, enable 2FA on your OpenMRP
    account. You can usually find 2FA settings in your account security section of the{' '}
    <InternalLink pathKey="frontend.dashboard" text="OpenMRP Dashboard" />.
</DocChecklistItem>`;

            const result = cleanMdx(input);

            // Should extract the text content
            expect(result).toContain('Enable Two-Factor Authentication');
            expect(result).toContain('OpenMRP Dashboard');

            // Should convert {' '} to space
            expect(result).not.toContain("{' '}");

            // Should not contain JSX
            expect(result).not.toContain('DocChecklistItem');
            expect(result).not.toContain('InternalLink');
        });

        test('processes api-request.mdx with tabs and code blocks', () => {
            const input = `<DocTabs className="my-4">
<DocTab label="Curl">

\`\`\`bash
curl -X POST API_HOST/v2/customers \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

</DocTab>
<DocTab label="JavaScript">

\`\`\`js
const response = await fetch('API_HOST/v2/customers');
\`\`\`

</DocTab>
</DocTabs>`;

            const result = cleanMdx(input);

            // Should preserve code blocks
            expect(result).toContain('```bash');
            expect(result).toContain('curl -X POST');
            expect(result).toContain('```js');

            // Should not contain JSX components
            expect(result).not.toContain('DocTabs');
            expect(result).not.toContain('DocTab');
        });
    });
});
