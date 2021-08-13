/***
 * Exception Area
 * @Exception
 * @RuntimeException
 * @IndexOfBoundException
 * @NullPointerException
 * @NoSuchElementException
 * @IOException
 * @JSONException
 * @SecurityException
 * @ClassNotFoundException
 * @IllegalArgumentException
 * @UnsupportedOperationException
 */
export class Exception extends Error{
    public name:string = Exception.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class RuntimeException extends Error{
    public name:string = RuntimeException.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class IndexOfBoundException extends Error{
    public name:string = IndexOfBoundException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class NullPointerException extends Error{
    public name:string = NullPointerException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class NoSuchElementException extends Error{
    public name:string = NoSuchElementException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class IOException extends Error{
    public name:string = IOException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class JSONException extends Error{
    public name:string = IOException.class().getName();
    constructor( message : string = null ) {super(message);}
}
export class SecurityException extends Error{
    public name = SecurityException.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class ClassNotFoundException extends Error{
    public name:string = ClassNotFoundException.class().getName();
    constructor( message : string = null, code : number = 0 ) {super(message);}
}
export class IllegalArgumentException extends Error{
    public name:string = IllegalArgumentException.class().getName();
    constructor( message : string = null) {super(message);}
}
export class UnsupportedOperationException extends Error{
    public name:string = UnsupportedOperationException.class().getName();
    constructor( message : string = null) {super(message);}
}
export class MethodNotFoundException extends Error{
    public name:string = MethodNotFoundException.class().getName();
    constructor( message : string = null) {super(message);}
}