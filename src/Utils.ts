
export class Utils{

    public static regExp( regexp : RegExp = /.+/, value : string = "", callback : Function = undefined ){
        if(typeof value !=="string") return value;
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

}