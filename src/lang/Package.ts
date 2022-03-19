import {Class} from "../Class";
import { Constructor } from "../Constructor";
import {Paths} from "../file/Paths";

export class Package {

    private readonly name:string;

    constructor(name:string) {this.name = name;}

    public getName():string{ return this.name; }

    public toString():string{return "Package "+this.name;}

    public static getPackageStr(name:string):Package{
        if(name==null) return null;
        if(Paths.projectModules()
            .resolve(Paths.get(name.replace(/\./gi,"/")))
            .toFile()
            .isDirectory() ||
            Paths.projectSrc()
                .resolve(Paths.get(name.replace(/\./gi,"/")))
                .toFile()
                .isDirectory()){

            return new Package(name);
        }
        return null;
    }

    public static getPackage(clazz:Class<any>|Constructor<any>):Package{
        if(clazz==null) return null;
        return clazz.getClassLoader().getPackage();
    }
}
Object.package(this);