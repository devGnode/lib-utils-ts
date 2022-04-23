import {BitsType} from "./Globals";
import {Constructor} from "../Constructor";
import {Objects} from "../type/Objects";
import {Types} from "./Types";
/***
 * @writer     maroder
 * @version    1.0-R-JSTrip
 */
export class BinArray<T extends BitsType> extends Array<T>{

    private readonly type: Constructor<T>;
    private readonly sizeof:number = Types.VOID.sizeOf();

    constructor(type: Function, sizeof:number = Types.VOID.sizeOf()) {
        super();
        this.type = type.class<T>();
        this.sizeof = sizeof;
        this.fill(this.type.newInstance(0), sizeof );
    }

    public add(items:number): void{
        this.push(this.type.newInstance(items));
    }

    public push(...items:T[]): number {
        let tmp:T, i:number=0;
        while (!Objects.isNull(tmp=items[i])){
            super.push(tmp)
            i++;
        }
        return 0;
    }

    public get( value:number ):T{return this[value];}

    public getType( ):string{return this.type.getName()+BinArray.class().getName(); }

    public sizeOf():number{return (this.length||this.sizeof) * this.getRange();}

    public getRange():number{ return this.type.newInstance(0).sizeOf(); }
}
Object.package(this);