import {Reader} from "./Reader";
import {EOFException} from "./EOFException";

export class StringReader extends Reader{

    private readonly target:string;
    private index:number = 0;

    constructor(value:string) {
        super();
        this.target = value;
    }

    public read(): number {
        if(this.target[this.index]===undefined) throw new EOFException();
        return this.target.charCodeAt(this.index++);
    }

    public readByte(buffer:string[], off:number = 0, length:number):number{
        return 0;
    }

    ready(): boolean {
        return false;
    }

    close(): void {}

}
Object.package(this);