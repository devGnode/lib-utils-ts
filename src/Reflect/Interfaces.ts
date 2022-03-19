import {Class} from "../Class";
import {Constructor} from "../Constructor";
/****
 *
 */
export interface Member{
    getModifiers():number
    getName():string
    getDeclaringClass():Class<any>
    getDeclaringConstructor():Constructor<any>
}
export interface ParameterMember extends Member{
    getIndex():number
}