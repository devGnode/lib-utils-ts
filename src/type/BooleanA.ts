export abstract class BooleanA extends Boolean{
    /***
     *
     */
    public state(  expectTrue : any, orElse : any ) : any {return this.valueOf()? expectTrue : orElse;}
    /***
     *
     */
    public static of(  value : Object ) : boolean {return value===true||value === "true"||value===1;};
}