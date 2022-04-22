import {Optional} from "../utils/Optional";
import {PrintStream} from "../file/PrintStream";
import {FileDescriptor} from "../file/FileDescriptor";
import {Byte} from "../primitives/Byte";
import {FileOutputStream} from "../file/FileOutputStream";
import {InputStream} from "../file/InputStream";
import {FileInputStream} from "../file/FileInputStream";
import {Properties} from "../file/Properties";
import {Runtime} from "./Runtime";
import {IllegalArgumentException, NullPointerException} from "../Exception";
import * as path from "path";
import * as os from "os";
import {Path} from "../file/Path";

export abstract class System {

    private constructor() {}
    /****
     * @type {PrintStream}
     */
    public static readonly out:PrintStream;
    /***
     * @type {PrintStream}
     */
    public static readonly err:PrintStream;
    /***
     * @type {PrintStream}
     */
    public static readonly in:InputStream;
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
        Runtime
            .getRuntime()
            .exit(typeof signalCode ==="number" ?Byte.mk(signalCode):signalCode);
    }
    /***
     * init
     */
    private static initializeSystemClass():void {

        if(this.props!=null) return;
        // Init SystemProperties
        System.initProperties(new Properties());
        //
        System.setProperty("vm.node.version",process.versions.node);
        System.setProperty("vm.v8.version",process.versions.v8);
        System.setProperty("javaSTrip.io.tmp", os.tmpdir());
        System.setProperty("file.separator",path.sep);
        System.setProperty("path.separator",path.delimiter);
        System.setProperty("cpu.name",os.cpus()[0].model);
        System.setProperty("line.separator",os.EOL);
        System.setProperty("cpu.endian",os.endianness()==="LE"?"little":"big");
        System.setProperty("os.hostname",os.hostname());
        System.setProperty("os.arch",os.arch());
        System.setProperty("os.platform",os.platform());
        System.setProperty("os.name",os.type());
        System.setProperty("os.version",os.release());
        System.setProperty("user.name",new Path(os.homedir()).getFileName().toString());
        System.setProperty("user.home",os.homedir());
        System.setProperty("file.null",os.release());
        //
        this.setOut(new PrintStream(new FileOutputStream(FileDescriptor.out)));
        this.setErr(new PrintStream(new FileOutputStream(FileDescriptor.err)));
        this.setIn(new FileInputStream(FileDescriptor.in));
    }
}
Object.package(this);