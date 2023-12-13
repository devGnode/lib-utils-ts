import {pointer} from "./Globals";
import {Types} from "./Types";
/*****
 * Structure Pointer
 */
export class Pointer<T>  extends String implements pointer<T> {

    private readonly value:T;
    private readonly range:number;

    constructor( value:T = null, name:string, range:Types = Types.BYTE) {
        super(name);
        this.range = range.sizeOf();
        this.value = value;
    }

    public pointerName():string{ return this.valueOf(); }

    public getRange( ):number{ return this.range; }

    public getValue( ):T{ return this.value;}

    public getType(): string {return Pointer.class().getName();}

    public sizeOf(): number {return 0;}

    public toString( ): string {return void 0;}

    public toHex(): string { return null; }

    public static from<T>( value:T = null, ptr:string, range:Types = Types.BYTE  ):Pointer<T>{
        return new Pointer<T>(value, ptr, range);
    }
}
Object.package(this);