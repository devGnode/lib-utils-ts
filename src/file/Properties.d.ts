import { properties, Set } from "../Interface";
import { OutputStreamWriter, InputStreamReader } from "./IOStream";
import { HashMap } from "../List";
import "../globalUtils";
export declare abstract class AbstractProperties<V> implements properties<V> {
    protected prop: HashMap<string, V>;
    protected path: string;
    protected constructor();
    getProperty(key: string, defaultValue?: V): V;
    setProperty(key: string, value: V): void;
    hasKey(key: string): boolean;
    stringPropertiesName(): Set<string>;
    load(input: InputStreamReader): void;
    store(output: OutputStreamWriter): void;
    update(): void;
}
export declare class PropertiesA<V> extends AbstractProperties<V> {
    constructor();
}
export declare class Properties extends AbstractProperties<Object> {
    constructor();
}
export declare class PropertiesJson extends AbstractProperties<Object> {
    private truncate;
    constructor();
    load(input: InputStreamReader): void;
    store(output: OutputStreamWriter): void;
    update(): void;
}
