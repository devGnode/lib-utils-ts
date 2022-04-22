import {InputStream} from "../file/InputStream";
import {OutputStream} from "../file/OutputStream";
import {BYTE} from "../primitives/Globals";
import {Process} from "./Process";
import {ProcessImpl} from "./ProcessImpl";
import {List} from "../Interface";
import {IllegalArgumentException, NullPointerException, RuntimeException} from "../Exception";
import {ArrayList} from "../utils/ArrayList";
import {Redirect} from "./Redirect";
import {Objects} from "../type/Objects";
import {Arrays} from "../type/Arrays";
import {File} from "../file/File";
import {IOException} from "../file/IOException";

export class ProcessBuilder {

    private readonly commandV:List<string>;
    private directory:File;
    private redirectsH:Redirect[];

    constructor(command?:List<string>) {
        if(command===null) new NullPointerException();
        this.commandV = command;
    }

    public command():List<string>{return this.commandV;}

    public setEnvironment():ProcessBuilder{
        return this;
    }

    public inheritIO():ProcessBuilder{
        Arrays.fill(this.redirects(),3, Redirect.INHERIT );
        return this;
    }

    public setDirectory(directory:File):ProcessBuilder{
        this.directory = directory;
        return this;
    }

    public redirectInput(dst:Redirect):ProcessBuilder{
        if(dst.type().equals(Redirect.Type.WRITE)||dst.type().equals(Redirect.Type.APPEND))
            throw new IllegalArgumentException("Redirect invalid for writing : "+dst);
        this.redirects()[0] = dst;
        return this;
    }

    public redirectOutput(dst:Redirect):ProcessBuilder{
        if(dst.type().equals(Redirect.Type.READ))
            throw new IllegalArgumentException("Redirect invalid for writing : "+dst);
        this.redirects()[1] = dst;
        return this;
    }

    public redirectError(dst:Redirect):ProcessBuilder{
        if(dst.type().equals(Redirect.Type.READ))
            throw new IllegalArgumentException("Redirect invalid for writing : "+dst);
        this.redirects()[2] = dst;
        return this;
    }

    public redirectInputFile(file:File):ProcessBuilder{return this.redirectInput(Redirect.from(file));}

    public redirectOutputFile(file:File, append: boolean = false ):ProcessBuilder{
        return this.redirectOutput(append ? Redirect.append(file) :Redirect.to(file));
    }

    public redirectErrorFile(file:File, append: boolean = false ):ProcessBuilder{
        return this.redirectError(append ? Redirect.append(file) :Redirect.to(file));
    }

    public geRedirectInput():Redirect{ return Objects.isNull(this.redirectsH)?Redirect.PIPE:this.redirectsH[0]; }

    public geRedirectOutput():Redirect{ return Objects.isNull(this.redirectsH)?Redirect.PIPE:this.redirectsH[1]; }

    public geRedirectError():Redirect{ return Objects.isNull(this.redirectsH)?Redirect.PIPE:this.redirectsH[2]; }

    public static of( ...commands: string[]):ProcessBuilder{
        if(commands===null) new NullPointerException();
        let arr:List<string> = new ArrayList();

        for( let tmp of commands ) arr.add(tmp);
        return new ProcessBuilder(arr);
    }

    public static NullInputStream = class NullInputStream extends InputStream{

        static INSTANCE: NullInputStream = new NullInputStream();

        private constructor() {super();}

        mark(offset: number): void { }
        read(buffer?: string[]): number {return -1;}
    };


    private static NullOutputStream = class NullOutputStream extends OutputStream{
        static INSTANCE: NullOutputStream = new NullOutputStream();
        private constructor() {super();}
        write(b: number | BYTE | string | string[]): void {}
    };

    public static getNullOutputStream():OutputStream{
        return ProcessBuilder.NullOutputStream.INSTANCE;
    }

    private redirects():Redirect[]{
        if(Objects.isNull(this.redirectsH)) this.redirectsH = [Redirect.PIPE,Redirect.PIPE,Redirect.PIPE];
        return this.redirectsH;
    }

    public start():Process{
        let command:string, args:string[],
            dir:string;

        args = this.command().toArray();
        for(let i = 0; i < args.length; i++ ) {
            if(args[i]==null) throw new NullPointerException();
            if(i>=1&&args[i].indexOf("\u0000") > -1) throw new IOException("invalid null character in command");
        }

        dir = this.directory == null ? null : this.directory.toString();
        command = args[0];
        args.shift();
        try{
            return ProcessImpl.start(
                command,
                args,
                dir,
                this.redirectsH
            );
        }catch (e) {
            throw new RuntimeException("Cannot run program\""+args[0]+"\"\n"+e.stack);
        }
    }
}
Object.package(this);