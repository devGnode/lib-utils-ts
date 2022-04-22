/***/
export class SocketException extends Error{
    public name:string = SocketException.class().getName();
    constructor( message : string = null, ex?:Error ) {super(message);}
}
Object.package(this);