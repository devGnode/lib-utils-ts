import {MapType} from "./Interface";

export class GetOpts{
    /****
     * long options :
     *      --foo abcd |'abcd'|"abcd"
     *      --foo=abcd |'abcd'|"abcd"
     *      --foo +12 | -12
     *      -foo
     *  short options :
     *      -a abcd |'abcd'|"abcd"
     *      -a +12 | -12
     *      -abcd
     */
    protected static REG_EXP : RegExp = /(\-\-(\w{2,})?(\=|))\s*(((\+|\-)\d+)([^\'\"\- ]+)|\'([^\']*)\'|([^ ]+))*|(\-(\w{1,}))\s*(((\+|\-)\d+)|([^\'\"\- ]+)|\'([^\']*)\'|([^ ]+))*/;
    protected static DIR_REG: RegExp = /^(([a-zA-Z]{1}\:?((\/|\\)[\w-_ ]+)*\.[a-z]{1,}$)|((\/[\w-_ ]+)*\.[a-z]{1,}$))/;
    /***
     *
     * @param argv
     */
    public static get( argv: string[] = null ) : MapType<string, string|number> {
        let i : number = 0, dir:boolean = true, out  : Object = {};

        Array.from( argv || process.argv)
            // path path options
            .map(value=>{
                if( GetOpts.DIR_REG.test(value) && dir ){ out[i++] = value; return ""; }else dir =false;
                return value;
            })
            .join(" ")
            .regExp( GetOpts.REG_EXP, (dummy,argument)=>{
                // long
                if(argument[1]!==undefined) {
                    if(["+","-"].indexOf(argument[6])>-1)out[argument[2]] = parseInt(argument[4]);
                    else {
                        out[argument[2]] = argument[9] || argument[8] || argument[7] || argument[5] || true;
                    }
                }
                // short
                else if(argument[9]){
                    if(argument[10].length>1) argument[10].split("").forEach(value=>out[value]=true);
                    else out[argument[10]] = argument[12] || argument[14] || argument[15] || true;
                }
                return "";
            })
            .trim()
            .split(" ")
            .forEach((value)=>value.length>0?out[i++]=value:void 0);

        return <MapType<string, string|number>>out;
    }
}