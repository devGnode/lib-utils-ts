import {Enum} from "../Enum";
/***
 *  @writer   maroder
 * @version 1.0-R-JSTrip
 */
export class Types extends Enum{
    /***
     * 1 Bytes
     */
    @Enum.args(0x00, 0xFF, 0x08) static readonly VOID:Types;
    @Enum.args(0x01, 0xFF, 0x08) static readonly BYTE:Types;
    @Enum.args(0x01, 0xFF, 0x08) static readonly uint8:Types;
    @Enum.args(0x01, 0xFF, 0x08) static readonly char:Types;
    @Enum.args(0x01, 0xFF, 0x08) static readonly boolean:Types;
    /***
     * 2 Bytes
     */
    @Enum.args(0x02, 0xFFFF, 0x10) static readonly WORD:Types;
    @Enum.args(0x02, 0xFFFF, 0x10) static readonly uint16:Types;
    @Enum.args(0x02, 0xFFFF, 0x10) static readonly u_short:Types;
    /***
     * 4 Bytes
     */
    @Enum.args(0x04, 0xFFFFFFFF, 0x20) static readonly DWORD:Types;
    @Enum.args(0x04, 0xFFFFFFFF, 0x20) static readonly uint32:Types;
    /***
     * 8 Bytes
     */
    @Enum.args(0x08, 0xFFFFFFFFFFFFFFFF, 0x40) static readonly QWORD:Types;
    @Enum.args(0x08, 0xFFFFFFFFFFFFFFFF, 0x40) static readonly u_long:Types;
    /***
     * 1-8 Bytes
     */
    @Enum.args(0x11, 0xFF, 0x08) static readonly int8:Types;
    @Enum.args(0x12, 0xFFFF, 0x10) static readonly int16:Types;
    @Enum.args(0x14, 0xFFFFFFFF, 0x20) static readonly int32:Types;
    @Enum.args(0x18, 0xFFFFFFFFFFFFFFFF, 0x40) static readonly int64:Types;
    /***
     * 4 Bytes
     */
    @Enum.args(0x34, 0xFFFFFFFF, 0x20) static readonly float:Types;
    /***
     * 8 Bytes
     */
    @Enum.args(0x38, 0xFFFFFFFFFFFFFFFF, 0x40) static readonly double:Types;
    /***
     * intra type
     */
    private readonly type:number;
    /**
     * Bytes limit number
     */
    private readonly limit:number;
    /***
     * Bits sizeOf
     */
    private readonly size:number;

    constructor(type:number, limit:number, bitSize:number) {
        super();
        this.type   = type;
        this.limit  = limit;
        this.size   = bitSize;
    }

    public getType():number{ return this.type;}

    public getLimit():number{return this.limit;}

    public sizeOf():number{return Math.floor(this.size/8);}

    public bitSizeOf():number{return this.size;}

    public isFloatNumber():boolean{return Boolean( (this.type & 0x20 ) >> 5 );}

    public isSigned():boolean{ return Boolean((this.getType() & 0x10) >> 4);}

    public signedString():string{return (!this.isSigned()?"un":"")+"signed";}

    public toString(): string {
        return `primitive ${this.signedString()} number ${this.name()}`;
    }
}
Object.package(this);