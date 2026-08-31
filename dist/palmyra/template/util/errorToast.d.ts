import { APIErrorHandlerFactory } from '@palmyralabs/palmyra-wire';
export declare const API_ERROR_TOPIC = "palmyra/api-error";
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
export declare const createErrorHandlerFactory: (opts?: CreateErrorHandlerFactoryOpts) => APIErrorHandlerFactory;
