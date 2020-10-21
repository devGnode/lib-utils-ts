import { properties, Set } from "../Interface";
import { OutputStreamWriter, InputStreamReader } from "./IOStream";
import { HashMap } from "../List";
/***
 * Properties class, exportable :
 *   interface properties<V> extends IProperties<string,V>
 *  + AbstractProperties<V> implements properties<V>
 *
 *  + PropertiesA<V> extends AbstractProperties<V>
 *
 *  + Properties extends AbstractProperties<Object>
 *
 *  + PropertiesJson extends AbstractProperties<Object>
 *
 *  let prop : Properties = new Properties();
 *  prop.load(new FileReaderA("../../path"));
 */
export declare abstract class AbstractProperties<V> implements properties<V> {
    /***
     *
     */
    protected prop: HashMap<string, V>;
    protected path: string;
    /***
     *
     */
    protected constructor();
    /***
     *
     * @param key
     * @param defaultValue
     */
    getProperty(key: string, defaultValue?: V): V;
    /***
     *
     * @param key
     * @param value
     */
    setProperty(key: string, value: V): void;
    /***
     * containsKey
     * @param key
     */
    hasKey(key: string): boolean;
    /***
     *
     */
    stringPropertiesName(): Set<string>;
    /***
     * This method doesnt't support this annotation :
     *  prop=foo \
     *      bar
     *
     * Throw :
     *  - NullPointerException
     *  - IOException
     * @param input
     */
    load(input: InputStreamReader): void;
    /***
     *
     */
    store(output: OutputStreamWriter): void;
    /***
     * Update properties before use this method, call load method.
     * This method are throwable :
     *  - NullPointerException
     *  - IOException
     */
    update(): void;
}
/***
 *
 */
export declare class PropertiesA<V> extends AbstractProperties<V> {
    constructor();
}
/***
 *
 */
export declare class Properties extends AbstractProperties<Object> {
    constructor();
}
/**
 *
 *
 * */
export declare class PropertiesJson extends AbstractProperties<Object> {
    /***
     *
     */
    constructor();
    /***
     * Throw :
     *  - NullPointerException
     *  - IOException
     *  - JSONException
     * @param input
     */
    load(input: InputStreamReader): void;
    /***
     *
     */
    store(output: OutputStreamWriter): void;
    /***
     * As Json properties file doesn't support comment
     * just make a store
     */
    update(): void;
}
