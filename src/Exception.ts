/***
 * Exception Area
 */
export class runtimeException extends Error{
    public name = runtimeException["name"];
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class indexOfBoundException extends Error{
    public name = indexOfBoundException["name"];
    constructor( message : string = null ) {super(message);}
}
export class NullPointerException extends Error{
    public name = NullPointerException["name"];
    constructor( message : string = null ) {super(message);}
}
export class NoSuchElementException extends Error{
    public name = NoSuchElementException["name"];
    constructor( message : string = null ) {super(message);}
}
