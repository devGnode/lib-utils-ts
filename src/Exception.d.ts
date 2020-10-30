export declare class RuntimeException extends Error {
    name: string;
    constructor(message?: string, code?: number);
}
export declare class IndexOfBoundException extends Error {
    name: string;
    constructor(message?: string);
}
export declare class NullPointerException extends Error {
    name: string;
    constructor(message?: string);
}
export declare class NoSuchElementException extends Error {
    name: string;
    constructor(message?: string);
}
export declare class IOException extends Error {
    name: string;
    constructor(message?: string);
}
export declare class JSONException extends Error {
    name: string;
    constructor(message?: string);
}
