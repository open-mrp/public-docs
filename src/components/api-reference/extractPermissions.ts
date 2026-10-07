/**
 * How an endpoint's permission list is read:
 *   - `one`: a single permission.
 *   - `any`: a comma-separated list; holding any one of them is enough.
 *   - `all`: a list joined with "and"; every one is required.
 */
export type PermissionMode = 'one' | 'any' | 'all';

/** Permissions required instead of the endpoint's own when acting in a customer's or supplier's account. */
export interface CounterpartyPermissions {
    customer: string | null;
    supplier: string | null;
}

export interface EndpointAuthorization {
    /** Permission slugs the endpoint requires, e.g. `customers:read`. */
    permissions: string[];
    /** Whether `permissions` is a single permission, an any-of list, or an all-of list. */
    mode: PermissionMode;
    /** What acting in a customer's or supplier's account requires instead, when the endpoint says. */
    counterparty: CounterpartyPermissions;
    /** Required role type, e.g. `admin`, when the endpoint is gated to a role. */
    roleType: string | null;
}

const PERMISSION_SENTENCE = /\n*This endpoint requires the permissions?:\s*(.+?)\.\s*$/;
const ROLE_SENTENCE = /\s*This endpoint requires the `([^`]+)` role type\.\s*$/;
const COUNTERPARTY_PARAGRAPH =
    /\n*(Acting in a (?:customer|supplier)'s account requires [\s\S]*?instead of the permission this endpoint requires in your own account\.)\s*$/;
const COUNTERPARTY_CLAUSE = /acting in a (customer|supplier)'s account requires `([^`]+)`/gi;

/**
 * Pulls the trailing authorization sentences out of an endpoint description so they
 * can be rendered as their own section instead of prose. The API writes them last, in
 * this order:
 *   - "Acting in a customer's account requires `customers:read`, and acting in a
 *     supplier's account requires `suppliers:read`, instead of the permission this
 *     endpoint requires in your own account." (its own paragraph, optional)
 *   - "This endpoint requires the `admin` role type." (optional)
 *   - "This endpoint requires the permission(s): `a`, `b`." or "…: `a` and `b`."
 *
 * Returns the description with those sentences removed and the parsed authorization.
 */
export function extractAuthorization(description: string): {
    description: string;
    authorization: EndpointAuthorization;
} {
    let body = description;
    let permissions: string[] = [];
    let mode: PermissionMode = 'one';
    let roleType: string | null = null;
    const counterparty: CounterpartyPermissions = { customer: null, supplier: null };

    const permMatch = body.match(PERMISSION_SENTENCE);
    if (permMatch) {
        const list = permMatch[1];
        const parsed = (list.match(/`([^`]+)`/g) ?? []).map((token) => token.replace(/`/g, ''));
        if (parsed.length > 0) {
            permissions = parsed;
            if (parsed.length > 1) {
                mode = /`\s+and\s+`/.test(list) ? 'all' : 'any';
            }
            body = body.slice(0, permMatch.index).trimEnd();
        }
    }

    const roleMatch = body.match(ROLE_SENTENCE);
    if (roleMatch) {
        roleType = roleMatch[1];
        body = body.slice(0, roleMatch.index).trimEnd();
    }

    const counterpartyMatch = body.match(COUNTERPARTY_PARAGRAPH);
    if (counterpartyMatch) {
        for (const clause of counterpartyMatch[1].matchAll(COUNTERPARTY_CLAUSE)) {
            const kind = clause[1].toLowerCase() as keyof CounterpartyPermissions;
            counterparty[kind] = clause[2];
        }
        if (counterparty.customer || counterparty.supplier) {
            body = body.slice(0, counterpartyMatch.index).trimEnd();
        }
    }

    return {
        description: body,
        authorization: { permissions, mode, counterparty, roleType },
    };
}
