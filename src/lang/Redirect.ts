import {Enum} from "../Enum";
import {File} from "../file/File";
import {Objects} from "../type/Objects";
/***/
class Type extends Enum{

    @Enum.args()
    static PIPE:Type;

    @Enum.args()
    static INHERIT:Type;

    @Enum.args()
    static READ:Type;

    @Enum.args()
    static WRITE:Type;

    @Enum.args()
    static APPEND:Type;

}
/***
 * @version 4.0-R-libUtilsTs
 * @version 1.0-R-JSTrip
 */
export class Redirect {

    public static readonly Type = Type;

    private constructor() {}

    public static readonly PIPE:Redirect= new class extends Redirect{
        public type():Type{ return Type.PIPE; }
        public toString():string{ return this.type().toString(); }
    };

    public static readonly INHERIT:Redirect= new class extends Redirect{
        public type():Type{ return Type.INHERIT; }
        public toString():string{ return this.type().toString(); }
    };

    public static from(file:File):Redirect{
        Objects.requireNotNull(file);
        return new class extends Redirect{
            public type():Type{ return Type.READ; }
            public file():File{ return file; }
            public toString():string {return "redirect to read from file \"" + file.toString() + "\"";}
        }
    }

    public static to(file:File):Redirect{
        Objects.requireNotNull(file);
        return new class extends Redirect{
            public type():Type{ return Type.WRITE; }
            public file():File{ return file; }
            public toString():string {return "redirect to write to file \"" + file.toString() + "\"";}
        }
    }

    public static append(file:File):Redirect{
        Objects.requireNotNull(file);
        return new class extends Redirect{
            public type():Type{ return Type.APPEND; }
            public file():File{ return file; }
            public append():boolean{return true;}
            public toString():string {return "redirect to append to file \"" + file.toString() + "\"";}
        }
    }

    public type():Type{ return null; }

    public file():File{ return null; }

    public append():boolean{return false;}
    /***
     * @override
     * @param {Object} o
     */
    public equals(o:Object){
        if(o==this) return true;
        if(!(o instanceof Redirect)) return false;
        if(this.file()!=null&&!this.file().equals(o.file())) return false;
        return o.type().equals(this.type());
    }
}
Object.package(this);