import {OutputStream} from "./OutputStream";
import {FilterOutputStream} from "./FilterOutputStream";
import * as os from "os";
/***
 * @to-fix
 */
export class PrintStream  extends FilterOutputStream{

    private readonly lineSeparator:string = os.EOL;

    constructor(out:OutputStream) {
        super(out);
    }

    private newLine():void{
        this.write(this.lineSeparator);
    }

    public print(str?:Object):void{
        this.write(str===null||str===undefined? "null":str.toString());
    }

    public println(str?:Object):void{
        this.write(str===null? "null":str===undefined?"":str.toString());
        this.newLine();
    }

    public printf(pattern:string, ...args:Object[] ){

    }
}