import {FileReader} from "../file/IOStream";


export class DtsParser{

    file:FileReader;

    constructor(fileReader:FileReader) {this.file = fileReader;}

    /*
    * name
    * public name
    * public static name;
    * public static readonly name
    *
    * (public|private|protected|)\s*(static|)(readonly)(\w+)\s*(\:)\s*(\w+)
    * */
    getName():void{}
    getExtends():void{}
    getInterfaces(){}
    getAttributePrototype():void{}
    getMethodPrototype():void{}

}