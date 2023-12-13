/****
 * In this package no importation
 * work in native js
 *
 * @Package: Method init the class
 * @param target
 * @constructor
 */
import {PackageException} from "./PackageException";
import {Class} from "../Class";
/***no import accepted**/
export class Package {

    private static cleanUp(src:string):any{
        let {Path} = require("../file/Path"),
            actualPath:any = new Path(src);

        if(process.env.PROJECT_SRC!==undefined)actualPath = new Path(process.env.PROJECT_SRC).relativize( actualPath );
        if( /node_modules/.test( actualPath.toString() ) && process.env.PROJECT_ROOT!==undefined ){
            actualPath = Path.get(process.env.PROJECT_ROOT).resolve(Path.get("node_modules")).relativize( actualPath );
        }
        if(/lib-utils-ts|jstrip/.test(actualPath.toString())){
            actualPath = new Path(String(process.env["JSTRIP_HOME"])).getParent().relativize(actualPath);
        }

        return actualPath;
    }

    private static define(target:Object, value:Object):void{
        Object.defineProperty( target,"@Package",{
            configurable:false, enumerable:false,
            writable:false, value:value
        });
    }

    private static Package0(target:any):void{
        let {ClassNotFoundException, NullPointerException} = require("../Exception"),
            {System} = require("../lang/System"),
            {Path} = require("../file/Path"),
            element:string, actualPath:any,
            packPath:string= new PackageException().getLines()[2];

        // cannot find package
        if(packPath===undefined||packPath===null) return target;
        actualPath = Package.cleanUp(packPath);

        // get class export
        element = actualPath.getFileName().toString();
        if(target[element]==null) throw new ClassNotFoundException(`Class '${element}' not found in '${target}'`);
        // Error
        if(Object.getOwnPropertyDescriptor(target[element], "@Package")!==undefined) return;
        if(element===null||element===undefined){
            throw new ClassNotFoundException(`Package Error ${actualPath.getParent().toForNamePath()}`);
        }
        if( target[element] === undefined ){
            throw new ClassNotFoundException(`Class @${actualPath.toForNamePath()} was been badly implemented, no element found !`);
        }
        if( target[element] === null ){
            throw new NullPointerException(`Class @${actualPath.toForNamePath()} return null value element`);
        }

        let p:string = actualPath.getParent().toForNamePath().length == 0  ? "" : actualPath.getParent().toForNamePath()+".";
        /*try{console.log("Module loaded",p+element);}catch (e) {
            System.out.println("Module loaded",p+element);
        }*/
        // Set descriptor
        Package.define(target[element],actualPath.getParent().toForNamePath());
        if(target[element].__static!=null) target[element].__static();

        return target;
    }
    /***/
    public static Package(target:any):void {Package.Package0(target);}
    /***/
    public static fromAnnotation(target:any):void {
        Package.Package0(target);
    }
    /***/
    public static fromClazzName(target:Object, packageSrc:string):void {
        Package.define(target,Package.cleanUp(packageSrc).toForNamePath());
    }
}