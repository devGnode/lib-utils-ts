/***/
export class UnknownHostException extends Error{
    public name:string = UnknownHostException.class().getName();
    constructor( message : string = null, ex?:Error ) {super(message);}
}
Object.package(this);