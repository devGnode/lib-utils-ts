import { IDefine } from "./Interface";
export declare class Define<T> implements IDefine<T> {
    private readonly value;
    constructor(value: T);
    isNullable(): boolean;
    isNull(): boolean;
    orNull(value: T): T;
    orElseThrow(exception: Error | TypeError): T;
    getType(): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    valueOf(): T;
    toString(): string;
    static of<T>(value: T): Define<T>;
}
