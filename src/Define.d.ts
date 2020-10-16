/***
 *
 */
import { IDefine } from "./Interface";
/***
 *
 */
export declare class Define<T> implements IDefine<T> {
    /***
     *
     */
    private readonly value;
    /***
     *
     * @param value
     */
    constructor(value: T);
    /***
     *
     */
    isNullable(): boolean;
    /***
     *
     */
    isNull(): boolean;
    /***
     *
     * @param value
     */
    orNull(value: T): T;
    /***
     *
     * @param exception
     */
    orElseThrow(exception: Error | TypeError): T;
    /***
     *
     */
    getType(): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    /***
     *
     */
    valueOf(): T;
    /***
     *
     */
    toString(): string;
    /***
     *
     * @param value
     */
    static of<T>(value: T): Define<T>;
}
