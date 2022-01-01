/***
 *
 */
export class Type{
    /***
     *
     * @private
     */
    private readonly name:string;
    /**
     * @param name
     */
    constructor(name:string) { this.name=name; }
    /**/
    getName(): string { return this.name; }
}