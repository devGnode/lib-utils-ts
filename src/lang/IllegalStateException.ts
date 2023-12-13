/***/
export class IllegalStateException extends Error{
    public name:string = IllegalStateException.class().getName();
    constructor( message : string = null, ex?:Error ) {super(message);}
}
Object.package(this);