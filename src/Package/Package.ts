/****
 * @Package: Method init the class
 * @param target
 * @constructor
 */
export function Package(target:any):void{
    let {ClassNotFoundException} = require("../Exception"),
        packPath:string= new Error()
        .stack.trim()
        .split(/\n|\r\n|\r/)[2];

    // cannot find package
    if(packPath===undefined||packPath===null) return target;
    packPath = /.*\(([^\)]*)\)/.exec(packPath)[1] // path
        .replace(/:\d+:\d+$/,"")            // delete :line:column
        .replace(/\.(js|ts)/,"")            // delete extension
        .replace(/\\|\//gi,".")             // replace \\ or /  by .
        .replace(/([a-zA-Z]{1})\:/,"$1");   // Window include Drive
    // Unix - Fake drive
    if(/^\./.test(packPath))packPath="R"+packPath;

    if(process.env.PROJECT_ROOT){
        console.log(process.env.PROJECT_SRC)
        packPath =packPath.replace(
            /*require("path").dirname(process.env.PROJECT_ROOT)*/
            process.env.PROJECT_SRC
            .replace(/\\|\//gi,".")
            .replace(/([a-zA-Z]{1})\:/,"$1")+".",
            ""
        );
    }
    // get class export
    let last:string[] = packPath.split("."),
        element:string = last[last.length-1];

    last = null;
    packPath = packPath.replace(new RegExp("."+element+"$"),"");
    if(element===null||element===undefined) throw new ClassNotFoundException(`Package Error ${packPath}`);
    if( target[element] === undefined ) throw new ClassNotFoundException(`Class @${packPath}.${element} was been badly implemented, no element found !`);
    Object.defineProperty(
        target[element],
        "@Package",
        {enumerable:false, writable:false,configurable:false, value:packPath}
    );
    // return target
    return target;
}