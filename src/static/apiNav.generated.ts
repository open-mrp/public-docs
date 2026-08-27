// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run build:docs' to regenerate.
//
// Compact per-version endpoint listing for the API reference sidenav and
// version selector. Deliberately small so it is safe to ship to the client.

export interface ApiNavEntry {
    domain: string;
    /** Static URL segments of the endpoint path, used to build the nested sidenav tree. */
    segments: string[];
    tagSlug: string;
    endpointSlug: string;
    /** Short action label shown in the sidenav, e.g. "List", "Create". */
    label: string;
}

export interface ApiObjectNavEntry {
    domain: string;
    domainLabel: string;
    slug: string;
    label: string;
}

export const apiNavEntriesByVersion: Record<string, ApiNavEntry[]> = {
    "1.0.forge-preview.4": [
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "create-api-key",
            "label": "Create"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "list-api-keys",
            "label": "List"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "retrieve-api-key",
            "label": "Retrieve"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "revoke-api-key",
            "label": "Delete"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "rotate-api-key",
            "label": "Rotate API Key"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "create-sandbox",
            "label": "Create"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "list-sandboxes",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "retrieve-sandbox",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "delete-sandbox",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log",
            "endpointSlug": "list-request-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log",
            "endpointSlug": "retrieve-request-log",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "list-audit-events",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events",
                "resource-types"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "list-audit-event-resource-types",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "retrieve-audit-event",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "create-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "update-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "list-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "retrieve-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "delete-unit",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "bulk-upsert-units",
            "label": "Bulk Upsert Units"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "create-unit-group",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "update-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "list-unit-groups",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "retrieve-unit-group",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "delete-unit-group",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "bulk-upsert-unit-groups",
            "label": "Bulk Upsert Unit Groups"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "create-unit-group-associated-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "update-unit-group-associated-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "list-unit-group-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "retrieve-unit-group-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "delete-unit-group-associated-unit",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "create-agent",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "update-agent",
            "label": "Update"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "list-agents",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "retrieve-agent",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "delete-agent",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "agents",
                "status"
            ],
            "tagSlug": "agent",
            "endpointSlug": "update-agent-status",
            "label": "Update Agent Status"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "send-notification",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "list-notifications",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications",
                "unread-count"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "get-notification-unread-count",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications",
                "unread-summary"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "get-cross-account-unread-summary",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "retrieve-notification",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-all-notifications-seen",
            "label": "Mark All Notifications Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "dismiss-notification",
            "label": "Dismiss Notification"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-notification-read",
            "label": "Mark Notification Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-notification-seen",
            "label": "Mark Notification Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "list-announcements",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "retrieve-announcement",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-dismissed",
            "label": "Mark Announcement Dismissed"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-read",
            "label": "Mark Announcement Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-seen",
            "label": "Mark Announcement Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "create-conversation",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "update-conversation",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "list-conversations",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "retrieve-conversation",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "link-record",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "list-links",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unlink-record",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "archive-conversation",
            "label": "Archive Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "assign-case",
            "label": "Assign Case"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "hide-conversation",
            "label": "Hide Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "leave-conversation",
            "label": "Leave Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "mute-conversation",
            "label": "Mute Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "mark-conversation-read",
            "label": "Mark Conversation Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "redact-conversation",
            "label": "Redact Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "report-conversation",
            "label": "Report Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "set-legal-hold",
            "label": "Set Legal Hold"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "set-case-status",
            "label": "Set Case Status"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unarchive-conversation",
            "label": "Unarchive Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unhide-conversation",
            "label": "Unhide Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unmute-conversation",
            "label": "Unmute Conversation"
        },
        {
            "domain": "core",
            "segments": [
                "search"
            ],
            "tagSlug": "search",
            "endpointSlug": "search",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "update-reply-draft",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "send-message",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "list-messages",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "approve-and-send-reply-draft",
            "label": "Approve And Send Reply Draft"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "cancel-scheduled-message",
            "label": "Cancel Scheduled Message"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "reject-reply-draft",
            "label": "Reject Reply Draft"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "add-participant",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "remove-participant",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "update-participant-role",
            "label": "Update Participant Role"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "create-messaging-group",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "update-messaging-group",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "list-messaging-groups",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "retrieve-messaging-group",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "delete-messaging-group",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups",
                "members"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "add-messaging-group-member",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups",
                "members"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "remove-messaging-group-member",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "attachments"
            ],
            "tagSlug": "message-attachments",
            "endpointSlug": "create-attachment-upload-url",
            "label": "Create Attachment Upload URL"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "block-user",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "list-blocks",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "unblock-user",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "preferences"
            ],
            "tagSlug": "notification-preferences",
            "endpointSlug": "list-notification-preferences",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "preferences"
            ],
            "tagSlug": "notification-preferences",
            "endpointSlug": "upsert-notification-preference",
            "label": "Upsert Notification Preference"
        },
        {
            "domain": "messaging",
            "segments": [
                "contacts"
            ],
            "tagSlug": "messaging-contacts",
            "endpointSlug": "list-messaging-contacts",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "create-email-domain",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "list-email-domains",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "get-email-domain",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "delete-email-domain",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "verify-email-domain",
            "label": "Verify Email Domain"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "create-email-inbox",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "update-email-inbox",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "list-email-inboxes",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "get-email-inbox",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "delete-email-inbox",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "trigger-agent-run",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "list-agent-runs",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "retrieve-agent-run",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "cancel-agent-run",
            "label": "Cancel Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "continue-agent-run",
            "label": "Continue Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "retry-agent-run",
            "label": "Retry Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "tool-groups"
            ],
            "tagSlug": "agent-tools",
            "endpointSlug": "list-tool-groups",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "tools"
            ],
            "tagSlug": "agent-tools",
            "endpointSlug": "list-tools",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "create-agent-memory",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "update-agent-memory",
            "label": "Update"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "list-agent-memories",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "retrieve-agent-memory",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "delete-agent-memory",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "create-account-group",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "update-account-group",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "list-account-groups",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "retrieve-account-group",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "delete-account-group",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "create-account-price",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "update-account-price",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "list-account-prices",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "retrieve-account-price",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "delete-account-price",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "export-price-list",
            "label": "Export Price List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "create-payment-term",
            "label": "Create"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "update-payment-term",
            "label": "Update"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "list-payment-terms",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "retrieve-payment-term",
            "label": "Retrieve"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "delete-payment-term",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "create-shipping-term",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "update-shipping-term",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "list-shipping-terms",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "retrieve-shipping-term",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "delete-shipping-term",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "create-address",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "update-address",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "list-addresses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "retrieve-address",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "delete-address",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "addresses",
                "suggestions"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "list-address-suggestions",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "validate-address",
            "label": "Validate Address"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "list-account-statuses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "retrieve-account-status",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "create-account-user",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "update-account-user",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "list-account-users",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "retrieve-account-user",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "activate-account-user",
            "label": "Activate Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "disable-account-user",
            "label": "Disable Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "remove-account-user",
            "label": "Remove Account User"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "create-sales-target",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "upsert-sales-target",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "list-sales-targets",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "create-property",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "update-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "list-properties",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "retrieve-property",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "delete-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "bulk-upsert-properties",
            "label": "Bulk Upsert Properties"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "create-attribute",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "update-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "list-attributes",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "retrieve-attribute",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "delete-attribute",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "accounts",
                "favicon"
            ],
            "tagSlug": "account",
            "endpointSlug": "upload-account-favicon",
            "label": "Upload Account Favicon"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "create-portal-domain",
            "label": "Create"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "list-portal-domains",
            "label": "List"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "retrieve-portal-domain",
            "label": "Retrieve"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "delete-portal-domain",
            "label": "Delete"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "verify-portal-domain",
            "label": "Verify Portal Domain"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "create-account-integration",
            "label": "Create"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "update-account-integration",
            "label": "Update"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "list-account-integrations",
            "label": "List"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "delete-account-integration",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "list-priorities",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "retrieve-priority",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "create-carrier",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "update-carrier",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "list-carriers",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "retrieve-carrier",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "delete-carrier",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "create-service-level",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "update-service-level",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "list-service-levels",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "retrieve-service-level",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "delete-service-level",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "list-items",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "bulk-reconcile-items",
            "label": "Bulk Reconcile Items"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items",
            "endpointSlug": "add-item-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "category"
            ],
            "tagSlug": "items",
            "endpointSlug": "change-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item-inventory",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "lot-default"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item-lot-default",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items",
            "endpointSlug": "remove-item-attribute",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items",
            "endpointSlug": "update-item-inventory",
            "label": "Update Item Inventory"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "create-item-category",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "update-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "list-item-categories",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "retrieve-item-category",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "delete-item-category",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "bulk-upsert-item-categories",
            "label": "Bulk Upsert Item Categories"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "add-item-category-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "unit-groups"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "change-item-category-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "remove-item-category-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "create-material",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "update-material",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "list-materials",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "retrieve-material",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "delete-material",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "bulk-upsert-materials",
            "label": "Bulk Upsert Materials"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "create-part",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "update-part",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "list-parts",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "retrieve-part",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "delete-part",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "bulk-upsert-parts",
            "label": "Bulk Upsert Parts"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "create-department",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "update-department",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "list-departments",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "retrieve-department",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "delete-department",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "list-email-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "retrieve-email-log",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "create-customer",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "update-customer",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "list-customers",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "delete-customer",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "customers",
                "lead-time"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer-lead-time",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "merge-customers",
            "label": "Merge Customers"
        },
        {
            "domain": "sales",
            "segments": [
                "contacts"
            ],
            "tagSlug": "contacts",
            "endpointSlug": "find-contact-by-email",
            "label": "Find Contact by Email"
        },
        {
            "domain": "operations",
            "segments": [
                "inventory-change-logs"
            ],
            "tagSlug": "inventory-change-logs",
            "endpointSlug": "list-inventory-change-logs",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "inventory-change-logs"
            ],
            "tagSlug": "inventory-change-logs",
            "endpointSlug": "retrieve-inventory-change-log",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "inventory-change-logs"
            ],
            "tagSlug": "inventory-change-logs",
            "endpointSlug": "export-inventory-change-logs",
            "label": "Export Inventory Change Logs"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "create-machine",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "update-machine",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "list-machines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "retrieve-machine",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "delete-machine",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "create-order-discount",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "update-order-discount",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "list-order-discounts",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "retrieve-order-discount",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "delete-order-discount",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "find-order-discount-by-code",
            "label": "Find Order Discount by Code"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "create-product-line",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "update-product-line",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "list-product-lines",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "retrieve-product-line",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "delete-product-line",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "bulk-upsert-product-lines",
            "label": "Bulk Upsert Product Lines"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "create-product",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "update-product",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "list-products",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "retrieve-product",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "delete-product",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "bulk-upsert-products",
            "label": "Bulk Upsert Products"
        },
        {
            "domain": "catalog",
            "segments": [
                "products",
                "product-line"
            ],
            "tagSlug": "products",
            "endpointSlug": "change-product-product-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "statuses"
            ],
            "tagSlug": "sales-order-statuses",
            "endpointSlug": "list-sales-order-statuses",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "jobs"
            ],
            "tagSlug": "jobs",
            "endpointSlug": "retrieve-job",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "jobs",
                "cancel"
            ],
            "tagSlug": "jobs",
            "endpointSlug": "cancel-job",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "create-machine-downtime-event",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "update-machine-downtime-event",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "list-machine-downtime-events",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-reasons"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "list-machine-downtime-reasons",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "retrieve-machine-downtime-event",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "delete-machine-downtime-event",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-status"
            ],
            "tagSlug": "machine-status",
            "endpointSlug": "list-machine-status",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "create-demand-override",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "update-demand-override",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-override-types"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "list-demand-override-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "list-demand-overrides",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "retrieve-demand-override",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "delete-demand-override",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "generate-production-schedule",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedules",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "current"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "retrieve-current-production-schedule",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "schedule-deviation-types"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-schedule-deviation-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "retrieve-production-schedule",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "delete-production-schedule",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule",
            "label": "Preview Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "create-production-schedule-line",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "update-production-schedule-line",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "at-risk-orders"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-schedule-at-risk-orders",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "derived-lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-derived-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "deviations"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-deviations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "finished-policies"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-finished-policies",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "finishing-lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-finishing-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "item-policies"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-item-policies",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "week-release-preview"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule-week-release",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "delete-production-schedule-line",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "archive-production-schedule",
            "label": "Archive Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule-regenerate",
            "label": "Preview Production Schedule Regenerate"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "publish-production-schedule",
            "label": "Publish Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "regenerate-production-schedule",
            "label": "Regenerate Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "release-production-schedule-week",
            "label": "Release Production Schedule Week"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "upsert-production-schedule-item-setting",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "fulfillment-recommendations"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-fulfillment-recommendations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "retrieve-production-schedule-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-production-schedule-item-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-production-schedule-resource-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "retrieve-production-schedule-item-setting",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "delete-production-schedule-item-setting",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "delete-production-schedule-resource-setting",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "fulfillment-recommendations"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "apply-fulfillment-recommendations",
            "label": "Apply Fulfillment Recommendations"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "update-production-schedule-settings",
            "label": "Update Production Schedule Settings"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "upsert-production-schedule-resource-setting",
            "label": "Upsert Production Schedule Resource Setting"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "create-operating-calendar",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "update-operating-calendar",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "list-operating-calendars",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "retrieve-operating-calendar",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "delete-operating-calendar",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars",
                "closures"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "create-operating-calendar-closure",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars",
                "closures"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "list-operating-calendar-closures",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars",
                "closures"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "delete-operating-calendar-closure",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "create-volume-discount",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "update-volume-discount",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "list-volume-discounts",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "retrieve-volume-discount",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "delete-volume-discount",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-sales-order",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "price-quote"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-prices",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "update-sales-order",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "list-sales-orders",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "retrieve-sales-order",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "delete-sales-order",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "bulk-delete-sales-orders",
            "label": "Bulk Delete Sales Orders"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-commitment",
            "label": "Quote Sales Order Commitment"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "checkout"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "checkout-sales-order",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-sales-order-line",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "update-sales-order-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "delete-sales-order-line",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "close-sales-order",
            "label": "Close Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-production-run-from-sales-order",
            "label": "Create Production Run"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "issue-sales-order",
            "label": "Issue Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "reopen-sales-order",
            "label": "Reopen Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-freight",
            "label": "Quote Sales Order Freight"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "unissue-sales-order",
            "label": "Unissue Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "reorder-sales-order-lines",
            "label": "Reorder Sales Order Lines"
        },
        {
            "domain": "operations",
            "segments": [
                "picks"
            ],
            "tagSlug": "picks",
            "endpointSlug": "list-picks",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "picks"
            ],
            "tagSlug": "picks",
            "endpointSlug": "retrieve-pick",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "picks",
                "lines"
            ],
            "tagSlug": "picks",
            "endpointSlug": "update-pick-line",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "picks"
            ],
            "tagSlug": "picks",
            "endpointSlug": "pack-pick",
            "label": "Pack Pick"
        },
        {
            "domain": "operations",
            "segments": [
                "picks"
            ],
            "tagSlug": "picks",
            "endpointSlug": "pick-all-lines",
            "label": "Pick All Lines"
        },
        {
            "domain": "operations",
            "segments": [
                "picks"
            ],
            "tagSlug": "picks",
            "endpointSlug": "void-pick",
            "label": "Void Pick"
        },
        {
            "domain": "operations",
            "segments": [
                "picks",
                "lines"
            ],
            "tagSlug": "picks",
            "endpointSlug": "pick-pick-line",
            "label": "Pick Pick Line"
        },
        {
            "domain": "operations",
            "segments": [
                "picks",
                "lines"
            ],
            "tagSlug": "picks",
            "endpointSlug": "void-pick-line",
            "label": "Void Pick Line"
        },
        {
            "domain": "finance",
            "segments": [
                "adjustment-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-adjustment-types",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-methods"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-methods",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "create-location",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "update-location",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location",
            "endpointSlug": "list-location-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "list-locations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location",
            "endpointSlug": "retrieve-location-type",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "retrieve-location",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "delete-location",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "bulk-upsert-locations",
            "label": "Bulk Upsert Locations"
        },
        {
            "domain": "operations",
            "segments": [
                "shipments"
            ],
            "tagSlug": "shipment",
            "endpointSlug": "rate-shop",
            "label": "Rate Shop"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "create-scanning-station",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "update-scanning-station",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "list-scanning-stations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "retrieve-scanning-station",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "delete-scanning-station",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "create-role",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "update-role",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "list-roles",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "retrieve-role",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "delete-role",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "permission-groups"
            ],
            "tagSlug": "permission-groups",
            "endpointSlug": "list-permission-groups",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "delivery-performance"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-delivery-performance",
            "label": "Analyze Delivery Performance"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "oee"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-oee",
            "label": "Analyze OEE"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "oee-trend"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-oee-trend",
            "label": "Analyze OEE trend"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "schedule-attainment"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-schedule-attainment",
            "label": "Analyze Schedule Attainment"
        },
        {
            "domain": "core",
            "segments": [],
            "tagSlug": "utils",
            "endpointSlug": "email-record",
            "label": "Email Record"
        }
    ],
    "1.0.forge-preview.3": [
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "create-api-key",
            "label": "Create"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "list-api-keys",
            "label": "List"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "retrieve-api-key",
            "label": "Retrieve"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "revoke-api-key",
            "label": "Delete"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "rotate-api-key",
            "label": "Rotate API Key"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "create-sandbox",
            "label": "Create"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "list-sandboxes",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "retrieve-sandbox",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "delete-sandbox",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log",
            "endpointSlug": "list-request-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log",
            "endpointSlug": "retrieve-request-log",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "list-audit-events",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events",
                "resource-types"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "list-audit-event-resource-types",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "retrieve-audit-event",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "create-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "update-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "list-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "retrieve-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "delete-unit",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "bulk-upsert-units",
            "label": "Bulk Upsert Units"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "create-unit-group",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "update-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "list-unit-groups",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "retrieve-unit-group",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "delete-unit-group",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "bulk-upsert-unit-groups",
            "label": "Bulk Upsert Unit Groups"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "create-unit-group-associated-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "update-unit-group-associated-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "list-unit-group-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "retrieve-unit-group-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "delete-unit-group-associated-unit",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "create-agent",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "update-agent",
            "label": "Update"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "list-agents",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "retrieve-agent",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "delete-agent",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "agents",
                "status"
            ],
            "tagSlug": "agent",
            "endpointSlug": "update-agent-status",
            "label": "Update Agent Status"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "send-notification",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "list-notifications",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications",
                "unread-count"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "get-notification-unread-count",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications",
                "unread-summary"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "get-cross-account-unread-summary",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "retrieve-notification",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-all-notifications-seen",
            "label": "Mark All Notifications Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "dismiss-notification",
            "label": "Dismiss Notification"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-notification-read",
            "label": "Mark Notification Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-notification-seen",
            "label": "Mark Notification Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "list-announcements",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "retrieve-announcement",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-dismissed",
            "label": "Mark Announcement Dismissed"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-read",
            "label": "Mark Announcement Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-seen",
            "label": "Mark Announcement Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "create-conversation",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "update-conversation",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "list-conversations",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "retrieve-conversation",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "link-record",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "list-links",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unlink-record",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "archive-conversation",
            "label": "Archive Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "assign-case",
            "label": "Assign Case"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "hide-conversation",
            "label": "Hide Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "leave-conversation",
            "label": "Leave Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "mute-conversation",
            "label": "Mute Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "mark-conversation-read",
            "label": "Mark Conversation Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "redact-conversation",
            "label": "Redact Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "report-conversation",
            "label": "Report Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "set-legal-hold",
            "label": "Set Legal Hold"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "set-case-status",
            "label": "Set Case Status"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unarchive-conversation",
            "label": "Unarchive Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unhide-conversation",
            "label": "Unhide Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unmute-conversation",
            "label": "Unmute Conversation"
        },
        {
            "domain": "core",
            "segments": [
                "search"
            ],
            "tagSlug": "search",
            "endpointSlug": "search",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "update-reply-draft",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "send-message",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "list-messages",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "approve-and-send-reply-draft",
            "label": "Approve And Send Reply Draft"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "cancel-scheduled-message",
            "label": "Cancel Scheduled Message"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "reject-reply-draft",
            "label": "Reject Reply Draft"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "add-participant",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "remove-participant",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "update-participant-role",
            "label": "Update Participant Role"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "create-messaging-group",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "update-messaging-group",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "list-messaging-groups",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "retrieve-messaging-group",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "delete-messaging-group",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups",
                "members"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "add-messaging-group-member",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups",
                "members"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "remove-messaging-group-member",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "attachments"
            ],
            "tagSlug": "message-attachments",
            "endpointSlug": "create-attachment-upload-url",
            "label": "Create Attachment Upload URL"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "block-user",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "list-blocks",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "unblock-user",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "preferences"
            ],
            "tagSlug": "notification-preferences",
            "endpointSlug": "list-notification-preferences",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "preferences"
            ],
            "tagSlug": "notification-preferences",
            "endpointSlug": "upsert-notification-preference",
            "label": "Upsert Notification Preference"
        },
        {
            "domain": "messaging",
            "segments": [
                "contacts"
            ],
            "tagSlug": "messaging-contacts",
            "endpointSlug": "list-messaging-contacts",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "create-email-domain",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "list-email-domains",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "get-email-domain",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "delete-email-domain",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "verify-email-domain",
            "label": "Verify Email Domain"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "create-email-inbox",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "update-email-inbox",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "list-email-inboxes",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "get-email-inbox",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "delete-email-inbox",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "trigger-agent-run",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "list-agent-runs",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "retrieve-agent-run",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "cancel-agent-run",
            "label": "Cancel Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "continue-agent-run",
            "label": "Continue Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "retry-agent-run",
            "label": "Retry Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "tool-groups"
            ],
            "tagSlug": "agent-tools",
            "endpointSlug": "list-tool-groups",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "tools"
            ],
            "tagSlug": "agent-tools",
            "endpointSlug": "list-tools",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "create-agent-memory",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "update-agent-memory",
            "label": "Update"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "list-agent-memories",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "retrieve-agent-memory",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "delete-agent-memory",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "create-account-group",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "update-account-group",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "list-account-groups",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "retrieve-account-group",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "delete-account-group",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "create-account-price",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "update-account-price",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "list-account-prices",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "retrieve-account-price",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "delete-account-price",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-prices"
            ],
            "tagSlug": "account-prices",
            "endpointSlug": "export-price-list",
            "label": "Export Price List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "create-payment-term",
            "label": "Create"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "update-payment-term",
            "label": "Update"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "list-payment-terms",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "retrieve-payment-term",
            "label": "Retrieve"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "delete-payment-term",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "create-shipping-term",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "update-shipping-term",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "list-shipping-terms",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "retrieve-shipping-term",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "delete-shipping-term",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "create-address",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "update-address",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "list-addresses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "retrieve-address",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "delete-address",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "addresses",
                "suggestions"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "list-address-suggestions",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "validate-address",
            "label": "Validate Address"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "list-account-statuses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "retrieve-account-status",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "create-account-user",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "update-account-user",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "list-account-users",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "retrieve-account-user",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "activate-account-user",
            "label": "Activate Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "disable-account-user",
            "label": "Disable Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "remove-account-user",
            "label": "Remove Account User"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "create-sales-target",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "upsert-sales-target",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "list-sales-targets",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "create-property",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "update-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "list-properties",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "retrieve-property",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "delete-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "bulk-upsert-properties",
            "label": "Bulk Upsert Properties"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "create-attribute",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "update-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "list-attributes",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "retrieve-attribute",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "delete-attribute",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "accounts",
                "favicon"
            ],
            "tagSlug": "account",
            "endpointSlug": "upload-account-favicon",
            "label": "Upload Account Favicon"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "create-portal-domain",
            "label": "Create"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "list-portal-domains",
            "label": "List"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "retrieve-portal-domain",
            "label": "Retrieve"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "delete-portal-domain",
            "label": "Delete"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "verify-portal-domain",
            "label": "Verify Portal Domain"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "create-account-integration",
            "label": "Create"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "update-account-integration",
            "label": "Update"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "list-account-integrations",
            "label": "List"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "delete-account-integration",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "list-priorities",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "retrieve-priority",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "create-carrier",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "update-carrier",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "list-carriers",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "retrieve-carrier",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "delete-carrier",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "create-service-level",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "update-service-level",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "list-service-levels",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "retrieve-service-level",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "delete-service-level",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "list-items",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "bulk-reconcile-items",
            "label": "Bulk Reconcile Items"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items",
            "endpointSlug": "add-item-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "category"
            ],
            "tagSlug": "items",
            "endpointSlug": "change-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item-inventory",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "lot-default"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item-lot-default",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items",
            "endpointSlug": "remove-item-attribute",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items",
            "endpointSlug": "update-item-inventory",
            "label": "Update Item Inventory"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "create-item-category",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "update-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "list-item-categories",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "retrieve-item-category",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "delete-item-category",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "bulk-upsert-item-categories",
            "label": "Bulk Upsert Item Categories"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "add-item-category-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "unit-groups"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "change-item-category-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "remove-item-category-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "create-material",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "update-material",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "list-materials",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "retrieve-material",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "delete-material",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "bulk-upsert-materials",
            "label": "Bulk Upsert Materials"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "create-part",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "update-part",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "list-parts",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "retrieve-part",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "delete-part",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "bulk-upsert-parts",
            "label": "Bulk Upsert Parts"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "create-department",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "update-department",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "list-departments",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "retrieve-department",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "delete-department",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "list-email-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "retrieve-email-log",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "create-customer",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "update-customer",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "list-customers",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "delete-customer",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "customers",
                "lead-time"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer-lead-time",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "merge-customers",
            "label": "Merge Customers"
        },
        {
            "domain": "sales",
            "segments": [
                "contacts"
            ],
            "tagSlug": "contacts",
            "endpointSlug": "find-contact-by-email",
            "label": "Find Contact by Email"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "create-machine",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "update-machine",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "list-machines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "retrieve-machine",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "delete-machine",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "create-order-discount",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "update-order-discount",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "list-order-discounts",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "retrieve-order-discount",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "delete-order-discount",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "order-discounts"
            ],
            "tagSlug": "order-discounts",
            "endpointSlug": "find-order-discount-by-code",
            "label": "Find Order Discount by Code"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "create-product-line",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "update-product-line",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "list-product-lines",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "retrieve-product-line",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "delete-product-line",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "bulk-upsert-product-lines",
            "label": "Bulk Upsert Product Lines"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "create-product",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "update-product",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "list-products",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "retrieve-product",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "delete-product",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "bulk-upsert-products",
            "label": "Bulk Upsert Products"
        },
        {
            "domain": "catalog",
            "segments": [
                "products",
                "product-line"
            ],
            "tagSlug": "products",
            "endpointSlug": "change-product-product-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "statuses"
            ],
            "tagSlug": "sales-order-statuses",
            "endpointSlug": "list-sales-order-statuses",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "jobs"
            ],
            "tagSlug": "jobs",
            "endpointSlug": "retrieve-job",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "jobs",
                "cancel"
            ],
            "tagSlug": "jobs",
            "endpointSlug": "cancel-job",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "create-machine-downtime-event",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "update-machine-downtime-event",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "list-machine-downtime-events",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-reasons"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "list-machine-downtime-reasons",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "retrieve-machine-downtime-event",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "delete-machine-downtime-event",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-status"
            ],
            "tagSlug": "machine-status",
            "endpointSlug": "list-machine-status",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "create-demand-override",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "update-demand-override",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-override-types"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "list-demand-override-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "list-demand-overrides",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "retrieve-demand-override",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "delete-demand-override",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "generate-production-schedule",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedules",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "current"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "retrieve-current-production-schedule",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "schedule-deviation-types"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-schedule-deviation-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "retrieve-production-schedule",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "delete-production-schedule",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule",
            "label": "Preview Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "create-production-schedule-line",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "update-production-schedule-line",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "at-risk-orders"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-schedule-at-risk-orders",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "derived-lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-derived-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "deviations"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-deviations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "finished-policies"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-finished-policies",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "finishing-lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-finishing-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "item-policies"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-item-policies",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "week-release-preview"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule-week-release",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "delete-production-schedule-line",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "archive-production-schedule",
            "label": "Archive Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule-regenerate",
            "label": "Preview Production Schedule Regenerate"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "publish-production-schedule",
            "label": "Publish Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "regenerate-production-schedule",
            "label": "Regenerate Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "release-production-schedule-week",
            "label": "Release Production Schedule Week"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "upsert-production-schedule-item-setting",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "fulfillment-recommendations"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-fulfillment-recommendations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "retrieve-production-schedule-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-production-schedule-item-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-production-schedule-resource-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "retrieve-production-schedule-item-setting",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "delete-production-schedule-item-setting",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "delete-production-schedule-resource-setting",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "fulfillment-recommendations"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "apply-fulfillment-recommendations",
            "label": "Apply Fulfillment Recommendations"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "update-production-schedule-settings",
            "label": "Update Production Schedule Settings"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "upsert-production-schedule-resource-setting",
            "label": "Upsert Production Schedule Resource Setting"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "create-operating-calendar",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "update-operating-calendar",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "list-operating-calendars",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "retrieve-operating-calendar",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "delete-operating-calendar",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars",
                "closures"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "create-operating-calendar-closure",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars",
                "closures"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "list-operating-calendar-closures",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "operating-calendars",
                "closures"
            ],
            "tagSlug": "operating-calendars",
            "endpointSlug": "delete-operating-calendar-closure",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "create-volume-discount",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "update-volume-discount",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "list-volume-discounts",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "retrieve-volume-discount",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "volume-discounts"
            ],
            "tagSlug": "volume-discounts",
            "endpointSlug": "delete-volume-discount",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-sales-order",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "price-quote"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-prices",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "update-sales-order",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "list-sales-orders",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "retrieve-sales-order",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "delete-sales-order",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "bulk-delete-sales-orders",
            "label": "Bulk Delete Sales Orders"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-commitment",
            "label": "Quote Sales Order Commitment"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "checkout"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "checkout-sales-order",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-sales-order-line",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "update-sales-order-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "delete-sales-order-line",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "close-sales-order",
            "label": "Close Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-production-run-from-sales-order",
            "label": "Create Production Run"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "issue-sales-order",
            "label": "Issue Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "reopen-sales-order",
            "label": "Reopen Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-freight",
            "label": "Quote Sales Order Freight"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "unissue-sales-order",
            "label": "Unissue Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "reorder-sales-order-lines",
            "label": "Reorder Sales Order Lines"
        },
        {
            "domain": "finance",
            "segments": [
                "adjustment-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-adjustment-types",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-methods"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-methods",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "create-location",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "update-location",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location",
            "endpointSlug": "list-location-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "list-locations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location",
            "endpointSlug": "retrieve-location-type",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "retrieve-location",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "delete-location",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "bulk-upsert-locations",
            "label": "Bulk Upsert Locations"
        },
        {
            "domain": "operations",
            "segments": [
                "shipments"
            ],
            "tagSlug": "shipment",
            "endpointSlug": "rate-shop",
            "label": "Rate Shop"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "create-scanning-station",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "update-scanning-station",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "list-scanning-stations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "retrieve-scanning-station",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "delete-scanning-station",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "create-role",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "update-role",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "list-roles",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "retrieve-role",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "delete-role",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "permission-groups"
            ],
            "tagSlug": "permission-groups",
            "endpointSlug": "list-permission-groups",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "delivery-performance"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-delivery-performance",
            "label": "Analyze Delivery Performance"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "oee"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-oee",
            "label": "Analyze OEE"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "oee-trend"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-oee-trend",
            "label": "Analyze OEE trend"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "schedule-attainment"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-schedule-attainment",
            "label": "Analyze Schedule Attainment"
        },
        {
            "domain": "core",
            "segments": [],
            "tagSlug": "utils",
            "endpointSlug": "email-record",
            "label": "Email Record"
        }
    ],
    "1.0.forge-preview.2": [
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "create-api-key",
            "label": "Create"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "list-api-keys",
            "label": "List"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "retrieve-api-key",
            "label": "Retrieve"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "revoke-api-key",
            "label": "Delete"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key",
            "endpointSlug": "rotate-api-key",
            "label": "Rotate API Key"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "create-sandbox",
            "label": "Create"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "list-sandboxes",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "retrieve-sandbox",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox",
            "endpointSlug": "delete-sandbox",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log",
            "endpointSlug": "list-request-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log",
            "endpointSlug": "retrieve-request-log",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "list-audit-events",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events",
                "resource-types"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "list-audit-event-resource-types",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event",
            "endpointSlug": "retrieve-audit-event",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "create-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "update-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "list-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "retrieve-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "delete-unit",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units",
            "endpointSlug": "bulk-upsert-units",
            "label": "Bulk Upsert Units"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "create-unit-group",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "update-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "list-unit-groups",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "retrieve-unit-group",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "delete-unit-group",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "bulk-upsert-unit-groups",
            "label": "Bulk Upsert Unit Groups"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "create-unit-group-associated-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "update-unit-group-associated-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "list-unit-group-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "retrieve-unit-group-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups",
            "endpointSlug": "delete-unit-group-associated-unit",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "create-agent",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "update-agent",
            "label": "Update"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "list-agents",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "retrieve-agent",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "agents"
            ],
            "tagSlug": "agent",
            "endpointSlug": "delete-agent",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "agents",
                "status"
            ],
            "tagSlug": "agent",
            "endpointSlug": "update-agent-status",
            "label": "Update Agent Status"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "send-notification",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "list-notifications",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications",
                "unread-count"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "get-notification-unread-count",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications",
                "unread-summary"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "get-cross-account-unread-summary",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "retrieve-notification",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-all-notifications-seen",
            "label": "Mark All Notifications Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "dismiss-notification",
            "label": "Dismiss Notification"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-notification-read",
            "label": "Mark Notification Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "notifications"
            ],
            "tagSlug": "notifications",
            "endpointSlug": "mark-notification-seen",
            "label": "Mark Notification Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "list-announcements",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "retrieve-announcement",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-dismissed",
            "label": "Mark Announcement Dismissed"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-read",
            "label": "Mark Announcement Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "announcements"
            ],
            "tagSlug": "announcements",
            "endpointSlug": "mark-announcement-seen",
            "label": "Mark Announcement Seen"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "create-conversation",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "update-conversation",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "list-conversations",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "retrieve-conversation",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "link-record",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "list-links",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "links"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unlink-record",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "archive-conversation",
            "label": "Archive Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "assign-case",
            "label": "Assign Case"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "hide-conversation",
            "label": "Hide Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "leave-conversation",
            "label": "Leave Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "mute-conversation",
            "label": "Mute Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "mark-conversation-read",
            "label": "Mark Conversation Read"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "redact-conversation",
            "label": "Redact Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "report-conversation",
            "label": "Report Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "set-legal-hold",
            "label": "Set Legal Hold"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "set-case-status",
            "label": "Set Case Status"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unarchive-conversation",
            "label": "Unarchive Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unhide-conversation",
            "label": "Unhide Conversation"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations"
            ],
            "tagSlug": "conversations",
            "endpointSlug": "unmute-conversation",
            "label": "Unmute Conversation"
        },
        {
            "domain": "core",
            "segments": [
                "search"
            ],
            "tagSlug": "search",
            "endpointSlug": "search",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "update-reply-draft",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "send-message",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "list-messages",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "approve-and-send-reply-draft",
            "label": "Approve And Send Reply Draft"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "cancel-scheduled-message",
            "label": "Cancel Scheduled Message"
        },
        {
            "domain": "messaging",
            "segments": [
                "messages"
            ],
            "tagSlug": "messages",
            "endpointSlug": "reject-reply-draft",
            "label": "Reject Reply Draft"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "add-participant",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "remove-participant",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "participants"
            ],
            "tagSlug": "conversation-participants",
            "endpointSlug": "update-participant-role",
            "label": "Update Participant Role"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "create-messaging-group",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "update-messaging-group",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "list-messaging-groups",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "retrieve-messaging-group",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "delete-messaging-group",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups",
                "members"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "add-messaging-group-member",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "groups",
                "members"
            ],
            "tagSlug": "messaging-groups",
            "endpointSlug": "remove-messaging-group-member",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "conversations",
                "attachments"
            ],
            "tagSlug": "message-attachments",
            "endpointSlug": "create-attachment-upload-url",
            "label": "Create Attachment Upload URL"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "block-user",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "list-blocks",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "blocks"
            ],
            "tagSlug": "message-blocks",
            "endpointSlug": "unblock-user",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "preferences"
            ],
            "tagSlug": "notification-preferences",
            "endpointSlug": "list-notification-preferences",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "preferences"
            ],
            "tagSlug": "notification-preferences",
            "endpointSlug": "upsert-notification-preference",
            "label": "Upsert Notification Preference"
        },
        {
            "domain": "messaging",
            "segments": [
                "contacts"
            ],
            "tagSlug": "messaging-contacts",
            "endpointSlug": "list-messaging-contacts",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "create-email-domain",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "list-email-domains",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "get-email-domain",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "delete-email-domain",
            "label": "Delete"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-domains"
            ],
            "tagSlug": "email-domains",
            "endpointSlug": "verify-email-domain",
            "label": "Verify Email Domain"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "create-email-inbox",
            "label": "Create"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "update-email-inbox",
            "label": "Update"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "list-email-inboxes",
            "label": "List"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "get-email-inbox",
            "label": "Retrieve"
        },
        {
            "domain": "messaging",
            "segments": [
                "email-inboxes"
            ],
            "tagSlug": "email-inboxes",
            "endpointSlug": "delete-email-inbox",
            "label": "Delete"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "trigger-agent-run",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "list-agent-runs",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "retrieve-agent-run",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "cancel-agent-run",
            "label": "Cancel Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "continue-agent-run",
            "label": "Continue Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "runs"
            ],
            "tagSlug": "agent-runs",
            "endpointSlug": "retry-agent-run",
            "label": "Retry Agent Run"
        },
        {
            "domain": "ai",
            "segments": [
                "tool-groups"
            ],
            "tagSlug": "agent-tools",
            "endpointSlug": "list-tool-groups",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "tools"
            ],
            "tagSlug": "agent-tools",
            "endpointSlug": "list-tools",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "create-agent-memory",
            "label": "Create"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "update-agent-memory",
            "label": "Update"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "list-agent-memories",
            "label": "List"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "retrieve-agent-memory",
            "label": "Retrieve"
        },
        {
            "domain": "ai",
            "segments": [
                "memories"
            ],
            "tagSlug": "agent-memories",
            "endpointSlug": "delete-agent-memory",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "create-account-group",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "update-account-group",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "list-account-groups",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "retrieve-account-group",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "delete-account-group",
            "label": "Delete"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "create-payment-term",
            "label": "Create"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "update-payment-term",
            "label": "Update"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "list-payment-terms",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "retrieve-payment-term",
            "label": "Retrieve"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms",
            "endpointSlug": "delete-payment-term",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "create-shipping-term",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "update-shipping-term",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "list-shipping-terms",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "retrieve-shipping-term",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms",
            "endpointSlug": "delete-shipping-term",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "create-address",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "update-address",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "list-addresses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "retrieve-address",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address",
            "endpointSlug": "delete-address",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "addresses",
                "suggestions"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "list-address-suggestions",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "validate-address",
            "label": "Validate Address"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "list-account-statuses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "retrieve-account-status",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "create-account-user",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "update-account-user",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "list-account-users",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "retrieve-account-user",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "activate-account-user",
            "label": "Activate Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "disable-account-user",
            "label": "Disable Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users",
            "endpointSlug": "remove-account-user",
            "label": "Remove Account User"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "create-sales-target",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "upsert-sales-target",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-users",
                "sales-targets"
            ],
            "tagSlug": "sales-targets",
            "endpointSlug": "list-sales-targets",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "create-property",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "update-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "list-properties",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "retrieve-property",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "delete-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties",
            "endpointSlug": "bulk-upsert-properties",
            "label": "Bulk Upsert Properties"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "create-attribute",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "update-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "list-attributes",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "retrieve-attribute",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties",
            "endpointSlug": "delete-attribute",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "accounts",
                "favicon"
            ],
            "tagSlug": "account",
            "endpointSlug": "upload-account-favicon",
            "label": "Upload Account Favicon"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "create-portal-domain",
            "label": "Create"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "list-portal-domains",
            "label": "List"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "retrieve-portal-domain",
            "label": "Retrieve"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "delete-portal-domain",
            "label": "Delete"
        },
        {
            "domain": "settings",
            "segments": [
                "portal-domains"
            ],
            "tagSlug": "portal-domains",
            "endpointSlug": "verify-portal-domain",
            "label": "Verify Portal Domain"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "create-account-integration",
            "label": "Create"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "update-account-integration",
            "label": "Update"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "list-account-integrations",
            "label": "List"
        },
        {
            "domain": "settings",
            "segments": [
                "integrations"
            ],
            "tagSlug": "account-integrations",
            "endpointSlug": "delete-account-integration",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "list-priorities",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "retrieve-priority",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "create-carrier",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "update-carrier",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "list-carriers",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "retrieve-carrier",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers",
            "endpointSlug": "delete-carrier",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "create-service-level",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "update-service-level",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "list-service-levels",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "retrieve-service-level",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels",
            "endpointSlug": "delete-service-level",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "list-items",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items",
            "endpointSlug": "add-item-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "category"
            ],
            "tagSlug": "items",
            "endpointSlug": "change-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item-inventory",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "lot-default"
            ],
            "tagSlug": "items",
            "endpointSlug": "retrieve-item-lot-default",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items",
            "endpointSlug": "remove-item-attribute",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "create-item-category",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "update-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "list-item-categories",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "retrieve-item-category",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "delete-item-category",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "bulk-upsert-item-categories",
            "label": "Bulk Upsert Item Categories"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "add-item-category-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "unit-groups"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "change-item-category-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories",
            "endpointSlug": "remove-item-category-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "create-material",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "update-material",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "list-materials",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "retrieve-material",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "delete-material",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials",
            "endpointSlug": "bulk-upsert-materials",
            "label": "Bulk Upsert Materials"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "create-part",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "update-part",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "list-parts",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "retrieve-part",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "delete-part",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts",
            "endpointSlug": "bulk-upsert-parts",
            "label": "Bulk Upsert Parts"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "create-department",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "update-department",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "list-departments",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "retrieve-department",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "departments"
            ],
            "tagSlug": "departments",
            "endpointSlug": "delete-department",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "list-email-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "retrieve-email-log",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "create-customer",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "update-customer",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "list-customers",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "delete-customer",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "customers",
                "lead-time"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer-lead-time",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "merge-customers",
            "label": "Merge Customers"
        },
        {
            "domain": "sales",
            "segments": [
                "contacts"
            ],
            "tagSlug": "contacts",
            "endpointSlug": "find-contact-by-email",
            "label": "Find Contact by Email"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "create-machine",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "update-machine",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "list-machines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "retrieve-machine",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "machines"
            ],
            "tagSlug": "machines",
            "endpointSlug": "delete-machine",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "create-product-line",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "update-product-line",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "list-product-lines",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "retrieve-product-line",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "delete-product-line",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines",
            "endpointSlug": "bulk-upsert-product-lines",
            "label": "Bulk Upsert Product Lines"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "create-product",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "update-product",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "list-products",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "retrieve-product",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "delete-product",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products",
            "endpointSlug": "bulk-upsert-products",
            "label": "Bulk Upsert Products"
        },
        {
            "domain": "catalog",
            "segments": [
                "products",
                "product-line"
            ],
            "tagSlug": "products",
            "endpointSlug": "change-product-product-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "statuses"
            ],
            "tagSlug": "sales-order-statuses",
            "endpointSlug": "list-sales-order-statuses",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "jobs"
            ],
            "tagSlug": "jobs",
            "endpointSlug": "retrieve-job",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "jobs",
                "cancel"
            ],
            "tagSlug": "jobs",
            "endpointSlug": "cancel-job",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "create-machine-downtime-event",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "update-machine-downtime-event",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "list-machine-downtime-events",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-reasons"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "list-machine-downtime-reasons",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "retrieve-machine-downtime-event",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-downtime-events"
            ],
            "tagSlug": "machine-downtime",
            "endpointSlug": "delete-machine-downtime-event",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "machine-status"
            ],
            "tagSlug": "machine-status",
            "endpointSlug": "list-machine-status",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "create-demand-override",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "update-demand-override",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-override-types"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "list-demand-override-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "list-demand-overrides",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "retrieve-demand-override",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "demand-overrides"
            ],
            "tagSlug": "demand-overrides",
            "endpointSlug": "delete-demand-override",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "generate-production-schedule",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedules",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "current"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "retrieve-current-production-schedule",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "schedule-deviation-types"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-schedule-deviation-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "retrieve-production-schedule",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "delete-production-schedule",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule",
            "label": "Preview Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "quote-promise-date",
            "label": "Quote Promise Date"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "create-production-schedule-line",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "update-production-schedule-line",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "at-risk-orders"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-schedule-at-risk-orders",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "derived-lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-derived-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "deviations"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-deviations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "finished-policies"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-finished-policies",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "item-policies"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-item-policies",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "list-production-schedule-lines",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "week-release-preview"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule-week-release",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules",
                "lines"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "delete-production-schedule-line",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "archive-production-schedule",
            "label": "Archive Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "preview-production-schedule-regenerate",
            "label": "Preview Production Schedule Regenerate"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "publish-production-schedule",
            "label": "Publish Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "regenerate-production-schedule",
            "label": "Regenerate Production Schedule"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedules"
            ],
            "tagSlug": "production-schedules",
            "endpointSlug": "release-production-schedule-week",
            "label": "Release Production Schedule Week"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "upsert-production-schedule-item-setting",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "fulfillment-recommendations"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-fulfillment-recommendations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "retrieve-production-schedule-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-production-schedule-item-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "list-production-schedule-resource-settings",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "retrieve-production-schedule-item-setting",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "items"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "delete-production-schedule-item-setting",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "delete-production-schedule-resource-setting",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "fulfillment-recommendations"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "apply-fulfillment-recommendations",
            "label": "Apply Fulfillment Recommendations"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "update-production-schedule-settings",
            "label": "Update Production Schedule Settings"
        },
        {
            "domain": "operations",
            "segments": [
                "production-schedule-settings",
                "resources"
            ],
            "tagSlug": "production-schedule-settings",
            "endpointSlug": "upsert-production-schedule-resource-setting",
            "label": "Upsert Production Schedule Resource Setting"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-sales-order",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "price-quote"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-prices",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "update-sales-order",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "list-sales-orders",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "retrieve-sales-order",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "delete-sales-order",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "bulk-delete-sales-orders",
            "label": "Bulk Delete Sales Orders"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "checkout"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "checkout-sales-order",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-sales-order-line",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "update-sales-order-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "delete-sales-order-line",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "close-sales-order",
            "label": "Close Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "create-production-run-from-sales-order",
            "label": "Create Production Run"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "issue-sales-order",
            "label": "Issue Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "reopen-sales-order",
            "label": "Reopen Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "quote-sales-order-freight",
            "label": "Quote Sales Order Freight"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "unissue-sales-order",
            "label": "Unissue Sales Order"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "lines"
            ],
            "tagSlug": "sales-orders",
            "endpointSlug": "reorder-sales-order-lines",
            "label": "Reorder Sales Order Lines"
        },
        {
            "domain": "finance",
            "segments": [
                "adjustment-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-adjustment-types",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-methods"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-methods",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "create-location",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "update-location",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location",
            "endpointSlug": "list-location-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "list-locations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location",
            "endpointSlug": "retrieve-location-type",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "retrieve-location",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "delete-location",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location",
            "endpointSlug": "bulk-upsert-locations",
            "label": "Bulk Upsert Locations"
        },
        {
            "domain": "operations",
            "segments": [
                "shipments"
            ],
            "tagSlug": "shipment",
            "endpointSlug": "rate-shop",
            "label": "Rate Shop"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "create-scanning-station",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "update-scanning-station",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "list-scanning-stations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "retrieve-scanning-station",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations",
            "endpointSlug": "delete-scanning-station",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "create-role",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "update-role",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "list-roles",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "retrieve-role",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "delete-role",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "permission-groups"
            ],
            "tagSlug": "permission-groups",
            "endpointSlug": "list-permission-groups",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "delivery-performance"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-delivery-performance",
            "label": "Analyze Delivery Performance"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "oee"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-oee",
            "label": "Analyze OEE"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "oee-trend"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-oee-trend",
            "label": "Analyze OEE trend"
        },
        {
            "domain": "core",
            "segments": [
                "analytics",
                "schedule-attainment"
            ],
            "tagSlug": "analytics",
            "endpointSlug": "analyze-schedule-attainment",
            "label": "Analyze Schedule Attainment"
        }
    ],
    "1.0.forge-preview.1": [
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "create-api-key",
            "label": "Create"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "list-api-keys",
            "label": "List"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "retrieve-api-key",
            "label": "Retrieve"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "revoke-api-key",
            "label": "Delete"
        },
        {
            "domain": "auth",
            "segments": [
                "api-keys"
            ],
            "tagSlug": "api-key-management",
            "endpointSlug": "rotate-api-key",
            "label": "Rotate API Key"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "create-sandbox",
            "label": "Create"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "list-sandboxes",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "retrieve-sandbox",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "sandboxes"
            ],
            "tagSlug": "sandbox-management",
            "endpointSlug": "delete-sandbox",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log-management",
            "endpointSlug": "list-request-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "request-logs"
            ],
            "tagSlug": "request-log-management",
            "endpointSlug": "retrieve-request-log",
            "label": "Retrieve"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "list-audit-events",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events",
                "resource-types"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "list-audit-event-resource-types",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "audit-events"
            ],
            "tagSlug": "audit-event-management",
            "endpointSlug": "retrieve-audit-event",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "create-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "update-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "list-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "retrieve-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "units"
            ],
            "tagSlug": "units-management",
            "endpointSlug": "delete-unit",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "create-unit-group",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "update-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "list-unit-groups",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "retrieve-unit-group",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "delete-unit-group",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "create-unit-group-associated-unit",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "update-unit-group-associated-unit",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "list-unit-group-units",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "retrieve-unit-group-unit",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "unit-groups",
                "units"
            ],
            "tagSlug": "unit-groups-management",
            "endpointSlug": "delete-unit-group-associated-unit",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "create-account-group",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "update-account-group",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "list-account-groups",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "retrieve-account-group",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "account-groups"
            ],
            "tagSlug": "account-groups",
            "endpointSlug": "delete-account-group",
            "label": "Delete"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "create-payment-term",
            "label": "Create"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "update-payment-term",
            "label": "Update"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "list-payment-terms",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "retrieve-payment-term",
            "label": "Retrieve"
        },
        {
            "domain": "finance",
            "segments": [
                "payment-terms"
            ],
            "tagSlug": "payment-terms-management",
            "endpointSlug": "delete-payment-term",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "create-shipping-term",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "update-shipping-term",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "list-shipping-terms",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "retrieve-shipping-term",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "shipping-terms"
            ],
            "tagSlug": "shipping-terms-management",
            "endpointSlug": "delete-shipping-term",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "create-address",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "update-address",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "list-addresses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "retrieve-address",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-management",
            "endpointSlug": "delete-address",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "addresses",
                "suggestions"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "list-address-suggestions",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "addresses"
            ],
            "tagSlug": "address-validation",
            "endpointSlug": "validate-address",
            "label": "Validate Address"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "list-account-statuses",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "account-statuses"
            ],
            "tagSlug": "account-statuses",
            "endpointSlug": "retrieve-account-status",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "create-account-user",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "update-account-user",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "list-account-users",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "retrieve-account-user",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "activate-account-user",
            "label": "Activate Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "disable-account-user",
            "label": "Disable Account User"
        },
        {
            "domain": "identity",
            "segments": [
                "account-users"
            ],
            "tagSlug": "account-users-management",
            "endpointSlug": "remove-account-user",
            "label": "Remove Account User"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "create-property",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "update-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "list-properties",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "retrieve-property",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "delete-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "create-attribute",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "update-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "list-attributes",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "retrieve-attribute",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "properties",
                "attributes"
            ],
            "tagSlug": "properties-management",
            "endpointSlug": "delete-attribute",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "list-priorities",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "priorities"
            ],
            "tagSlug": "priorities",
            "endpointSlug": "retrieve-priority",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "create-carrier",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "update-carrier",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "list-carriers",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "retrieve-carrier",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers"
            ],
            "tagSlug": "carriers-management",
            "endpointSlug": "delete-carrier",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "create-service-level",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "update-service-level",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "list-service-levels",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "retrieve-service-level",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "carriers",
                "service-levels"
            ],
            "tagSlug": "service-levels-management",
            "endpointSlug": "delete-service-level",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "list-items",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "retrieve-item",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "add-item-attribute",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "category"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "change-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "inventory"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "retrieve-item-inventory",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "items",
                "attributes"
            ],
            "tagSlug": "items-management",
            "endpointSlug": "remove-item-attribute",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "create-item-category",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "update-item-category",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "list-item-categories",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "retrieve-item-category",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "delete-item-category",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "add-item-category-property",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "unit-groups"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "change-item-category-unit-group",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "item-categories",
                "properties"
            ],
            "tagSlug": "item-categories-management",
            "endpointSlug": "remove-item-category-property",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "create-material",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "update-material",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "list-materials",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "retrieve-material",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "materials"
            ],
            "tagSlug": "materials-management",
            "endpointSlug": "delete-material",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "create-part",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "update-part",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "list-parts",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "retrieve-part",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "parts"
            ],
            "tagSlug": "parts-management",
            "endpointSlug": "delete-part",
            "label": "Delete"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "list-email-logs",
            "label": "List"
        },
        {
            "domain": "core",
            "segments": [
                "email-logs"
            ],
            "tagSlug": "email-logs",
            "endpointSlug": "retrieve-email-log",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "create-customer",
            "label": "Create"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "update-customer",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "list-customers",
            "label": "List"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "retrieve-customer",
            "label": "Retrieve"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "delete-customer",
            "label": "Delete"
        },
        {
            "domain": "sales",
            "segments": [
                "customers"
            ],
            "tagSlug": "customers",
            "endpointSlug": "merge-customers",
            "label": "Merge Customers"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "create-product-line",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "update-product-line",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "list-product-lines",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "retrieve-product-line",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "product-lines"
            ],
            "tagSlug": "product-lines-management",
            "endpointSlug": "delete-product-line",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "create-product",
            "label": "Create"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "update-product",
            "label": "Update"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "list-products",
            "label": "List"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "retrieve-product",
            "label": "Retrieve"
        },
        {
            "domain": "catalog",
            "segments": [
                "products"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "delete-product",
            "label": "Delete"
        },
        {
            "domain": "catalog",
            "segments": [
                "products",
                "product-line"
            ],
            "tagSlug": "products-management",
            "endpointSlug": "change-product-product-line",
            "label": "Update"
        },
        {
            "domain": "sales",
            "segments": [
                "sales-orders",
                "statuses"
            ],
            "tagSlug": "sales-order-statuses",
            "endpointSlug": "list-sales-order-statuses",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "adjustment-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-adjustment-types",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-methods"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-methods",
            "label": "List"
        },
        {
            "domain": "finance",
            "segments": [
                "transaction-types"
            ],
            "tagSlug": "transactions",
            "endpointSlug": "list-transaction-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "create-location",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "update-location",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "list-location-types",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "list-locations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "location-types"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "retrieve-location-type",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "retrieve-location",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "locations"
            ],
            "tagSlug": "location-management",
            "endpointSlug": "delete-location",
            "label": "Delete"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "create-scanning-station",
            "label": "Create"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "update-scanning-station",
            "label": "Update"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "list-scanning-stations",
            "label": "List"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "retrieve-scanning-station",
            "label": "Retrieve"
        },
        {
            "domain": "operations",
            "segments": [
                "scanning-stations"
            ],
            "tagSlug": "scanning-stations-management",
            "endpointSlug": "delete-scanning-station",
            "label": "Delete"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "create-role",
            "label": "Create"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "update-role",
            "label": "Update"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "list-roles",
            "label": "List"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "retrieve-role",
            "label": "Retrieve"
        },
        {
            "domain": "identity",
            "segments": [
                "roles"
            ],
            "tagSlug": "roles",
            "endpointSlug": "delete-role",
            "label": "Delete"
        }
    ]
};

export const apiObjectNavEntriesByVersion: Record<string, ApiObjectNavEntry[]> = {
    "1.0.forge-preview.4": [
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-group",
            "label": "Account Groups"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-price",
            "label": "Account Prices"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-status",
            "label": "Account Statuses"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "account-user",
            "label": "Account Users"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "address",
            "label": "Address"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-definition",
            "label": "Agent"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-memory",
            "label": "Agent Memories"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-run",
            "label": "Agent Runs"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "announcement",
            "label": "Announcements"
        },
        {
            "domain": "auth",
            "domainLabel": "Auth",
            "slug": "api-key",
            "label": "API Key"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "audit-event",
            "label": "Audit Event"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "carrier",
            "label": "Carriers"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "conversation",
            "label": "Conversations"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "customer",
            "label": "Customers"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "demand-override",
            "label": "Demand Overrides"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "department",
            "label": "Departments"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "email-domain",
            "label": "Email Domains"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "email-inbox",
            "label": "Email Inboxes"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "email-log",
            "label": "Email Logs"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "inventory-change-log",
            "label": "Inventory Change Logs"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item-category",
            "label": "Item Categories"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item",
            "label": "Items"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "job",
            "label": "Jobs"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "location-type",
            "label": "Location"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "machine-downtime-event",
            "label": "Machine Downtime"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "machine",
            "label": "Machines"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "material",
            "label": "Materials"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "list",
            "label": "Messages"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "messaging-group",
            "label": "Messaging Groups"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "notification",
            "label": "Notifications"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "operating-calendar",
            "label": "Operating Calendars"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "order-discount",
            "label": "Order Discounts"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "part",
            "label": "Parts"
        },
        {
            "domain": "finance",
            "domainLabel": "Finance",
            "slug": "payment-term",
            "label": "Payment Terms"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "pick",
            "label": "Picks"
        },
        {
            "domain": "settings",
            "domainLabel": "Settings",
            "slug": "portal-domain",
            "label": "Portal Domains"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "priority",
            "label": "Priorities"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product-line",
            "label": "Product Lines"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "production-schedule",
            "label": "Production Schedules"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product",
            "label": "Products"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "property",
            "label": "Properties"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "request-log",
            "label": "Request Log"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "role",
            "label": "Roles"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "sales-order",
            "label": "Sales Orders"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "sandbox",
            "label": "Sandbox"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "scanning-station",
            "label": "Scanning Stations"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "service-level",
            "label": "Service Levels"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "shipping-term",
            "label": "Shipping Terms"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit-group",
            "label": "Unit Groups"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit",
            "label": "Units"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "volume-discount",
            "label": "Volume Discounts"
        }
    ],
    "1.0.forge-preview.3": [
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-group",
            "label": "Account Groups"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-price",
            "label": "Account Prices"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-status",
            "label": "Account Statuses"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "account-user",
            "label": "Account Users"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "address",
            "label": "Address"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-definition",
            "label": "Agent"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-memory",
            "label": "Agent Memories"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-run",
            "label": "Agent Runs"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "announcement",
            "label": "Announcements"
        },
        {
            "domain": "auth",
            "domainLabel": "Auth",
            "slug": "api-key",
            "label": "API Key"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "audit-event",
            "label": "Audit Event"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "carrier",
            "label": "Carriers"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "conversation",
            "label": "Conversations"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "customer",
            "label": "Customers"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "demand-override",
            "label": "Demand Overrides"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "department",
            "label": "Departments"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "email-domain",
            "label": "Email Domains"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "email-inbox",
            "label": "Email Inboxes"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "email-log",
            "label": "Email Logs"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item-category",
            "label": "Item Categories"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item",
            "label": "Items"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "job",
            "label": "Jobs"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "location-type",
            "label": "Location"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "machine-downtime-event",
            "label": "Machine Downtime"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "machine",
            "label": "Machines"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "material",
            "label": "Materials"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "list",
            "label": "Messages"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "messaging-group",
            "label": "Messaging Groups"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "notification",
            "label": "Notifications"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "operating-calendar",
            "label": "Operating Calendars"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "order-discount",
            "label": "Order Discounts"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "part",
            "label": "Parts"
        },
        {
            "domain": "finance",
            "domainLabel": "Finance",
            "slug": "payment-term",
            "label": "Payment Terms"
        },
        {
            "domain": "settings",
            "domainLabel": "Settings",
            "slug": "portal-domain",
            "label": "Portal Domains"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "priority",
            "label": "Priorities"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product-line",
            "label": "Product Lines"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "production-schedule",
            "label": "Production Schedules"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product",
            "label": "Products"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "property",
            "label": "Properties"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "request-log",
            "label": "Request Log"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "role",
            "label": "Roles"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "sales-order",
            "label": "Sales Orders"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "sandbox",
            "label": "Sandbox"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "scanning-station",
            "label": "Scanning Stations"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "service-level",
            "label": "Service Levels"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "shipping-term",
            "label": "Shipping Terms"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit-group",
            "label": "Unit Groups"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit",
            "label": "Units"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "volume-discount",
            "label": "Volume Discounts"
        }
    ],
    "1.0.forge-preview.2": [
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-group",
            "label": "Account Groups"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-status",
            "label": "Account Statuses"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "account-user",
            "label": "Account Users"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "address",
            "label": "Address"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-definition",
            "label": "Agent"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-memory",
            "label": "Agent Memories"
        },
        {
            "domain": "ai",
            "domainLabel": "AI",
            "slug": "agent-run",
            "label": "Agent Runs"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "announcement",
            "label": "Announcements"
        },
        {
            "domain": "auth",
            "domainLabel": "Auth",
            "slug": "api-key",
            "label": "API Key"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "audit-event",
            "label": "Audit Event"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "carrier",
            "label": "Carriers"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "conversation",
            "label": "Conversations"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "customer",
            "label": "Customers"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "demand-override",
            "label": "Demand Overrides"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "department",
            "label": "Departments"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "email-domain",
            "label": "Email Domains"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "email-inbox",
            "label": "Email Inboxes"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "email-log",
            "label": "Email Logs"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item-category",
            "label": "Item Categories"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item",
            "label": "Items"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "job",
            "label": "Jobs"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "location-type",
            "label": "Location"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "machine-downtime-event",
            "label": "Machine Downtime"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "machine",
            "label": "Machines"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "material",
            "label": "Materials"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "list",
            "label": "Messages"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "messaging-group",
            "label": "Messaging Groups"
        },
        {
            "domain": "messaging",
            "domainLabel": "Messaging",
            "slug": "notification",
            "label": "Notifications"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "part",
            "label": "Parts"
        },
        {
            "domain": "finance",
            "domainLabel": "Finance",
            "slug": "payment-term",
            "label": "Payment Terms"
        },
        {
            "domain": "settings",
            "domainLabel": "Settings",
            "slug": "portal-domain",
            "label": "Portal Domains"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "priority",
            "label": "Priorities"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product-line",
            "label": "Product Lines"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "production-schedule",
            "label": "Production Schedules"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product",
            "label": "Products"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "property",
            "label": "Properties"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "request-log",
            "label": "Request Log"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "role",
            "label": "Roles"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "sales-order",
            "label": "Sales Orders"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "sandbox",
            "label": "Sandbox"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "scanning-station",
            "label": "Scanning Stations"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "service-level",
            "label": "Service Levels"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "shipping-term",
            "label": "Shipping Terms"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit-group",
            "label": "Unit Groups"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit",
            "label": "Units"
        }
    ],
    "1.0.forge-preview.1": [
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-group",
            "label": "Account Groups"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "account-status",
            "label": "Account Statuses"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "account-user",
            "label": "Account Users Management"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "address",
            "label": "Address Management"
        },
        {
            "domain": "auth",
            "domainLabel": "Auth",
            "slug": "api-key",
            "label": "API Key Management"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "audit-event",
            "label": "Audit Event Management"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "carrier",
            "label": "Carriers Management"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "customer",
            "label": "Customers"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "email-log",
            "label": "Email Logs"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item-category",
            "label": "Item Categories Management"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "item",
            "label": "Items Management"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "location-type",
            "label": "Location Management"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "material",
            "label": "Materials Management"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "part",
            "label": "Parts Management"
        },
        {
            "domain": "finance",
            "domainLabel": "Finance",
            "slug": "payment-term",
            "label": "Payment Terms Management"
        },
        {
            "domain": "sales",
            "domainLabel": "Sales",
            "slug": "priority",
            "label": "Priorities"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product-line",
            "label": "Product Lines Management"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "product",
            "label": "Products Management"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "property",
            "label": "Properties Management"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "request-log",
            "label": "Request Log Management"
        },
        {
            "domain": "identity",
            "domainLabel": "Identity",
            "slug": "role",
            "label": "Roles"
        },
        {
            "domain": "core",
            "domainLabel": "Core",
            "slug": "sandbox",
            "label": "Sandbox Management"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "scanning-station",
            "label": "Scanning Stations Management"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "service-level",
            "label": "Service Levels Management"
        },
        {
            "domain": "operations",
            "domainLabel": "Operations",
            "slug": "shipping-term",
            "label": "Shipping Terms Management"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit-group",
            "label": "Unit Groups Management"
        },
        {
            "domain": "catalog",
            "domainLabel": "Catalog",
            "slug": "unit",
            "label": "Units Management"
        }
    ]
};

export function getApiNavEntries(version: string): ApiNavEntry[] {
    return apiNavEntriesByVersion[version] ?? [];
}

export function getApiObjectNavEntries(version: string): ApiObjectNavEntry[] {
    return apiObjectNavEntriesByVersion[version] ?? [];
}
