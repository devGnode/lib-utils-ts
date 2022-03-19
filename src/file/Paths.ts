import {System} from "../lang/System";
import {Path} from "./Path";
import {Objects} from "../type/Objects";
import {Arrays} from "../type/Arrays";

export abstract class Paths{

    private constructor() {}
    /***
     * @throw NullPointerException when {String start} and {name[]} is null
     * @param {string} name
     * @returns {Path}
     */
    public static get( start:string, ...name:string[]):Path{
        return new Path(start,...Objects.requireNotNull(name));
    }
    /***
     * @throw NullPointerException when {String start} and {name[]} is null
     * @param {string[]} name
     * @return {Path}
     */
    public static from(name:string[]):Path{
        return Paths.get(name[0],...Arrays.remove(name,0));
    }
    /***
     *
     * @returns {Path}
     */
    public static projectRoot(def:string = null ):Path{
        let src:string;
        return  (src = System.getEnv("PROJECT_ROOT")||def ) ? new Path(src) : null;
    }
    /***
     *
     * @returns {Path}
     */
    public static projectSrc():Path{
        let src:string;

        if(!(src = System.getEnv("PROJECT_SRC"))){
            if(!this.projectRoot()) return this.projectRoot().resolve(Paths.get("src/ts"));
        }

        return src ? new Path(src) : null;
    }
    /***
     *
     * @returns {Path}
     */
    public static projectResources():Path[]{
        let src:string;

        if(!(src = System.getEnv("PROJECT_RESOURCES"))){
            if(!this.projectRoot())
                src = this.projectSrc()
                    .resolve(Paths.get("resources"))
                    .toString();
            else{
                src = process.cwd();
            }
        }

        return !src ? null :
            src.split(Path.getDelimiter())
                .map(value=>new Path(value));
    }
    /***
     * make sur you have define environment variable :
     * PROJECT_ROOT
     *
     * @returns {Path}
     */
    public static projectModules():Path{
        let src:string;
        if((src= System.getEnv("PROJECT_ROOT"))==null)return null;
        return Paths.get( src )
            .resolve(new Path("node_modules"));
    }

}
Object.package(this);