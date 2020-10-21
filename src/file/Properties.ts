import { List, properties, Set} from "../Interface";
import {FileReaderA, FileWriter, OutputStreamWriter,InputStreamReader} from "./IOStream";
import {Define} from "../Define";
import {JSONException, NullPointerException} from "../Exception";
import { HashMap} from "../List";
import {Iterator} from "../Iterator";
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
export abstract class AbstractProperties<V> implements properties<V>{
    /***
     *
     */
    protected prop : HashMap<string, V> = new HashMap({});
    protected path : string;
    /***
     *
     */
    protected constructor() {}
    /***
     *
     * @param key
     * @param defaultValue
     */
    public getProperty(key: string, defaultValue?: V): V {
        Define.of(key).orElseThrow(new NullPointerException("key value is null !"));
        return Define.of<V>(this.prop.get(key)).orNull(defaultValue);
    }
    /***
     *
     * @param key
     * @param value
     */
    public setProperty(key: string, value: V ): void {
        Define.of(key).orElseThrow(new NullPointerException("key value is null !"));
        this.prop.put(key,value);
    }
    /***
     * containsKey
     * @param key
     */
    public hasKey( key: string ):boolean{return this.prop.keySet().contains(<Object>key);}
    /***
     *
     */
    public stringPropertiesName( ) : Set<string>{return this.prop.keySet();}
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
    public load( input : InputStreamReader ) : void{
        Define.of(input).orElseThrow(new NullPointerException("target is null !"));
        let chunk:string;
        this.path = input.getPath();
        input.getLines()
            .stream()
            .filter(value=>!value.contains(/^\s*(\#|\!)/))
            .each(value=>{
                value.regExp(/\s*([\w\d\_\-\:\.]{1,})\=\s*([^\r\n]*)/,(dummy,value)=>{
                    console.log(String(value[2]).stripSlashes());
                    if( String(value[2]).stripSlashes().contains(/\s*\\$/) ){
                        chunk = String(value[2]).replace(/\\$/,"");
                    }
                    this.prop.put(value[1],value[2]);
                    return "";
                });
            });
        console.log(this.prop);
    }
    /***
     *
     */
    public store( output: OutputStreamWriter ): void{
        let out:string="";
        this.prop.stream().each((value,key)=>{out+= `${key}=${value}\n`;});
        output.write(out,false);
    }
    /***
     * Update properties before use this method, call load method.
     * This method are throwable :
     *  - NullPointerException
     *  - IOException
     */
    public update( ) :void{
        Define.of(this.path).orElseThrow(new NullPointerException("path is null !"));
        let file : List<string> = new FileReaderA(this.path).getLines(),
            itr : Iterator<string> = this.prop.keySet().iterator(),
            str:string,found:boolean=false;

        while(itr.hasNext()){
            str=itr.next();
            file.stream().each((value,key) => {
                if(value.contains(new RegExp(`^\s*${str}\s*`))) {
                    file.set(Number(key),`${str}=${this.getProperty(str)}`);
                    found=true;
                }
            });
            if(!found) file.add(`${str}=${this.getProperty(str)}`);
            found=false;
        }
        new FileWriter(this.path).write(file.toArray().join("\n"))
    }
}
/***
 *
 */
export class PropertiesA<V> extends AbstractProperties<V>{
    constructor() {super();}
}
/***
 *
 */
export class Properties extends AbstractProperties<Object>{
    constructor() {super();}
}
/**
 *
 *
 * */
export class PropertiesJson extends AbstractProperties<Object>{
    /***
     *
     */
    constructor() {super();}
    /***
     * Throw :
     *  - NullPointerException
     *  - IOException
     *  - JSONException
     * @param input
     */
    public load( input : InputStreamReader ) : void{
        Define.of(input).orElseThrow(new NullPointerException("target is null !"));
        this.path = input.getPath();
        try{this.prop = new HashMap<string, Object>(JSON.parse(input.toString()));}catch (e) {
            throw new JSONException(`Wrong parsing file : ${input.getPath()}`);
        }
    }
    /***
     *
     */
    public store( output: OutputStreamWriter ): void{
        let out:string="";
        Define.of(output).orElseThrow(new NullPointerException("target output stream is null !"));
        this.prop.stream().each((value,key)=>{out+= `\t"${key}":"${value}",\n`;});
        output.write("{\n%s\n}".format(out.replace(/,\n*$/,"")),false);
    }
    /***
     * As Json properties file doesn't support comment
     * just make a store
     */
    public update( ) :void{this.store(new FileWriter(this.path));}
}