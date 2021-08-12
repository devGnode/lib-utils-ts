import { List, predicateFn, properties, Set} from "../Interface";
import {FileReader, FileWriter, OutputStreamWriter,InputStreamReader} from "./IOStream";
import {Define} from "../Define";
import {JSONException, NullPointerException} from "../Exception";
/***@toFix*/
//import { HashMap} from "../List";
import {Iterator} from "../Iterator";
import "../globalUtils";
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
    protected prop : /*HashMap<string, V>*/any = null//new HashMap({});
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
     *
     * Throw :
     *  - NullPointerException
     *  - IOException
     * @param input
     */
    public load( input : InputStreamReader ) : void{
        Define.of(input).orElseThrow(new NullPointerException("target is null !"));
        let chunk:string = null,chunkKey:string,push:boolean=false;

        /***@toFix*/
        this.prop = null; // new HashMap({});
        this.path = input.getPath();
        input.getLines()
            .stream()
            .filter(value=>!value.contains(/^\t*\s*(\#|\!)/))
            .each(value=>{
                if(chunk===null)
                value.regExp(/\t*\s*([\w\d\_\-\:\.]{1,})\t*\s*\=\t*\s*([^\r\n]*)/,(dummy,value)=>{

                    if( String(value[2]).stripSlashes().contains(/\s{1,}\\\t*\s*$/) ){
                        chunkKey = value[1];
                        chunk = String(value[2]).replace(/\\$|^\s*\t*/g,"");
                    }else
                    this.prop.put(value[1],value[2]);
                    return "";
                });
                else if(chunk!==null&&!push){

                    if( !String(value).stripSlashes().contains(/\s{1,}\\\t*\s*$/) )push=true;
                    chunk += value.replace(/\\$|^\s*\t*/g,"");
                    if(push) {
                        this.prop.put(chunkKey,<any>chunk);
                        chunkKey=chunk=null;push=false;
                    }
                }
            });
    }
    /***
     *
     */
    public store( output: OutputStreamWriter ): void{
        let out:string="";
        this.prop.stream().each((value,key)=>{out+= `${key}=${value}\n`;});
        output.write(out,false,"utf8",true);
    }
    /***
     * Update properties before use this method, call load method.
     * This method are throwable :
     *  - NullPointerException
     *  - IOException
     */
    public update( ) :void{
        Define.of(this.path).orElseThrow(new NullPointerException("path is null !"));
        let file : List<string> = new FileReader(this.path).getLines(),
            /***@toFix*/
            itr : Iterator<string> = <Iterator<string>>this.prop.keySet().iterator(),
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

    public merge<T extends V,Object>( properties:AbstractProperties<V>,  exclude: predicateFn<T> = null ):void{
        /***@toFix*/
        let key:Iterator<string> = <Iterator<string>>properties.stringPropertiesName().iterator(),
            value:string, pass:boolean=false,dexclude:Define<predicateFn<T>> = Define.of(exclude);
        while( key.hasNext() ){
            value = key.next();
            if(dexclude.isNull()||(!dexclude.isNull()&&dexclude.get().call(null,value)))pass=true;
            if(pass)this.setProperty(value,properties.getProperty(value));
            pass=false;
        }
    }
}
/***
 *  if you want declare yourself your generic type for your
 *  properties file, Properties class have a `Object` type
 */
export class PropertiesA<V> extends AbstractProperties<V>{constructor() {super();}}
/***
 *
 */
export class Properties extends AbstractProperties<Object>{constructor() {super();}}
/**
 *
 *
 * */
export class PropertiesJson extends AbstractProperties<Object>{
    /***
     *
     */
    private truncate:boolean = false;
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
        try{this.prop = /*new HashMap<string, Object>*/(JSON.parse(input.toString()));}catch (e) {
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
        output.write("{\n%s\n}".format(out.replace(/,\n*$/,"")),this.truncate);
        this.truncate=false;
    }
    /***
     * As Json properties file doesn't support comment
     * just make a store with truncate file
     */
    public update( ) :void{ this.truncate=true; this.store(new FileWriter(this.path));}
}