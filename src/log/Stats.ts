import {List} from "../Interface";
import { Log } from "./Global";
import {Loggers} from "./Loggers";
import {ArrayList} from "../utils/ArrayList";
/***
 * https://github.com/devGnode/logger20js
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export class Stats {

    private static readonly INSTANCE:Stats = new Stats();

    private readonly Log :Log;
    private readonly patternList : List<string> = null;

    private constructor() {
        this.Log = Loggers.factory(Stats.class());
        this.patternList = ArrayList.of([Loggers.STATS_MEMORY_PATTERN,Loggers.CPU_USAGE_PATTERN,Loggers.VERSION_USAGE_PATTERN] );
        this.fillProp(process.versions);
        this.Log.setProp("pid",process.pid).setProp("ppid",process.ppid);
    }

    private fillProp(o:Object):void{for(let k in o)this.Log.setProp(k,o[k]);}

    private apply( key : number, pattern : string = null ) : void{
        if(pattern) this.patternList.set(key,pattern);
        this.fillProp(process.memoryUsage());
        this.fillProp(process.resourceUsage());
        this.Log.setPattern(pattern||this.patternList.get(key)).debug("");
    }

    public memory( pattern : string = null ) : void{this.apply(0,pattern);}

    public cpu( pattern : string = null ) : void{this.apply(1,pattern);}

    public version( pattern : string = null ) : void{this.apply(2,pattern);}

    public static getInstance():Stats{return this.INSTANCE;}
}
Object.package(this);

