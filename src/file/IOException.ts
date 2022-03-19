/***
 * @IOException
 */
export class IOException extends Error{
    public name:string = IOException.class().getName();

    constructor( message : string = null, code : number = 0 ) {super(message);}
}
Object.package(this);