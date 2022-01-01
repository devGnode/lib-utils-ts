import "../src/globalUtils"
import {Enum} from "../src/Enum";
import {Optional} from "../src/Optional";
import {System} from "../src/System";

class TestDevice extends Enum{

    @Enum.args("cellphone",200,300)
   // @Enum.args("cellphone",200,300)
    static IOS:TestDevice;

    @Enum.args("desktop",1080,720)
    static WINDOW:TestDevice;

    private readonly device:string;
    private readonly width:number;
    private readonly height:number;

    private constructor( device:string, width: number, height:number) {
        super();
        this.device = device;
        this.width = width;
        this.height= height;
    }

    public getDevice():string{return this.device;}

    public getWidth():number{ return this.width; }

    public getHeight():number{ return this.height; }
}
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
/***
 *
 */
console.log( TestDevice.IOS.equals(TestDevice.valueOf("WINDOW")),"=== false ;");
console.log( TestDevice.WINDOW.equals(TestDevice.valueOf("WINDOW")),"=== false ;");

class A extends Enum{

    @Enum.args()
    static readonly PROD:A;

    @Enum.args()
    static readonly DINT:A;

    private env:string;

    private constructor(env:string) {
        super();
        this.env = env;
    }

    public getUrl():string{
        if(!Optional.ofNullable(this.env).isPresent()) this.init();
        return this.env;
    }

    private setUrl(url:string):void{
        this.env = url;
    }

    private init():void{
        let r:Array<string> = ["PROD","DINT"];
        let f = {"PROD":"golvd.cd", "DINT":"psodspodps.vcre"};

        r.map((v:string)=>{
            A.valueOf<A>(v.toUpperCase()).setUrl(f[v.toUpperCase()])
        })
    }
}
console.log(A.PROD.getUrl());
console.log(TestDevice.WINDOW.toString());
console.log(TestDevice.WINDOW.equals("WINDOW"));


console.log(TestDevice.WINDOW.ordinal());
console.log(TestDevice.IOS.ordinal());
//
console.log(")))====");
console.log(TestDevice.WINDOW.compareTo(TestDevice.IOS));
console.log(TestDevice.IOS.compareTo(TestDevice.WINDOW));

let er: TestDevice[] = TestDevice.values();
let tmpt:TestDevice;

for( tmpt of er ){
    System.Out.println( "{}", tmpt)
}

// switch
switch (TestDevice.WINDOW) {
    case TestDevice.WINDOW: console.log("XIDJD---------------------"); break;
    case TestDevice.IOS: console.log("dsddsd6qs6d56sq6d6sqdsqdsq");break;
}

class tet{}

console.log( TestDevice.IOS.toString());