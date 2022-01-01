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
import {GetOpts} from "./GetOpts";
import {Class} from "./Class";
import {Constructor} from "./Constructor";
import {Objects} from "./type/Objects";
import {RuntimeException} from "./Exception";
import {Optional} from "./Optional";
import {Method} from "./Reflect/Method";
import {System} from "./System";
import {BiConsumer} from "./Consumer";
/***
 * @Runner
 * <pre>
 *     Runner Arguments:
 *
 *     --main           : Package Main class
 *     --project-root    : path root of the project
 *     --arguments      : Arguments to pass at your Main
 *     --mode           : *main, instance
 *     --quiet          :
 * </pre>
 */
const args:any = GetOpts.get( GetOpts.LONG_ARGS | GetOpts.SHORT_ARGS );
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
    System.setProperty("MAIN_CLASS_LOADER", classToLoad);
}
/***
 * @Arguments : System.setProperty
 */
const $ARGS_INVOKE:Object[] = [];
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
            $ARGS_INVOKE.concat([key,value]);
        }
    });
    if(_.length>0&&!Objects.isNull(args.quiet)){
        //
    }
}

/**
 * @LoadClass
 */
const constructor:Constructor<any> = Class.forName(/**/classToLoad/**/);
if(Objects.isNull(args.quiet))console.log("Class loaded with successful",Objects.toString(constructor));
/***
 * @Launch app
 */
if(!Objects.isNull(args.mode)&&args.mode.toLowerCase().equals("instance")){
    /***
     * Instance new Object
     */
    const clazz:Class<any> = constructor.newInstance($ARGS_INVOKE).getClass();
    if(Objects.isNull(args.quiet)) console.log("Class launched with successful", Objects.toString(clazz.getInstance()) );
}else{
    Optional
        .ofNullable(constructor.getMethod("Main", Method.STATIC))
        .orElseThrow(new RuntimeException(`Package '${classToLoad}' doesn't contains callable Main method.`))
        .invoke(constructor,$ARGS_INVOKE);
}
/***
 *  Process exit
 */
process.exit(0);