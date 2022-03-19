import {Optional} from "../Optional";
import {PrintStream} from "../file/PrintStream";
import {FileDescriptor} from "../file/FileDescriptor";
import {Byte} from "../primitive/Byte";
import {FileOutputStream} from "../file/FileOutputStream";
import {InputStream} from "../file/InputStream";
import {FileInputStream} from "../file/FileInputStream";
import {Properties} from "../file/Properties";
import {Runtime} from "./Runtime";
import {IllegalArgumentException, NullPointerException} from "../Exception";

export abstract class System {

    private constructor() {}
    /****
     * @type {PrintStream}
     */
    public static readonly out:PrintStream =  new PrintStream(new FileOutputStream(FileDescriptor.out));
    /***
     * @type {PrintStream}
     */
    public static readonly err:PrintStream = new PrintStream(new FileOutputStream(FileDescriptor.err));
    /***
     * @type {PrintStream}
     */
    public static readonly in:InputStream = new FileInputStream(FileDescriptor.in);
    /***/
    private static props:Properties = null;
    /**
     * @param {Properties} props
     */
    public static initProperties(props:Properties):void{
        if(this.props===null) this.props = props;
    }
    /***
     * @param {InputStream} inpt
     */
    public static setIn(inpt:InputStream):void{(<any>System).in=inpt;}
    /***
     * @param {PrintStream} inpt
     */
    public static setOut(inpt:PrintStream):void{(<any>System).out=inpt;}
    /***
     * @param {PrintStream} inpt
     */
    public static setErr(inpt:PrintStream):void{(<any>System).err=inpt;}
    /**
     */
    public static getProperties():Properties{
        return this.props;
    }
    /***
     * @param {string} name
     * @param {string} defaultValue
     * @returns {string}
     */
    public static getProperty(name:string, defaultValue?:string):string{
        return <string>this.props.getProperty(name,defaultValue);
    }
    /***/
    public static clearProperty(key:string){
        if(key==null) throw new NullPointerException();
        if(key.length===0) throw new IllegalArgumentException();
        this.props.remove(key);
    }
    /***
     * @param {string} name
     * @param {string} value
     * @returns {string}
     */
    public static setProperty(name:string, value:string):string{
        this.props.setProperty(name,value);
        return value;
    }
    /***
     * @param {string} name
     * @returns {string}
     */
    public static getEnv(name:string):string{
        return Optional
            .ofNullable(process.env[name])
            .orElse(null);
    }
    /***
     * Process Exit
     * @Throws NumericOverflowException if Byte is less than 0 & greater than 255 
     * @param {Byte} signalCode
     */
    public static exit(signalCode:Byte|number){
        Runtime.getRuntime()
            .exit(typeof signalCode ==="number" ?Byte.mk(signalCode):signalCode);
    }
}
Object.package(this);