import {Exception} from "../Exception";

export class FileNotFoundException extends Exception{
    /***
     * @type {string}
     */
    public name:string = FileNotFoundException.class().getName();

    constructor( message : string = null ) {super(message);}
}
Object.package(this);