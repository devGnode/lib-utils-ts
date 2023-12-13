import { List } from "../Interface";
import {Reader} from "./Reader";
import {ArrayList} from "../utils/ArrayList";


export class BufferedReader extends Reader{

    private reader:Reader;

    public constructor(reader:Reader) {
        super();
        this.reader = reader;
    }

    /***
     * @throw EOFException
     * @returns {number}
     */
    public read(): number {
        return this.reader.read();
    }

    public readByte(buffer:string[], off:number = 0, length:number):number{
        return this.reader.readByte(buffer,off,length);
    }

    public readLine():string{
        let out:string = null, chr:string;
        try {
            out = "";
            for(;;) {

                if( (chr= String.fromCharCode(this.read())) === "\r" ) void 0;
                else if(chr === "\n" ) break;
                else{
                    out += chr;
                }

            }
        }catch (e) {
            if(out!=null&&out.length>0) return out;
            return null;
        }

        return out;
    }

    public listOfLines():List<string>{
        let out:List<string> = new ArrayList(), chr:string;
        try {
            while( (chr = this.readLine()) )out.add(chr);
        }catch (e){
            return out;
        }
        return out;
    }

    public split(spliterator:RegExp):string[]{
        let out:string[] = null, chr:string, tmp:string = "";
        try {
            out = [];

            for(;;) {
                if((chr= String.fromCharCode(this.read())) ==="\r") void 0;
                else if( !spliterator.test(chr) ) tmp += chr;
                else{
                    out.push( tmp );
                    tmp = "";
                }
            }
            return out
        }catch (e) {
            if(out!==null&&out.length==0&&tmp.length>0) out.push(tmp);
            return out;
        }
        
    }

    public ready(): boolean {return true;}

    public close(): void {
        this.reader.close();
    }

}
Object.package(this);