/***
 * Exception Area
 */
export class Exception extends Error{
    public name = Exception.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class RuntimeException extends Error{
    public name = RuntimeException.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class IndexOfBoundException extends Error{
    public name = IndexOfBoundException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class NullPointerException extends Error{
    public name = NullPointerException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class NoSuchElementException extends Error{
    public name = NoSuchElementException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class IOException extends Error{
    public name = IOException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class JSONException extends Error{
    public name = IOException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class SecurityException extends Error{
    public name = SecurityException.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class ClassNotFoundException extends Error{
    public name = ClassNotFoundException.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}