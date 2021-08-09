import "../src/globalUtils"
import {Enum} from "../src/Enum";
/***
 * ENUM
 */
class TestDevice extends Enum{

    @Enum.args("cellphone",200,300)
    static IOS:TestDevice;

    @Enum.args("desktop",1080,720)
    static WINDOW:TestDevice;

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