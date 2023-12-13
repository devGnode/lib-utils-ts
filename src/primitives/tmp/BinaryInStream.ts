/**
 *
 */
import {InputStream} from "../../file/InputStream";

export class BinaryInStream extends InputStream{

    private readonly buffer:string;
    private offset:number = 0;

    constructor(valueIn:string) {
        super();
    }

    mark(offset: number): void {
    }

    read(buffer?: string[]):number {
        if(this.buffer[this.offset]!=null){
            if(buffer==null) return
        }
        return -1;
    }

    public
}
Object.package(this);