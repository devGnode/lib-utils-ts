import {Exception} from "../../Exception";

export class HttpConfigurationException extends Exception{
    /****
     *
     */
    name = HttpConfigurationException.class().getName();
    /****
     *
     */
    constructor(ex:any) {super(ex);}
}
Object.package(this);