import { sanitizeRequestExample } from '@/components/api-reference/sanitizeRequestExample';
import { sanitizeResponseExampleForEndpoint } from '@/components/api-reference/sanitizeResponseExample';
import { buildOverviewDomains } from '@/lib/api-reference-overview';
import { buildOverviewObjectDomains } from '@/lib/api-reference-objects-overview';
import { absoluteUrl } from '@/lib/site';
import type {
    EndpointData,
    ObjectData,
    Parameter,
    SchemaField,
} from '@/static/apiEndpoints.generated';

/**
 * Markdown renderings of API reference pages, shared by the "Copy page" buttons and
 * the `.md` URLs that llms.txt links to. Kept free of server-only imports so client
 * components can use it.
 */

function stringifyJson(value: unknown) {
    return JSON.stringify(value ?? {}, null, 2);
}

function fieldTypeName(f: SchemaField): string {
    if (f.objectType) return f.type === 'array' ? `array of ${f.objectType}` : f.objectType;
    if (f.type === 'array' && f.itemType) return `array of ${f.itemType}`;
    return f.type;
}

function fieldsToMarkdown(fields: SchemaField[], indent = 0): string {
    const prefix = '  '.repeat(indent);
    return fields
        .map((f) => {
            const typeName = fieldTypeName(f);
            const typeParts = [f.required ? typeName : `optional ${typeName}`];
            if (f.nullable) typeParts.push('nullable');
            if (f.enum) typeParts.push(`enum: ${f.enum.join(', ')}`);
            const desc = f.description ? ` — ${f.description}` : '';
            let line = `${prefix}- \`${f.name}\` (${typeParts.join(', ')})${desc}`;
            if (f.properties && f.properties.length > 0) {
                line += '\n' + fieldsToMarkdown(f.properties, indent + 1);
            }
            return line;
        })
        .join('\n');
}

function paramsToMarkdown(params: Parameter[]): string {
    return params
        .map((p) => {
            const typeParts = [p.required ? p.type : `optional ${p.type}`];
            if (p.enum) typeParts.push(`enum: ${p.enum.join(', ')}`);
            const desc = p.description ? ` — ${p.description}` : '';
            return `- \`${p.name}\` (${typeParts.join(', ')})${desc}`;
        })
        .join('\n');
}

export function endpointToMarkdown(ep: EndpointData): string {
    const lines: string[] = [];
    lines.push(`# ${ep.summary}`);
    lines.push(`\`${ep.method.toUpperCase()} ${ep.path}\``);
    if (ep.description) lines.push('', ep.description);

    const pathParams = ep.parameters.filter((p) => p.in === 'path');
    const queryParams = ep.parameters.filter((p) => p.in === 'query');
    const headerParams = ep.parameters.filter((p) => p.in === 'header');

    if (pathParams.length > 0) {
        lines.push('', '## Path Parameters', paramsToMarkdown(pathParams));
    }
    if (queryParams.length > 0) {
        lines.push('', '## Query Parameters', paramsToMarkdown(queryParams));
    }
    if (headerParams.length > 0) {
        lines.push('', '## Header Parameters', paramsToMarkdown(headerParams));
    }

    if (ep.requestBody && ep.requestBody.fields.length > 0) {
        lines.push('', '## Request Body', fieldsToMarkdown(ep.requestBody.fields));
        if (ep.requestBody.example != null) {
            const requestExample = sanitizeRequestExample(
                ep.requestBody.example,
                ep.requestBody.fields,
            );
            lines.push('', '### Example', '```json', stringifyJson(requestExample), '```');
        }
    }

    const responseFields = ep.responses.find((r) => r.fields && r.fields.length > 0)?.fields;
    if (responseFields && responseFields.length > 0) {
        lines.push('', '## Response Fields', fieldsToMarkdown(responseFields));
    }

    const responseWithExample = ep.responses.find((r) => r.example != null);
    if (responseWithExample) {
        const exampleForDisplay = sanitizeResponseExampleForEndpoint(
            responseWithExample.example,
            ep,
            responseFields,
        );
        lines.push(
            '',
            `### ${responseWithExample.statusCode} Example`,
            '```json',
            stringifyJson(exampleForDisplay),
            '```',
        );
    }

    return lines.join('\n');
}

export function objectToMarkdown(obj: ObjectData): string {
    const lines: string[] = [];
    lines.push(`# ${obj.name} object`);
    lines.push(`\`${obj.object}\``);
    if (obj.description) lines.push('', obj.description);
    if (obj.fields.length > 0) {
        lines.push('', '## Attributes', fieldsToMarkdown(obj.fields));
    }
    if (obj.example != null) {
        lines.push('', '### Example', '```json', stringifyJson(obj.example), '```');
    }
    if (obj.usedBy.length > 0) {
        lines.push('', '## Used by');
        for (const u of obj.usedBy) {
            lines.push(`- ${u.method.toUpperCase()} ${u.summary} (${u.tag})`);
        }
    }
    return lines.join('\n');
}

/** Index of every endpoint and object in a version, linking to their `.md` pages. */
export function overviewToMarkdown(data: {
    version: string;
    tags: Parameters<typeof buildOverviewDomains>[0];
    objects: ObjectData[];
    basePath: string;
}): string {
    const lines: string[] = [`# OpenMRP API Reference (${data.version})`];

    for (const domain of buildOverviewDomains(data.tags, data.basePath)) {
        lines.push('', `## ${domain.name}`);
        for (const resource of domain.resources) {
            lines.push('', `### ${resource.name}`);
            for (const ep of resource.endpoints) {
                lines.push(
                    `- [${ep.summary}](${absoluteUrl(`${ep.href}.md`)}): \`${ep.method.toUpperCase()} ${ep.path}\``,
                );
            }
        }
    }

    const objectDomains = buildOverviewObjectDomains(data.objects, data.basePath);
    if (objectDomains.length > 0) {
        lines.push('', '## Objects');
        for (const domain of objectDomains) {
            lines.push('', `### ${domain.name}`);
            for (const obj of domain.objects) {
                lines.push(
                    `- [${obj.name} object](${absoluteUrl(`${obj.href}.md`)}): \`${obj.object}\``,
                );
            }
        }
    }

    return lines.join('\n') + '\n';
}
