import {Optional} from "./Optional";
import {Enum} from "./Enum";

interface Out {
    println( pattern:string, ... args: Object[]):void
    print( pattern:string, ... args: Object[]):void
}

class Project{
    main:string;
    src:string[];
    resources:string[];
    exclude:string[];
}

export class OS extends Enum{

    @Enum.args("\\","\r\n")
    static readonly WINDOWS:OS;

    @Enum.args( "/", "\n")
    static readonly LINUX:OS;

    @Enum.args( "/", "\n")
    static readonly UNIX:OS;

    @Enum.args("/", "\n")
    static readonly MAC:OS;

    private readonly carriage:string;
    private readonly pathSeparator:string;

    protected constructor( pathSeparator:string, carriage:string) {
        super();
        this.pathSeparator = pathSeparator;
        this.carriage = carriage;

    }

    getPathSeparator():string{ return this.pathSeparator; }

}

export abstract class System {

    public static Out:Out = new class Out implements Out{

        print(pattern: string, ...args): void {}

        println( pattern:string, ... args: Object[]):void{
            let a:Array<Object> = Array.from(args),i:number = 0;

            //process.stdout.cursorTo(0);
            //process.stdout.clearLine(0);
            if(a.length>0) pattern = String(pattern).regExp(/\{\}/, ()=>Optional.ofNullable(a[i++]).orElse(""));

            process.stdout.write(pattern+"\n");
        }

    };

    public static getProperty(name:string, defaultValue?:string):string{
        return Optional
            .ofNullable(process.env[name]||System.env[name])
            .orElse(!defaultValue ? null : defaultValue);
    }

    private static readonly env:string[] = [];

    public static setProperty(name:string, value:string):void{
        System.env[name] = value;
    }

    public static arch():OS{
        switch (process.platform) {
            case "win32": return OS.valueOf("WINDOWS");
            case "linux": return OS.valueOf("LINUX");
            case "darwin": return OS.valueOf("MAC");
            case "freebsd":
            case "openbsd":
            case "netbsd":
            case "sunos":
                return OS.valueOf("UNIX");
        }
        return null;
    }
}


//console.log("sqsq--***-", process.env );