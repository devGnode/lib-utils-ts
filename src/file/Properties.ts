import {iterator, MapEntries, predicateFn, properties, Set} from "../Interface";
import {Define} from "../Define";
import {IllegalArgumentException,  NullPointerException} from "../Exception";
import {Iterator} from "../utils/Iterator";
import {HashMap} from "../utils/HashMap";
import {InputStreamReader} from "./InputStreamReader";
import {Reader} from "./Reader";
import {Objects} from "../type/Objects";
import {Optional} from "../utils/Optional";
import {PrintStream} from "./PrintStream";
import {PrintWriter} from "./PrintWriter";
import {OutputStream} from "./OutputStream";
import * as os from "os";

class LineReader {

    private readonly ins:InputStreamReader;
    private readonly reader:Reader;

    public line:string[] = [];

    constructor(value:InputStreamReader|Reader) {
        if(value instanceof InputStreamReader ) this.ins = value;
        else{
            this.reader = value;
        }
    }
    /***
     * @returns {number}
     */
    public getLine():number{
        let tmp:string = "",

            reader:Reader = this.reader? this.reader : this.ins,
            skipWhiteSpace:boolean = true,
            isComment:boolean = false,
            isBackSlash:boolean = false,
            i:number = 0;

        this.line = [];

        while( true ){
            // read next byte
            try {tmp = String.fromCharCode(reader.read());}catch (e) {
                if(this.line.length>0)return this.line.length;
                return -1;
            }

            // white space
            if(skipWhiteSpace) {
                if(tmp==" "||tmp=="\t"||tmp=="\f") continue;
                if(isBackSlash&&(tmp == '\r' || tmp == '\n')) continue;
                skipWhiteSpace = false;
            }
            // skip comment
            if(tmp == "#" || tmp == "\!"){
                isComment=true;
                continue;
            }
            if(isComment&&tmp!="\n") continue;

            if(tmp!="\r"&&tmp!=="\n"){
                if(tmp!="\\")isBackSlash = false;
                else{
                    isBackSlash = skipWhiteSpace = true;
                    continue;
                }
                this.line[i++] = tmp;

            }else{
                if(isComment) {
                    isComment      = false;
                    skipWhiteSpace = true;
                    i = 0;
                }else{
                    if(i==0) skipWhiteSpace=true;
                    if(i>0)return i;
                }
            }

        }
    }
}

export abstract class AbstractProperties implements properties{
    /***
     *
     */
    protected prop : HashMap<string, Object> = new HashMap();
    protected path : string;
    /**
     * @type {string}
     */
    private readonly lineSeparator:string = os.EOL;
    /***
     *
     */
    protected constructor() {}
    /***
     * @Throw NullPointerException - when key value is null.
     * @param key
     * @param defaultValue
     */
    public getProperty(key: string, defaultValue?: Object):Object {
        return Optional
            .ofNullable(this.prop.get(Objects.requireNotNull(key)))
            .orElse(defaultValue);
    }
    /***
     * @Throw NullPointerException - when key value is null.
     * @param key
     * @param value
     */
    public setProperty(key: string, value: Object ): void {
        this.prop.put(Objects.requireNotNull(key),value);
    }
    /***
     * @containsKey
     * @param key
     */
    public hasKey( key: string ):boolean{return this.prop.keySet().contains(key);}
    /***
     *
     */
    public stringPropertiesName( ) : Set<string>{return this.prop.keySet();}
    /***
     *
     * @Throws NullPointerException - when InputStreamReader is null
     *         IOException
     *         IllegalArgumentException - wrong quote into string
     * @param input
     */
    public load( input : InputStreamReader ) : void{
        Objects.requireNotNull(input);
        this.prop = new HashMap();

        let lineReader:LineReader = new LineReader(input),
            sz:number,i:number = 0,
            skipWhiteSpace:boolean = true,
            grow:boolean,hasKey:boolean = false,
            key:string = null, value:string = null,
            chr:string;

        while ( (sz = lineReader.getLine()) >= 0 ){
            i       = 0;
            hasKey  = false;
            key     = "";
            value   = "";
            while( ( i < sz && (chr = lineReader.line[i]) ) ) {
                grow = true;
                if(skipWhiteSpace){
                    if((chr==" "||chr=="\t"||chr=="\f"))grow=false;
                    else
                    skipWhiteSpace = false;
                }
                if(!hasKey&&chr=="="){
                    skipWhiteSpace = hasKey = true;
                    grow = false;
                }
                // key
                if(!hasKey&&chr!=" ") key += chr;
                // value
                if(hasKey&&grow)value+=chr;
                i++;
            }

            i = 0;
            let prohibited:string,
                strParsed:string  = null;
            while((chr = value[i])){

                grow=true;
                if(( i==0&&(chr!="'"&&chr!="\"") ) || ( !value[i+1] &&(chr=="'"||chr=="\"") )) break;
                else if(i==0&&(chr=="'"||chr=="\"")){
                    strParsed = "";
                    prohibited = chr;
                    grow = false;
                }

                if( grow && prohibited && chr === prohibited && (chr!="\'"&&chr!="\"")  ){
                    throw new IllegalArgumentException(`Bad quoted string [${prohibited}] for '${key}' property.`);
                }
                else if(grow){
                    strParsed += chr;
                }

                i++;
            }

            this.prop.put(key,strParsed!=null ? strParsed : value );
        }
    }
    /***
     *
     * @param {PrintStream | PrintWriter} writer
     */
    public list(writer:PrintStream|PrintWriter):void{
        let itr: iterator<MapEntries<string,Object>>,
            entry:MapEntries<string,Object>, value:string;

        Objects.requireNotNull(writer);
        itr = this.prop.entrySet().iterator();
        writer.println('======== Properties listing ========');
        while( itr.hasNext() ){

            entry = itr.next();
            value = <string>Optional
                .ofNullable(entry.getValue())
                .orElse("");

            if(value.length>40){
                value = value.substr(0,37)+`... and more(s) ${value.length-40}`;
            }
           writer.println(entry.getKey()+"="+value );
        }
        writer.println('======== End of properties listing ========');
        writer.close();

    }
    /***
     *  @remove
     *  @param
     *
     */
    public remove(key:string):Object{
        return this.prop.remove(key);
    }
    /***
     *
     */
    public store( output: OutputStream ): void{
        let out:string="", next:MapEntries<string, Object>,
            itr: iterator<MapEntries<string, Object>>;

        output.write(`# ${new Date().toISOString()}\r\n`);
        itr = this.prop.entrySet().iterator();
        while (itr.hasNext()){
            next = itr.next();
            output.write(`${next.getKey()}=${next.getValue().toString()}${this.lineSeparator}`);
        }
        output.close();
    }

    public merge<T,Object>( properties:AbstractProperties,  exclude: predicateFn<T> = null ):void{
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
 *
 */
export class Properties extends AbstractProperties{constructor() {super();}}
Object.package(this);
/**
 *
 *
 * */
export class PropertiesJson extends AbstractProperties{
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
        //this.path = input.getPath();
        try{this.prop = HashMap.of<string, Object>(JSON.parse(input.toString()));}catch (e) {
            //throw new JSONException(`Wrong parsing file : ${input.getPath()}`);
        }
    }
    /***
     *
     */
    public store( output: OutputStream ): void{
        Objects.requireNotNull(output,"target output stream is null !");
        let out:string="", itr: iterator<MapEntries<string, Object>> = this.prop.entrySet().iterator(),
            next:MapEntries<string, Object>;
        while (itr.hasNext()){
            next = itr.next();
            out+= `${next.getKey()}=${next.getValue().toString()}\n`;
        }
        //output.write("{\n%s\n}".format(out.replace(/,\n*$/,"")),this.truncate);
        this.truncate=false;
    }
    /***
     * As Json properties file doesn't support comment
     * just make a store with truncate file
     */
    //public update( ) :void{ this.truncate=true; this.store(new FileWriter(this.path));}
}