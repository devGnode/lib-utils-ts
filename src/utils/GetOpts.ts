import {MapType} from "../Interface";
import {BiConsumer} from "../Consumer";
import {Objects} from "../type/Objects";

interface argumentCli extends BiConsumer<string, string>{
    setDescriptor(descriptor:Object):void
    getDescriptor():argumentCliDescriptor
    getReg():RegExp
}
interface argumentCliDescriptor{
    key:number;     // key
    str_sq:number;  // str_simple_quote
    str_dq:number;  // str_double_quote
    str_nq:number;  // str_no_quote
    number:number;  // number
}
export class GetOpts{

    public static readonly LONG_ARGS:number     = 0x01;
    public static readonly SHORT_ARGS:number    = 0x02;
    public static readonly D_ARGS:number        = 0x04;

    private constructor() {}

    public static readonly ArgumentParser = class ArgumentParser implements argumentCli{

        readonly reg:RegExp;
        descriptor:argumentCliDescriptor = new class{
            key:number    = 1;
            str_sq:number = 4;
            str_dq:number = 5;
            number:number = 6;
            str_nq:number = 7;
        };

        constructor(reg:RegExp) {this.reg = reg;}

        getReg():RegExp{ return this.reg; }

        setDescriptor(descriptor:argumentCliDescriptor):void{this.descriptor = descriptor;}

        getDescriptor():argumentCliDescriptor{return this.descriptor; }

        accept(key: string, value: string): void {}
    };
    /***
     * @ShortArgs
     * parse short all argument
     */
    public static readonly ShortArgs = class ShortArg
        extends GetOpts.ArgumentParser implements BiConsumer<string, string>{
        /***
         * ShortArgs
         */
        collect:any;

        constructor(collect:any) {
            super(/\-([a-zA-Z]{1,})?(\=|\s*)(\'([^\']*)\'|\"([^\"]*)\"|([+-]{0,1}\d+)\s*$|((?!\-)[^\'\" ]*)|)/);
            this.collect = collect;
        }

        accept(key: string, value: string): void {
            // collector
            if( key.length > 1 )key.split("").forEach(value=>this.collect[value]=true);
            else{
                this.collect[key] = value||true;
            }
        }
    }
    /***
     *
     */
    public static readonly LongArgs = class LongArgs
        extends GetOpts.ArgumentParser implements BiConsumer<string, string>{
        /***
         * ShortArgs
         */
        collect:any;

        constructor(collect:any) {
            super(/\-\-([a-zA-Z-]{1,})?(\=|\s*)(\'([^\']*)\'|\"([^\"]*)\"|([+-]{0,1}\d+)\s*$|((?!\-)[^\'\" ]*)|)/);
            this.collect = collect;
        }

        accept(key: string, value: string): void {this.collect[key] = value||true;}
    }
    /***
     *
     */
    public static readonly DArgs = class LongArgs
        extends GetOpts.ArgumentParser implements BiConsumer<string, string>{
        /***
         * ShortArgs
         */
        collect:any;

        constructor(collect:any) {
            super(/\-D([a-zA-Z0-1-_]{1,50})(\=|)(\'([^\']*)\'|\"([^\"]*)\"|([+-]{0,1}\d+)\s*$|((?!\-)[^\'\" ]*)|)/);
            this.collect = collect;
        }

        accept(key: string, value: string): void {
            // collector
            this.collect[key] = value||true;
        }
    }
    /***
     *
     * @param str
     * @param argsConf
     */
    public static parse(str:string, argsConf:argumentCli):string{
        let desc:argumentCliDescriptor = argsConf.getDescriptor();
        return String(str).regExp(argsConf.getReg(), (dummy:any,argument:any):any=> argsConf.accept(argument[desc.key],argument[desc.str_nq] || parseInt(argument[desc.number]) || argument[desc.str_dq] || argument[desc.str_sq]));
    }
    /***
     * @get :
     *  $0 : path
     *  $1 ... path ??
     *  $args
     */
    public static get( argumentsType:number = null, argv:string = null, ) : MapType<string, string|number> {
        let i : number = 0, out  : MapType<string, string|number> = {}, str:string,
            arr:Array<string> = ( Objects.isNull(argv) ? Array.from(process.argv) : argv.split(" ") );

        // $0 & ...
        for(let j = 0, value:string;  (value = arr[j]) != null; j++){
            if( /^(((.+)\/([^\/]+))|[a-zA-Z]:(\/|\\)(?:\w+(\/|\\)?)*)/.test(value) ) {
                out[i++] = value;
                arr.shift();
                j--;
            } else{
                break;
            }
        }
        str = arr.join(" ")
            .replace(/^\s*/gi,"")
            .replace(/\s*$/,"");

        if(argumentsType&GetOpts.LONG_ARGS) str = GetOpts.parse(str, new GetOpts.LongArgs(out));
        if(argumentsType&GetOpts.SHORT_ARGS) str = GetOpts.parse(str, new GetOpts.ShortArgs(out));
        if(argumentsType&GetOpts.D_ARGS) str = GetOpts.parse(str, new GetOpts.DArgs(out));
        str.trim()
            .split(" ")
            .forEach((value)=>value.length>0?out[i++]=value:void 0);
        //
        return out;
    }
}
Object.package(this);