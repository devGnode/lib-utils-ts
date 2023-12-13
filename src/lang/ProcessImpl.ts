import {Process} from "./Process";
import {InputStream} from "../file/InputStream";
import {OutputStream} from "../file/OutputStream";
import * as child_process from "child_process";
import {ChildProcess} from "child_process";
import {Redirect} from "./Redirect";
import {ExitSign} from "./ExitSign";
import {CloseProcess} from "./CloseProcess";
import {Byte} from "../primitives/Byte";
import {Arrays} from "../type/Arrays";
import {FileDescriptor} from "../file/FileDescriptor";
import {FileInputStream} from "../file/FileInputStream";
import {FileOutputStream} from "../file/FileOutputStream";
import {RuntimeException} from "../Exception";
import {Readable} from "stream";
import {IOException} from "../file/IOException";
import {ProcessBuilder} from "./ProcessBuilder";
import {ProcessOutputStream} from "../file/ProcessOutputStream";


export class ProcessImpl extends Process{

    private readonly handle:ChildProcess;
    private readonly stdin:OutputStream;
    private readonly stdout:InputStream;
    private readonly stderr:InputStream;
    private sign:CloseProcess;

    protected constructor(command:string, args:string[], dir:string, ioHandle:number[]) {
        super();

        let f0:FileInputStream = new FileInputStream(new FileDescriptor().set(ioHandle[0])),
            f1:FileOutputStream = new FileOutputStream(new FileDescriptor().set(ioHandle[1])),
            f2:FileOutputStream = new FileOutputStream(new FileDescriptor().set(ioHandle[2]));
        if(ioHandle[1]==-1){this.stdout = ProcessBuilder.NullInputStream.INSTANCE;}else{
            this.stdout = new FileInputStream(new FileDescriptor().set(ioHandle[1]));
        }
        if(ioHandle[2]==-1){this.stderr = ProcessBuilder.NullInputStream.INSTANCE;}else{
            this.stderr = new FileInputStream(new FileDescriptor().set(ioHandle[2]));
        }
        /***/
        command = (dir!=null?dir.endsWith("/")||dir.endsWith("\\")? dir: dir+"/":"")+command;
        this.handle = child_process.spawn(command, args, {detached: true, stdio: ['pipe', 'pipe', 'pipe']});
        if(ioHandle[0]==-1){this.stdin = ProcessBuilder.getNullOutputStream();}else{
            this.stdin = new ProcessOutputStream(this.handle);
        }
        this.handle.stdout.on("data",(data:Buffer)=>f1.write(data.toString()));
        this.handle.stderr.on("data",(data:string)=>f2.write(data.toString()));
        this.handle.on("error",(e:Error)=>{ throw new IOException("Cannot run program \""+command+"\"\n"+e.stack)});
        this.handle.stdin.on("pipe",(src: Readable)=>f0.read(src.read(-1)));
        this.handle.on(
            "exit",
            (code:number,sign:NodeJS.Signals)=> {
                f1.close();
                f2.close();
                this.exit(sign === null ? CloseProcess.exit(Byte.mk(code)) : CloseProcess.sign(ExitSign.valueOf(sign)));
            });
    }
    /***
     * @return {boolean}
     */
    public isAlive(): boolean {return !this.handle.killed&&this.handle.exitCode === null&&this.handle.signalCode===null;}
    /***
     * @param {number | NodeJS.Signals} sign
     */
    private exit(sign:CloseProcess):void{
        if(this.handle.killed)return;
        try {
            this.sign = sign;
            switch (sign.getSign()) {
                case ExitSign.EXIT:
                    this.handle.kill(sign.getExitCode());
                    break;
                default:
                    this.handle.kill(sign.toSignJS());
            }
        }catch (e) {
            throw new RuntimeException(e.stack);
        }
    }
    /***
     */
    public halt(sign:ExitSign):void{this.exit(CloseProcess.sign(sign));}
    /***
     */
    public destroy(): void {this.exit(CloseProcess.signKill());}
    /***
     * @return {number}
     */
    public exitValue():number{ return this.handle.exitCode || ( this.sign != null ? this.sign.getExitCode() : null ); }
    /***
     * @return {}
     */
    public getErrorStream(): InputStream {return this.stderr;}
    /***/
    public getInputStream(): OutputStream {return this.stdin;}
    /***/
    public getOutputStream(): InputStream {return this.stdout;}
    /***
     * @param {string} command
     * @param {string[]} args
     * @param dir
     * @param redirect
     * @return {Process}
     */
    public static start(command:string, args:string[], dir:string,  redirect:Redirect[] ):Process{
        let ioHandle:number[] = [],
            f0:FileInputStream = null,
            f1:FileOutputStream,
            f2:FileOutputStream;

        if (redirect === null) Arrays.fill(ioHandle, 3, -1);
        else {

            if (redirect[0].type().equals(Redirect.Type.PIPE)) {
                ioHandle[0] = -1;
            } else if (redirect[0].type().equals(Redirect.Type.INHERIT)) {
                ioHandle[0] = FileDescriptor.in.get();
            } else {
                ioHandle[0] = (f0 = new FileInputStream(redirect[0].file())).getFD().get();
            }

            if (redirect[1].type().equals(Redirect.Type.PIPE)) {
                ioHandle[1] = -1;
            } else if (redirect[1].type().equals(Redirect.Type.INHERIT)) {
                ioHandle[1] = FileDescriptor.out.get();
            } else {
                ioHandle[1] = (f1 = new FileOutputStream(redirect[1].file(), redirect[2].append())).getFD().get();
            }

            if (redirect[2].type().equals(Redirect.Type.PIPE)) {
                ioHandle[2] = -1;
            } else if (redirect[2].type().equals(Redirect.Type.INHERIT)) {
                ioHandle[2] = FileDescriptor.out.get();
            } else {
                ioHandle[2] = (f2 = new FileOutputStream(redirect[2].file(), redirect[2].append())).getFD().get();
            }

        }
        try {return new ProcessImpl(command, args, dir, ioHandle);}catch (e) {
            if(f0!=null)f0.close();
            if(f1!=null)f1.close();
            if(f2!=null)f2.close();
        }
    }
}
Object.package(this);