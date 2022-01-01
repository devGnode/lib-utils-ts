import {Class} from "../Class";

export interface Member{
    getModifiers():number
    getName():string
    getDeclaringClass():Class<any>
}