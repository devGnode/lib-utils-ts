import "../globalUtils"
import {FileReader} from "../file/IOStream";
import {iterator} from "../Interface";


//../AbstractArrayList
//./Functions
class ProtoTypeClass{

    private name:string;
    private extendOf:string;
    private implementsOf:string[];

    setName(name:string, generic:string = null ):void{
        this.name=name;
    }

    setExtend(name:string):void{this.extendOf=name; }


}
console.log("FileReader", new FileReader("../AbstractArrayList.d.ts").getLines() );
let itr:iterator<string>  = new FileReader("../AbstractArrayList.d.ts").getLines().iterator();
let tmp:any;
while (itr.hasNext()){
    // OK
    if( (tmp = /\s*export\s*declare\s*(.*)\s*\{/.exec( itr.next()) ) ){
        console.log(tmp)
        console.log(/(abstract|)\s*class\s*([a-zA-Z0-1-_$]+)(\<([^\>]+)\>|)(\s*extends\s*([a-zA-Z0-1-_$]+)(\<([^\>]+)\>|)|)(\s*implements\s*(.*)|)/.exec(tmp[1]));

    }else{
     //   console.log('endls', tmp)
    }
}
// find declare
//\s*/
export class DtsParser{


}