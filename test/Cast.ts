import "../src/globalUtils"
import {flombok} from "../src/flombok";
import {Json} from "../src/Json";
import {MapType} from "../src/Interface";

interface ITimeout {
    getImplicit: flombok.getNumberFunc
    setImplicit: flombok.setNumberFunc
    getPageLoad: flombok.getNumberFunc
    setPageLoad: flombok.setNumberFunc
    setScript: flombok.setNumberFunc
}

class Timeout {

    @flombok.GETTER()
    @flombok.SETTER()
    private implicit:number = null;
    @flombok.GETTER()
    @flombok.SETTER()
    private pageLoad:number = null;
    @flombok.GETTER()
    @flombok.SETTER()
    private script:number   = null;

    constructor( ) {}

    public getImplicit: flombok.getNumberFunc;
    public setImplicit: flombok.setNumberFunc;

    public getPageLoad: flombok.getNumberFunc;
    public setPageLoad: flombok.setNumberFunc;

    public getScript: flombok.getNumberFunc;
    public setScript: flombok.setNumberFunc;

    public valueOf():Object{ return JSON.stringify(<Object>this.getClass().notNullProperties())}

}

let tu : Timeout = new Timeout();

tu.setScript(121212);
console.log(tu.valueOf());

//tu.getClass<Timeout>().notNullProperties();
//tu.getClass<Timeout>()

let pojo = Timeout.class<Timeout>().getDeclaringClass().cast({script:null,pageLoad:15000,implicit:56});
console.log(pojo.getImplicit());


console.log( "Another example : ", tu.getClass<ITimeout>().cast({script:null,pageLoad:15000,implicit:56}).getImplicit() );
/***
 *
 */
let casts :Timeout = <Timeout>Timeout.class().getDeclaringClass().cast({script:null,pageLoad:15000,implicit:888})
console.log(casts.getImplicit());
console.log(casts.valueOf());
/***
 *
 */
let payload:MapType<string, Object> = {script:null,pageLoad:15000,implicit:888};
let jsontest: Timeout = Json.toObject<Timeout>(payload, Timeout.class<Timeout>().getDeclaringClass() );
console.log(jsontest.getImplicit());
console.log(jsontest.valueOf());