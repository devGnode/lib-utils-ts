/***
 * Exception Area
 */
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
