import { API_VERSION } from '@/static/apiVersion.generated';

export function ApiVersion() {
    return <code>{API_VERSION.current}</code>;
}
