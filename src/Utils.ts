import {statSync} from "fs";
import * as fs from "fs";

export class Utils{

    public static regExp( regexp : RegExp = /.+/, value : string, callback : Function  ){
        try{
            let tmp,toReplace;
            while(( tmp = regexp.exec(value) )){
                toReplace = callback !==undefined ? callback.call(tmp,value, tmp) : "";
                value = value.replace(tmp[0], toReplace);
            }
        }catch (e) {
            return value;
        }
        return value;
    }
    /***
     * @param directory
     * @return {boolean}
     */
    public static exists( directory : string = null ) : Boolean {
        try {statSync(directory);return true;} catch (e) {
            return false;
        }
    }

}