export interface EndpointAuthorization {
    /** Permission slugs the endpoint requires, e.g. `customers:read`. */
    permissions: string[];
    /** Required role type, e.g. `admin`, when the endpoint is gated to a role. */
    roleType: string | null;
}

/**
 * Pulls the trailing authorization sentences out of an endpoint description so they
 * can be rendered as their own section instead of prose. Handles:
 *   - "This endpoint requires the permission(s): `a`, `b`."
 *   - "This endpoint requires the `admin` role type."
 *
 * Returns the description with those sentences removed and the parsed authorization.
 */
export function extractAuthorization(description: string): {
    description: string;
    authorization: EndpointAuthorization;
} {
    let body = description;
    let permissions: string[] = [];
    let roleType: string | null = null;

    const roleMatch = body.match(
        /\n*This endpoint requires the `([^`]+)` role type\.\s*$/,
    );
    if (roleMatch) {
        roleType = roleMatch[1];
        body = body.slice(0, roleMatch.index).trimEnd();
    }

    const permMatch = body.match(
        /\n*This endpoint requires the permissions?:\s*(.+?)\.\s*$/,
    );
    if (permMatch) {
        const parsed = (permMatch[1].match(/`([^`]+)`/g) ?? []).map((token) =>
            token.replace(/`/g, ''),
        );
        if (parsed.length > 0) {
            permissions = parsed;
            body = body.slice(0, permMatch.index).trimEnd();
        }
    }

    return {
        description: body,
        authorization: { permissions, roleType },
    };
}
