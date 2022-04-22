export class PackageException extends Error{

    constructor() {super();}

    private static mapper(value:string){
        let tmp: RegExpExecArray;
        return (tmp = /.*\(([^\)]*)\)/.exec(value)) ?
            tmp[1].replace(/:\d+:\d+$/,"").replace(/\.(js|ts)/,""):
            null;
    }

    public getLines():string[]{
        return this.stack
            .trim()
            .split(/\n|\r\n|\r/)
            .slice(1)
            .map(PackageException.mapper)
            .filter(value => value!=null)
    }

    public getLine(clazzName:string):string{
        if(clazzName==null)return clazzName;
        let out:string = null;
        this.getLines()
            .filter(value=>value.endsWith(clazzName))
            .map(value=>out=value);
        return out;
    }
}