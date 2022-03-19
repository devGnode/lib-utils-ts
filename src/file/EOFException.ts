import {IOException} from "./IOException";

export class EOFException extends IOException{
    /**
     * @type {string}
     */
    public name:string = EOFException.class().getName();

    constructor( message : string = "" ) {super(message);}
}
Object.package(this);