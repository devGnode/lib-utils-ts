import {type} from "os";

console.log("ERORORO-TTE5s4d4s");
import { Package } from "../src/Package/Package";
console.log("ERORORO-TTEdsds");
import {Enumerate} from "../src/Reflect/Enumerate";
console.log("ERORORO-TT6455E");
import {Annotation} from "../src/annotation/Annotation";


class ff{
    static ml:string = "lol";
}
console.log("THIS", this);
interface lol{
    setTT(name:string, abc:string, n:number):string;
}

export class kolm extends Annotation{ constructor() {
    super(kolm.name,null);
}
}

function f1<T>(target: any, propertyKey: string) {
    if(target[propertyKey] === undefined )target[propertyKey].prototype = {};
    target[propertyKey].prototype["@Annotations"].push(new kolm());
   // Object.defineProperty(target[propertyKey],"prototype",{enumerable:false});
    //Object.defineProperty(target[propertyKey].prototype,"@Annotations",{enumerable:false, value: [new kolm()]});
console.log("IN")
}
function f2<T>(target: any, propertyKey: string) {
    console.log("// --->f2", propertyKey)
    target[propertyKey].prototype["@Annotations"].push(new kolm());
    console.log(target[propertyKey].prototype );
    console.log("dIN")
}
function zz(target: any, propertyKey: string) {
    console.log("zzzzzzzzzzzz",target);
    Object.defineProperty(target,"@Annotations",{enumerable:true,value:[new Enumerate(0)]});
}
function pp<T>(target: any, propertyKey: string, index:number) {

    target[propertyKey].prototype = {};
    target[propertyKey].prototype["@Annotations"] = [new Enumerate(index)];
    Object.defineProperty(target[propertyKey],"prototype",{enumerable:false});
    Object.defineProperty(target[propertyKey].prototype,"@Annotations",{enumerable:false, value: [new Enumerate(index)]});
    let tmp:any = Object.getOwnPropertyDescriptor(target[propertyKey].prototype,"@Annotations");
    console.log("--------------------------------------------ee",tmp.value);
    console.log("dIN")
}
class IllegalArgumentException extends Error{
    public name:string = "IllegalArgumentException";
    constructor(message:string="") {super(message);}
}

/**
 *
 * sqdsdqsdsqd
 * */
export class TT implements lol{

    @zz
    public static lol:string = "lkm";
    private static klm:number=5;

    public de:string="klk";
    protected df:string="lmk";
    private readonly dfg:string="ml";
    /***
    * @implements lol
    */
    constructor() {
    }

    /*fsdfsdf*/
    @f2
    @f1
    public setTT(@pp name:string, abc:string, n:number):string {
        if(false) throw new IllegalArgumentException("");
        if(false) throw new IllegalArgumentException();
        if(false) throw new Error();
        return "dsq";
    }

    public setLol():void{ }

    private ghjk():void{}

    static staticem():void{ console.log(88); }
}

Package(this);

console.log( "//*", new TT().setTT("k","",5) );
console.log(TT.toString());
