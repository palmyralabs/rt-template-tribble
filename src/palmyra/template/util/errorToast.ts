import { APIErrorHandlerFactory, ErrorHandler } from "@palmyralabs/palmyra-wire";
import { topic } from "@palmyralabs/ts-utils";

export const API_ERROR_TOPIC = "palmyra/api-error";

export interface ApiErrorInfo {
    status?: number;
    message: string;
    raw: any;
}

export interface CreateErrorHandlerFactoryOpts {
    notify?: (info: ApiErrorInfo) => void;
    publishTopic?: boolean;
    ignoreStatuses?: number[];
    dedupeMs?: number;
    formatMessage?: (raw: any) => string;
}

const defaultFormat = (raw: any): string => {
    if (!raw) return "Unknown error";
    if (typeof raw === "string") return raw;
    if (raw.body?.message) return String(raw.body.message);
    if (raw.message && typeof raw.message === "string") return raw.message;
    if (raw.status) return `Request failed (HTTP ${raw.status})`;
    return "Request failed";
};

export const createErrorHandlerFactory = (
    opts: CreateErrorHandlerFactoryOpts = {}
): APIErrorHandlerFactory => {
    const {
        notify,
        publishTopic = true,
        ignoreStatuses = [],
        dedupeMs = 3000,
        formatMessage = defaultFormat,
    } = opts;
    const recent = new Map<string, number>();

    return (_config?: any): ErrorHandler => {
        return (error: any): boolean => {
            const status = error?.status ?? error?.response?.status;
            if (status != null && ignoreStatuses.includes(status)) return false;

            const message = formatMessage(error);
            const now = Date.now();
            const key = `${status ?? "-"}::${message}`;
            const last = recent.get(key);
            if (last && now - last < dedupeMs) return false;
            recent.set(key, now);

            const info: ApiErrorInfo = { status, message, raw: error };
            try { notify?.(info); } catch {  }
            if (publishTopic) {
                try { topic.publish(API_ERROR_TOPIC, info); } catch { }
            }
            return false;
        };
    };
};
