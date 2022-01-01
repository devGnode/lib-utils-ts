import {Annotation} from "../annotation/Annotation";
import {Decorators} from "../decorator/Decorators";


export class Enumerate extends Annotation{

    constructor(index:number) {
        super(Enumerate.name,index);
    }

}
Object.package(this);