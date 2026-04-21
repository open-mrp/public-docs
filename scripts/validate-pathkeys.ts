import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

// Import paths after docPaths is generated
import { paths } from '../src/static/paths';

const DOCS_DIR = path.join(process.cwd(), 'src/docs');

// Path lookup helper (mirrors the one in paths.ts)
type PathValue = string | { [key: string]: PathValue };

function getPath(pathKey: string): string | undefined {
    const keys = pathKey.split('.');
    let current: PathValue = paths as unknown as PathValue;

    for (const key of keys) {
        if (current === undefined || current === null || typeof current !== 'object') {
            return undefined;
        }
        current = (current as { [key: string]: PathValue })[key];
    }

    return typeof current === 'string' ? current : undefined;
}

interface InvalidPathKey {
    file: string;
    pathKey: string;
    line: number;
    context: string;
}

async function validatePathKeys(): Promise<InvalidPathKey[]> {
    const files = await glob('**/*.mdx', { cwd: DOCS_DIR });
    const invalidPathKeys: InvalidPathKey[] = [];

    // Patterns to match pathKey usage
    const patterns = [
        /pathKey:\s*['"]([^'"]+)['"]/g, // YAML frontmatter: pathKey: 'value'
        /pathKey=["']([^"']+)["']/g, // JSX: pathKey="value"
        /pathKey={["']([^"']+)["']}/g, // JSX: pathKey={'value'}
    ];

    for (const file of files) {
        const fullPath = path.join(DOCS_DIR, file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n');

        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];

            for (const pattern of patterns) {
                // Reset regex state
                pattern.lastIndex = 0;

                let match;
                while ((match = pattern.exec(line)) !== null) {
                    const pathKey = match[1];

                    // Skip special keys that aren't doc paths
                    if (pathKey === 'home' || pathKey === 'docs') {
                        continue;
                    }

                    const resolvedPath = getPath(pathKey);
                    if (resolvedPath === undefined) {
                        invalidPathKeys.push({
                            file,
                            pathKey,
                            line: lineNum + 1,
                            context: line.trim(),
                        });
                    }
                }
            }
        }
    }

    return invalidPathKeys;
}

async function main() {
    console.log('Validating pathKeys in MDX files...\n');

    const invalidPathKeys = await validatePathKeys();

    if (invalidPathKeys.length === 0) {
        console.log('All pathKeys are valid.\n');
        return;
    }

    console.error(`Found ${invalidPathKeys.length} invalid pathKey(s):\n`);

    for (const invalid of invalidPathKeys) {
        console.error(`  ${invalid.file}:${invalid.line}`);
        console.error(`    pathKey: "${invalid.pathKey}"`);
        console.error(`    context: ${invalid.context}`);
        console.error('');
    }

    console.error('Available top-level pathKeys:');
    const topLevelKeys = Object.keys(paths).filter((k) => k !== 'home');
    console.error(`  ${topLevelKeys.join(', ')}\n`);

    process.exit(1);
}

main().catch((err) => {
    console.error('Error validating pathKeys:', err);
    process.exit(1);
});
