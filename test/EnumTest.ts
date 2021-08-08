import "../src/globalUtils"
import {Enum} from "../src/Enum";
import {Consumer} from "../src/Consumer";
/***
 * ENUM
 */
class TestDevice extends Enum{

    static IOS:TestDevice       = TestDevice.Enum("cellphone",700,800);
    static WINDOW:TestDevice    = TestDevice.Enum("desktop",1080,720);

    private readonly device:string;
    private readonly width:number;
    private readonly height:number;

    constructor(device:string, width: number, height:number) {
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
let ios: TestDevice     = TestDevice.valueOf("WINDOW");
/***
 *
 */
console.log(TestDevice.IOS.equals(window) ,"=== false ;", window.getDevice(), window.getWidth(), window.getHeight() );
console.log( TestDevice.IOS.equals(TestDevice.valueOf("IOS")), "=== true ;" ,ios.getDevice(),ios.getWidth(), ios.getHeight() );
/***
 *
 */
console.log( TestDevice.IOS.equals(TestDevice.valueOf("WINDOW")),"=== false ;");

window.switch()
    .case(TestDevice.IOS)
    .accept(Consumer.of((value:Enum)=>{

    }));