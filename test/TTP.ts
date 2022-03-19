import "../src/globalUtils"
import {TTE} from "./TTE";
import {Class} from "../src/Class";
import {kolm, TT} from "./TT";
import { Package } from "../src/Package/Package";
import {Method} from "../src/Reflect/Method";
import {Enumerate} from "../src/Reflect/Enumerate";
import {Enum} from "../src/Enum";
import {ClassLoader} from "../src/ClassLoader";
import { Path } from "../src/file/Path";
import {Field} from "../src/Reflect/Field";
import {Constructor} from "../src/Constructor";
import {Objects} from "../src/type/Objects";
import {DecoratorHandler} from "../src/annotation/Annotation";


console.log("THIS TTP", this);
new TTE();


class IllegalArgumentException extends Error{
    public name:string = "IllegalArgumentException";
    constructor(message:string="") {super(message);}
}




console.log( TT.class().getPackage() );
console.log("-152-**--*",new Method(TT.prototype.setLol,"setTT", Method.INSTANCED, new Class( new TT() ) ).getDeclaringClass().getPackage())
//console.log("endin", Class.class().getKeys());

let me:Method[] = new Class( new TT() ).getMethods();

me= me.filter(m=>m.getName().equals("setTT"));
console.log(me[0].getDeclaredAnnotations().forEach(a=>console.log(a.getName())));
console.log('oklm ', Enumerate.class().getPackage())

console.log("*-*--*-*-*-*-*-*-*-*-*///",me[0].getAnnotation(kolm.class()));

console.log("",me[0].getParameterAnnotations())
console.log("COUNT OF pARAMERZR",me[0].getParameterCount());

class TestDevice extends Enum{

    @Enum.args("cellphone",200,300)
    // @Enum.args("cellphone",200,300)
    static IOS:TestDevice;

    @Enum.args("desktop",1080,720)
    static WINDOW:TestDevice;

    private readonly device:string;
    private readonly width:number;
    private readonly height:number;

    constructor( device:string, width: number, height:number) {
        super();
        this.device = device;
        this.width = width;
        this.height= height;
    }

    public getDevice():string{return this.device;}

    public getWidth():number{ return this.width; }

    public getHeight():number{ return this.height; }
}

TestDevice.valueOf("WINDOW")
 TestDevice.valueOf("WINDOW").getClass<TestDevice>().getFields().forEach(v=>console.log(v.toString()));
console.log("7888*/",new Class( new TT() ).getField("lol", Field.STATIC).getDeclaredAnnotations())
console.log(new Class( new TT() ).getFields().forEach(v=>console.log(v.toString())))
/***
 *
 */
let window: TestDevice  = TestDevice.valueOf("WINDOW");
let ios: TestDevice     = TestDevice.valueOf("IOS");
/***
 *
 */
console.log(TestDevice.IOS.equals(window) ,"=== false ;", window.getDevice(), window.getWidth(), window.getHeight() );
console.log( TestDevice.IOS.equals(TestDevice.valueOf("IOS")), "=== true ;" ,ios.getDevice(),ios.getWidth(), ios.getHeight() );

/*console.log(new Class( new TT() ).getMethods().forEach(m=>{
    console.log(m.getName());
    console.log(m.getParameterCount())
    console.log(m.getDeclaringClass());
}))*/

export class TTP{}

Package(this);

class Yest{
    constructor() {
    }

    getName():string{return null;}
    setName(name:string):void{}
}
interface ghj{
    lolp:string
    ret:Function
    getName():string
    setName(name:string):void
}
function rty(){ this.k= 5; }

Yest.constructor
console.log("5664569987987979879797979rty", typeof rty, new rty().constructor, Object.getOwnPropertyNames(new rty().constructor.prototype))
console.log("try ins ", new rty(),new rty().lolp)
console.log("Class Loader")
let k:ClassLoader<TT> = new ClassLoader(TT);
// "getName",function(){return "lo";}
k.setMethod(new Method(function(){return "lo";},"getName",Method.INSTANCED));
k.setMethod(new Method(function(){return "lo";},"getTer",Method.STATIC));
k.setField(new Field("getTedddddddddddddddr","4556",Field.STATIC));
k.setMethod(new Method(function(name:string){ console.log(name); this.k = 18; },"setName",Method.INSTANCED,null));
console.log("---",k.instance());
//console.log(k.instance().getName())
//console.log(k.instance().setName("d"))



//TT.class().getClassLoader()
console.log("---45546645664????????????????????????????????????????????????????????????????????????????");
TT.class().getClassLoader().setField(new Field("lol","455658888888",Field.STATIC))
TT.class().newInstance().getClass().getConstructor().getClassLoader().setField(new Field("lol","???????88",Field.STATIC))
console.log("---sssssssssssssssssssssssssss==========================================");
let vm:TT = k.instance();
vm.getClass().getClassLoader().setMethod(new Method(function(){return this.de;},"getNameTERY",Method.INSTANCED));
// @ts-ignore
console.log(vm.getNameTERY());
new Class(k.instance().getClass().getClassLoader().instance()).getFields(Field.STATIC).forEach(m=>console.log(m))


console.log( TestDevice.class().getEnumConstants() );
console.log((new Constructor(TT)).toString(), Objects.toString(TT))

class fghj{

    @DecoratorHandler.method(new Enumerate(0))
    @DecoratorHandler.method(new Enumerate(0))
    ef(){

    }

    @DecoratorHandler.method(new Enumerate(5))
    @DecoratorHandler.method(new Enumerate(4))
    static ed(@DecoratorHandler.param(new Enumerate(54))d:string){}
}

console.log(fghj.class().getMethods()[0].getDeclaredAnnotations())

class tr implements ThisType<any>{
    po:string = "mklk";
    writable:boolean=true;
}
Object.defineProperty(fghj,"sd",new tr());
console.log((<tr>Object.getOwnPropertyDescriptor(fghj,"sd")).po)
