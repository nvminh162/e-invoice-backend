import { randomUUID } from 'crypto';

export const getProcessId = (prefix?: string) => {
    return prefix ? `${prefix}-${randomUUID()}` : randomUUID();
};
