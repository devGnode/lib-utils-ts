/**
 * Launcher for application JavSTrip.
 *
 * @todo see for make a new child process for run
 *       this app.
 *
 * @date    12-2021
 * @licence APACCHE-2.0
 */
import "./globalUtils"
//console.log = console.warn = function () {throw new UnsupportedOperationException("console.log handler is disabled must use System.out object");};
/***/
import {GetOpts} from "./GetOpts";
import {Class} from "./Class";
import {Constructor} from "./Constructor";
import {Objects} from "./type/Objects";
import {RuntimeException} from "./Exception";
import {Optional} from "./Optional";
import {Method} from "./Reflect/Method";
import {System} from "./lang/System";
import {BiConsumer} from "./Consumer";
import {Properties} from "./file/Properties";
import path = require("path");

/***
 * @Runner
 * <pre>
 *     Runner Arguments:
 *
 *     --jstrip-home    : directory of jstrip lib
 *     --main           : Package Main class
 *     --project-root   : path root of the project
 *     --arguments      : Arguments to pass at your Main
 *     --mode           : *main, instance
 *     --quiet          :
 * </pre>
 */
const args:any = GetOpts.get( GetOpts.LONG_ARGS | GetOpts.SHORT_ARGS );
/**
 */
import * as os from "os";
import {Path} from "./file/Path";

let jstripHome:string = "";
if(!Objects.isNull(args["jstrip-home"])){
    process.env["JSTRIP_HOME"] = jstripHome = args["jstrip-home"];
}
System.initProperties(new Properties());
System.setProperty("user.dir",process.cwd());
System.setProperty("vm.node.version",process.versions.node);
System.setProperty("vm.v8.version",process.versions.v8);
System.setProperty("javaSTrip.io.tmp", os.tmpdir());
System.setProperty("javaSTrip.home",jstripHome);
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
System.setProperty("user.home",os.homedir());
System.setProperty("user.name",new Path(os.homedir()).getFileName().toString());
System.setProperty("file.null",os.release());
System.setProperty("javaSTrip.class.path",jstripHome);
System.setProperty("javaSTrip.library.path",jstripHome);
//
/***
 * @CheckMainPackage
 * <pre>
 *     Check if package main is declared. Just create
 *     a environement variable in a shell, named :
 *
 *     MAIN_CLASS_LOADER
 *
 *     or define --main argrument in your command
 *     line :
 *
 *     ts Run.ts --main=Package.com.Main
 * </pre>
 *
 */
let classToLoad:string = null;
if(Objects.isNull(args.main) && Objects.isNull(process.env.PROJECT_CLASS_MAIN) ){
    throw  new RuntimeException(
        "Package name of the Main class is not defined, declare it "+
                "the shell environment PROCESS_CLASS_MAIN=src.package.Main or "+
                "define the parameters in your command line --main=src.package."
    );
}else{
    classToLoad = args.main||process.env.PROJECT_CLASS_MAIN;
    System.setProperty("javaSTrip.boot.class.path", classToLoad);
    System.setProperty("MAIN_CLASS_LOADER", classToLoad);
}
/***
 * @Arguments : System.setProperty
 */
let $ARGS_INVOKE:Object[] = [];
if(!Objects.isNull(args.arguments)){
    /***
     *  Parse argument :
     * -Dfoo=12
     * -Dbar='foo'
     * -Dbar="foo"
     * -Dbar=A-154-A
     */
    const _:string  = GetOpts.parse(args.arguments, new class extends GetOpts.DArgs implements BiConsumer<string, string>{
        constructor() {super(null);}
        /***@override**/
        accept(key: string, value: string):void {
            System.setProperty(key,value);
            $ARGS_INVOKE = $ARGS_INVOKE.concat([key,value]);
        }
    });
    if(_.length>0&&!Objects.isNull(args.quiet)){
        //
    }
}
// ENV CHECKING
if(Objects.isNull(args["project-root"])&&!process.env.PROJECT_ROOT ){
    if(Objects.isNull(args.quiet)) System.out.println(`Run - Environment variable 'PROJECT_ROOT' not defined, default : '${process.cwd()}'`);
    process.env.PROJECT_ROOT = process.cwd();
}
if(Objects.isNull(args["project-src"])&&!process.env.PROJECT_SRC){
    if(Objects.isNull(args.quiet))System.out.println(`Run - Environment variable 'PROJECT_ROOT' not defined, default : '${process.cwd()}'`);
    process.env.PROJECT_SRC = process.cwd();
}
if(Objects.isNull(args["project-resources"])&&!process.env.PROJECT_RESOURCES){
    if(Objects.isNull(args.quiet)) System.out.println(`Run - Environment variable 'PROJECT_RESOURCES' not defined, default : '${process.cwd()}'`);
    process.env.PROJECT_RESOURCES = process.cwd();
}

/**
 * @LoadClass
 */
const constructor:Constructor<any> = Class.forName(/**/classToLoad/**/);
if(Objects.isNull(args.quiet))System.out.println("Class loaded with successful "+Objects.toString(constructor));
/***
 * @Launch app
 */
if(!Objects.isNull(args.mode)&&args.mode.toLowerCase().equals("instance")){
    /***
     * Instance new Object
     */
    const clazz:Class<any> = constructor.newInstance($ARGS_INVOKE).getClass();
    if(Objects.isNull(args.quiet)) System.out.println("Class launched with successful "+ Objects.toString(clazz.getInstance()) );
}else{
    Optional
        .ofNullable(constructor.getMethod("Main", Method.STATIC))
        .orElseThrow(new RuntimeException(`Package '${classToLoad}' doesn't contains callable Main method.`))
        .invoke(constructor,$ARGS_INVOKE);
}
