import {Package} from "../src/Package/Package";

export class Run{

    public static Main(args:Object[]):void{

        console.log("lol", Run.class().getName(), args);
        console.log(new Run().toString());

    }
}
Package(this);