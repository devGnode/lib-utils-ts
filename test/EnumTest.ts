import "../src/globalUtils"
import {Enum} from "../src/Enum";
import {Optional} from "../src/Optional";
/***
 * ENUM
 */
class TestDevice extends Enum{

    @Enum.args("cellphone",200,300)
    static readonly IOS:TestDevice;

    @Enum.args("desktop",1080,720)
    static readonly WINDOW:TestDevice;

    private readonly device:string;
    private readonly width:number;
    private readonly height:number;

    private constructor(device:string, width: number, height:number) {
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

console.log(A.PROD.getUrl())