import {Class} from "./Class";
import {Optional} from "./Optional";
import {Define} from "./Define";
import {NullPointerException} from "./Exception";
import {ArrayList} from "./List";
import {MapType} from "./Interface";

export class Json {

    /***
     * @param payload
     * @param Class
     * @param quiet
     */
    public static toObject<T>( payload: MapType<string,any>, Class: Class<T>, quiet: boolean = false  ): T{
       let tmp:string, obj: T = Class.getInstance(), name:string, d: Define<Function>, c: any;

       for( tmp in payload ){

           name = tmp.charAt(0).toUpperCase() + tmp.slice(1);
           d = Define.of<Function>(obj[`set${name}`]);
           if( d.isNull() ){
               if(!quiet) d.orElseThrow(new NullPointerException(`Setter 'set${name}' not is defined from '${obj.getClass().getName()}' class`));
           }else {
               if(payload.hasOwnProperty(tmp)) {
                   if (payload[tmp].getClass().getName().equals("Array")) c = new ArrayList<any>(payload[tmp]);
                   if (payload[tmp].getClass().getName().equals("Object") && obj[`get${name}`].call(obj)) c = Json.toObject(payload[tmp], obj[`get${name}`].call(obj).getClass());

                   obj[`set${name}`].call(obj, c || payload[tmp]);
                   c = null;
               }
           }
       }
        return obj;
    }

}