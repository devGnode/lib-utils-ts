/***
 * Exception Area
 */
export class RuntimeException extends Error{
    public name = RuntimeException["name"];
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class IndexOfBoundException extends Error{
    public name = IndexOfBoundException["name"];
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
