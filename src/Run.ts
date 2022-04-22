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
/***/
//console.log = console.warn = function () {throw new UnsupportedOperationException("console.log handler is disabled must use System.out object");};
/***/
import {GetOpts} from "./utils/GetOpts";
import {Class} from "./Class";
import {Constructor} from "./Constructor";
import {Objects} from "./type/Objects";
import {RuntimeException} from "./Exception";
import {Optional} from "./utils/Optional";
import {Method} from "./Reflect/Method";
import {System} from "./lang/System";
import {BiConsumer} from "./Consumer";
import {Risk} from "./init/Risk";
// POO cheating
(<any>System).initializeSystemClass();
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
let jstripHome:string = "";
if(!Objects.isNull(args["jstrip-home"])){
    process.env["JSTRIP_HOME"] = jstripHome = args["jstrip-home"];
}
System.setProperty("user.dir",process.cwd());
System.setProperty("javaSTrip.home",jstripHome);
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
    if(Objects.isNull(args.quiet))System.out.println(`Run - Environment variable 'PROJECT_SRC' not defined, default : '${process.cwd()}'`);
    process.env.PROJECT_SRC = process.cwd();
}
if(Objects.isNull(args["project-resources"])&&!process.env.PROJECT_RESOURCES){
    if(Objects.isNull(args.quiet)) System.out.println(`Run - Environment variable 'PROJECT_RESOURCES' not defined, default : '${process.cwd()}'`);
    process.env.PROJECT_RESOURCES = process.cwd();
}
/***
 * Defect: QA-JST-0020 - Annotation Enum load
 * failure. avoid SingletonPattern with  complex
 * method of initialization. these Object aren't yet
 * completely loaded :
 *  - Class
 *  - Constructor
 *  - Objects
 *  - ... and ~30 others
 * Annotation Feature has need of these object.
 * cause : StreamShapes Enum & Redirect Enum
 * These class are loaded before Class class
 * and when they are loaded  annotation handler
 * are rammed ( typescript feature behavior ).
 * Fix : push all in context and call them after.
 */
Risk.resumeFailureLoad();
/**/
/**
 * @LoadClass
 */
import {Log} from "./log/Global";
import {Loggers} from "./log/Loggers";
const constructor:Constructor<any> = Class.forName(/**/classToLoad/**/);
const log:Log = Loggers.factory(constructor);
if(Objects.isNull(args.quiet))log.debug(`Class ${Objects.toString(constructor)} loaded with successful `);
/***
 * @Launch app
 */
if(!Objects.isNull(args.mode)&&args.mode.toLowerCase().equals("instance")){
    /***
     * Instance new Object
     */
    const clazz:Class<any> = constructor.newInstance($ARGS_INVOKE).getClass();
    if(Objects.isNull(args.quiet)) log.debug(`Class ${Objects.toString(clazz.getInstance())} launched with successful`);
}else{
    const main:Method  = Optional
        .ofNullable(constructor.getMethod("Main", Method.STATIC))
        .orElseThrow(new RuntimeException(`Package '${classToLoad}' doesn't contains callable Main method.`));
    if(args.async)(async ()=>await main.invokeASync(constructor,$ARGS_INVOKE))(/*__*/);
    else {
        main.invoke(constructor, $ARGS_INVOKE);
    }
}
