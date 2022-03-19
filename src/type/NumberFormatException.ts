import {Exception} from "../Exception";

export class NumberFormatException extends Exception{
    public readonly name = NumberFormatException.class().getName();
    constructor() {super();}
}