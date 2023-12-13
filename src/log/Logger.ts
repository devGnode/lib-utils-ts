import {Constructor} from "../Constructor";
import {Objects} from "../type/Objects";
import {HashMap} from "../utils/HashMap";
import {LogLevel} from "./LogLevel";
import {UnsupportedOperationException} from "../Exception";
import {Log} from "./Global";
import {List, Map, MapEntries} from "../Interface";
import {Consumer} from "../Consumer";
import {Colorize} from "./Colorize";
import {BYTE} from "../primitives/Globals";
import {OutputStream} from "../file/OutputStream";
import {Byte} from "../primitives/Byte";
/***
 * https://github.com/devGnode/logger20js
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export abstract class Logger implements Log{
    /***
     * object configuration properties
     */
    protected readonly prop:Map<string, Object> = new HashMap();
    /***
     *
     */
    protected readonly name:string;
    /**
     * Customize pattern
     */
    protected pattern:string;
    /***
     *
     */
    protected colorized:boolean = null;
    
    private getOutputStream(consumer:Consumer<string>):OutputStream{
        return new class LoggerOutputStream extends OutputStream{
            
            constructor() {super();}
            
            write(b: number | BYTE | string | string[]): void {
                let out:string;
                if(b instanceof Byte) out = String(b.valueOf());
                else if(b instanceof Number) out = String(b);
                else if(b instanceof Array) out = b.join(" ");
                else if(typeof b === "string"){
                    out = b;
                }
                consumer.accept(out.replace(/(\n|\r\n)$/,""));
            }
            
        };
    }
    /**
     * Customize pattern
     */
    protected constructor( clazz : Constructor<Object> ) {
        this.name= clazz.getName();
        this.prop.put("package",clazz.getPackage().getName());
    }
    /**
     * @warn
     */
    public warn( message:string, ...args:Object[] ):void {
        if(this.hasLevel(LogLevel.WARN)) this.stdout(message,LogLevel.WARN, args);
    }
    
    public warnOutputStream():OutputStream{
        return this.getOutputStream(Consumer.of((value:string)=> this.warn(value)));
    }
    /**
     * @log
     */
    public log( message:string, ...args:Object[] ):void{
        if(this.hasLevel(LogLevel.LOG)) this.stdout(message,LogLevel.LOG, args);
    }

    public logOutputStream():OutputStream{
        return this.getOutputStream(Consumer.of((value:string)=> this.log(value)));
    }
    /**
     * @info
     */
    public info( message:string, ...args:Object[] ):void {
        if(this.hasLevel(LogLevel.INFO)) this.stdout(message,LogLevel.INFO, args);
    }

    public infoOutputStream():OutputStream{
        return this.getOutputStream(Consumer.of((value:string)=> this.info(value)));
    }
    /**
     * @debug
     */
    public debug( message:string, ...args:Object[] ):void {
        if(this.hasLevel(LogLevel.DEBUG)) this.stdout(message,LogLevel.DEBUG, args);
    }

    public debugOutputStream():OutputStream{
        return this.getOutputStream(Consumer.of((value:string)=> this.debug(value)));
    }
    /**
     * @error
     */
    public error( message:string, ...args:Object[] ):void {
        if(this.hasLevel(LogLevel.ERROR)) this.stdout(message,LogLevel.ERROR, args);
    }

    public errorOutputStream():OutputStream{
        return this.getOutputStream(Consumer.of((value:string)=> this.error(value)));
    }
    /**
     * @custom
     */
    public custom( message:string, ...args:Object[] ):void{
        if(this.hasLevel(LogLevel.CUSTOM)) this.stdout(message,LogLevel.CUSTOM);
    }

    public customOutputStream():OutputStream{
        return this.getOutputStream(Consumer.of((value:string)=> this.custom(value)));
    }
    /**/
    protected hasLevel(level:LogLevel):boolean{throw new UnsupportedOperationException(``);}
    /***/
    protected stdout(message:string, level:LogLevel, ... args:Object[] ):void{ throw new UnsupportedOperationException(``);}
    /***/
    protected setColorization(state:boolean):void{ this.colorized = state; }
    /***/
    protected isColorized():boolean{  return !!(this.colorized); }
    /***
     * Customize pattern for the logger
     * @param {string} pattern
     * @return {this}
     */
    public setPattern( pattern:string ):Logger{
        this.pattern = Objects.requireNotNull(pattern);
        return this;
    }
    /***
     * @param {string} key
     * @param {Object} value
     * @return {this}
     */
    public setProp( key:string, value:Object ):Logger{
        this.prop.put(Objects.requireNotNull(key),Objects.requireNotNull(value));
        return this;
    }
    /***
     *
     * @param {Object} args
     * @return {this}
     */
    public setPropObject( ...args:Object[] ):Logger{
        for(let i = 0; i < Array.from(Objects.requireNotNull(args)).length; i++)this.prop.put(String(i),args[i]);
        return this;
    }
    /***
     *
     * @param value
     * @return {any}
     */
    private round( value : any = null ){return value!=null?value.toString().length===1?"0"+value:value : null;}
    /***
     *
     * @param {string} message
     * @param {LogLevel} levelType
     * @return {String}
     */
    protected parseString( message:string = null, levelType:LogLevel = null) : String {
        let list :  List<string>,d = new Date(),
            h = this.round(d.getHours()), m = this.round(d.getMinutes()),
            s = this.round(d.getSeconds()), ss= d.getMilliseconds() ;

        try {
            // try to define the name of file in exception
            // and the line number and columns.
            list = (Error()).stack
                .replace(/\w+\:*\s*\n/, "")
                .explodeAsList(/\n|\r\n/)
                .stream()
                .filter(value => !(/Logger\.[\w]{2,}|node_modules/.test(value)))
                .findFirst()
                .orElse("nop (unknown:0:0)")
                .replace(/.+\(|\)/gi, "")
                .exec(/([^\\\/]*)$/)[1]
                .explodeAsList(":");
        }catch (e) {/*void 0*/}

        let data:HashMap<string, Object> = new HashMap();
        data.putAll(this.prop);
        data.put("type",levelType.toString());
        data.put("name",this.name);
        data.put("time",d.getTime().toString());
        data.put("T", levelType.toString());
        data.put("fileInException", list.get(0)||"");
        data.put("line", list.get(1)||"");
        data.put("column", list.get(2)||"");
        data.put("pid", process.pid);
        data.put("ppid", process.ppid);
        data.put("hours", "%s:%s:%s".format(h,m,s));
        data.put("ms", ss);
        data.put("ss", s);
        data.put("mm", m);
        data.put("HH", h);
        // replace
        data.entrySet().forEach(Consumer.of((o: MapEntries<string, Object>)=>{
            message = message.regExp(new RegExp(`\%${o.getKey()}`),()=>o.getValue().toString());
        }));

        return message;
    }

    //
    protected static readonly COLORS_REGEXP : RegExp = /(\%[a-zA-z0-9]+)\{([a-z]+|((([lewidc]+)\?[a-z]+?\;*)+?(\:[a-z]+)*)+)\}/;

    protected colorizeString( message: string = null, type:LogLevel, colorize: boolean  ) : string {
        return message.regExp( Logger.COLORS_REGEXP,function(){
            let define=null,interrupt=null, tmp:string,
                logLevel=type.toString().substring(0,1).toLowerCase();

            if(!colorize) return this[1];
            tmp = this[1];
            if( /([lewidc]{1})\?([a-z]+)?\;*/.test( this[2] ) ) {
                // try to define color by log level
                this[2].regExp(/([lewidc]{1})\?([a-z]+)?\;*/, function () {
                    if (logLevel == this[1]) define = Colorize.of(tmp, this[2]);
                });
                // default color parser
                if(define===null&&this[6]!==undefined) define=Colorize.of(tmp,this[6].replace(/^\:/,""));
                // return %parser without any color
                else if(define===null&&this[6]===undefined) define=tmp;

                interrupt  = define;
            }
            return interrupt || Colorize.of(tmp, this[2]);
        });
    }
}
Object.package(this);