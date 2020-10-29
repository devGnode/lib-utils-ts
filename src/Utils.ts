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

    public static merge( objA : Object = {}, ...args : Object[] ) : Object{
        try{
            let i:number=0,objB:Object;
            while((objB=args[i])) {
                for (let tmp in objB) if (!objA[tmp]) objA[tmp] = objB[tmp];
                i++;
            }
        }catch (e) {return objA;}
        return objA;
    }

}