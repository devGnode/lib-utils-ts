import {IllegalArgumentException} from "../Exception";
import {Random} from "../utils/Random";
import {Objects} from "../type/Objects";
import {Arrays} from "../type/Arrays";
import {Collectors} from "../Collectors";
import {Optional} from "../utils/Optional";
import {Integer} from "../type/Integer";
import {List, LuhnFormattedText} from "../Interface";

export class Luhn {
    /***
     * @type {string}
     */
    private static readonly THROW_MSG:string = "Only numeric input is accepted";
    /***
     */
    private value:number[];
    private modulus:number;
    /**
     */
    private consumed:boolean;
    /***
     * @type {any}
     */
    private static readonly LuhnFormattedText = class LuhnFormat extends Luhn implements LuhnFormattedText{

        private readonly stringValue:string;

        constructor(value:string, modulus?:number ) {
            super(Arrays.stream(value.toArray()).map(Integer.of).toArray(),null, Optional.ofNullable(modulus).orElse(10));
            this.consumed       = true;
            this.stringValue    = value;
        }

        public check(): boolean {return this.getSum()%this.modulus==0;}

       public get(): string {return this.stringValue;}

       public toString():string{return this.get();}

       public equals(o:Object):boolean{
            if(this==o) return true;
            return !(o instanceof Luhn) && this.get().equals((<LuhnFormattedText>o).get())
       }
    };
    /**
     * @param {number[]} value
     * @param {number} length
     * @param {any} modulus
     */
    public constructor(value:number[], length:number, modulus = null) {
        this.init(value,length,modulus);
    }
     /**
     * @param {number[]} value
     * @param {number} length
     * @param {any} modulus
     */
    private init(value:number[], length:number, modulus = null):void{
        this.modulus = modulus || 10;

        // if Array
        if(value!=null){
           if(length==null)this.value = value;
           else{
                let len:number = value.length;
                this.value = Arrays.merge(
                    value,
                    Arrays.fill([], length-len-1 < 0 ? 0 : length-len-1, null)
                );
                this.fill(len);
            }
            if(!(this.value[this.value.length-1]==null)) this.value.push(null);

            return;
        // if length
        } else if(length!=null){
            this.value = Arrays.fill([], length,null);
            this.fill();
            return;
        }
        throw new IllegalArgumentException(``);
    }
    /**
     *
     */
    private fill( offset:number = 0 ):void{
        for(let i:number = offset||0; i < this.value.length; i++) this.value[i] = Random.nextInt(0,9);
    }
    /**
     * @return {number}
     */
    private getSum():number{
        let sum:number = -1, tmp:number;

        for(let i:number = this.value.length-1; i >= 0; --i ){
            if(!Objects.isNull(tmp = this.value[i] )){
                if(sum==-1)sum=0;
                sum += !(i%2 == 0) ? (tmp*2 >= 9 ? (tmp*2)-9 : tmp*2 ) : tmp;
            }
        }
        return sum;
    }
    /**
     *
     */
    private findKey():void{
        let e:number = this.value.length-1,
            n:number = -1;

        if(this.consumed)return;
        do{ this.value[e] = n++; }while (this.getSum()%this.modulus != 0);
        if(this.value[e]==-1) this.value[e] = 0;
        this.consumed = true;
    }
    /**
     * @return {LuhnFormattedText}
     */
    public generate():LuhnFormattedText{
        if(Objects.isNull(this.value[ this.value.length -1 ] ) || !this.consumed ) this.findKey();
        while (this.getSum()%this.modulus != 0){
            this.fill();
            this.findKey();
        }
        return new Luhn.LuhnFormattedText(this.toString(),this.modulus);
    }
    /***@override*/
    public toString():string{
        return !this.consumed ? "Luhn( null )" : Arrays
            .stream(this.value)
            .map(String)
            .collector(Collectors.join(""));
    }
    /**
     * @param {string} value
     * @param {number} modulus
     * @return {LuhnFormattedText}
     */
    public static from(value:string, modulus:number = null ):LuhnFormattedText{
        if(!(/^\d+$/.test(value))) throw new IllegalArgumentException(Luhn.THROW_MSG);
        return new Luhn.LuhnFormattedText(Objects.requireNotNull(value),modulus||10);
    }
    /**
     * @param {string} value
     * @param {number} modulus
     * @return {Luhn}
     */
    public static of(value:string, modulus:number = null ):Luhn{
        if(!(/^\d+$/.test(value))) throw new IllegalArgumentException(Luhn.THROW_MSG);
        let lst:List<number> = Arrays.stream(value.toArray()).map(Integer.of).collector(Collectors.toList());
        lst.add(null);
        return new Luhn(lst.toArray(),null, modulus||10);
    }
}
Object.package(this);