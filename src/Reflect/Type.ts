/***
 */
export class Type{
    /***
     */
    private readonly name:string;
    /**
     * @param name
     */
    constructor(name:string) { this.name=name; }
    /**/
   public getName(): string { return this.name; }
}
Object.package(this);