import {OutputStream} from "./OutputStream";
import {BYTE} from "../primitives/Globals";
import {ChildProcessWithoutNullStreams} from "child_process";
import {IOException} from "./IOException";

export class ProcessOutputStream extends OutputStream{

    private readonly process:ChildProcessWithoutNullStreams;

    public constructor(p:ChildProcessWithoutNullStreams) {
        super();
        this.process = p;
    }

    public write(b: number | BYTE | string | string[]): void {
        if(typeof b === "string"){
            if(!(/(\r|\r\n|\n)$/).test(b)) b += "\r\n";
        }
        try {this.process.stdin.write(b === "string" ? b.toString() : typeof b === "number" ? String.fromCharCode(b) : b.toString(), 'utf-8',(e)=>{});}catch (e) {
            throw new IOException(e.stack)
        }
    }

}
Object.package(this);