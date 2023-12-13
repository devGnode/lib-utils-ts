import {consumer, IConsumer, iterator, List, predicate, predicateFn, predication} from "../Interface";
import {File} from "./File";
import {Objects} from "../type/Objects";
import {Consumer} from "../Consumer";
import {ArrayList} from "../utils/ArrayList";
import {Predication} from "../utils/Predication";
/***
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export class TreeDir{

    private readonly file:File                   = null;
    private predicate:predicate<File>            = null;
    private readonly deep:number                 = 1;
    private iterate:number;

    protected static readonly PassPredicate = class PassPredicate implements predicate<File>{
        test: predicateFn<File> = (file:File)=>true;
    };

    public constructor(file:File, deep:number = 1 ) {
        this.file    = file;
        this.deep    = deep==null?1:deep;
        this.iterate = 0;
    }
    /***
     * @return {File}
     */
    public getFile():File{return this.file;}
    /***
     * @return {number}
     */
    public getDeep():number{ return this.deep;}
    /***
     * @return {number}
     */
    public getIterate():number{ return this.iterate;}
    /***
     * @return {predicate<File>}
     */
    public getPredicate():predicate<File>{return !Objects.isNull(this.predicate) ? this.predicate : new TreeDir.PassPredicate();}
    /***
     * @param {predication<File>} predicate
     * @return {TreeDir}
     */
    public setPredicate(predicate:predication<File>):TreeDir{
        this.predicate = Predication.of(predicate);
        return this;
    }
    /***
     * @param {consumer<File>} consumer
     */
    public read(consumer:consumer<File>){return this.read0(this,Consumer.of(consumer));}
    /***
     * @return {List<File>}
     */
    public getList():List<File>{
        let out:List<File> = new ArrayList();
        this.read((o:File)=>out.add(o));
        return out;
    }
    /***
     *
     * @param {TreeDir} self
     * @param {IConsumer<File>} consumer
     */
    protected read0(self:TreeDir, consumer:IConsumer<File>){
        let files:iterator<File>, file:File, slf:this=this;
        files = Array.asList(Objects.requireNotNull(self.getFile().listFiles()))
            .listIterator();

        while(files.hasNext()){
            file = files.next();
            if(file.isFile()&&this.getPredicate().test(file)) consumer.accept(file);
            if(file.isDirectory()&& this.getIterate() < this.getDeep() ){
                this.iterate++;
                this.read0(new class extends TreeDir{
                    constructor() {super(file, slf.iterate);}
                    public getIterate(): number {return slf.iterate;}
                    public getPredicate(): predicate<File> {return slf.predicate;}
                }, consumer);
                this.iterate=0;
            }
        }
    }
    /***
     * @param {string} path
     * @param {number} depp
     * @return {TreeDir}
     */
    public static of(path:string, depp?:number):TreeDir{ return new TreeDir(new File(path),depp); }

    public static from(pattern:string):List<File>{
        let file:File= new File(pattern);

        if(file.isFile()) return Array.list(file);
        if(file.isDirectory())return TreeDir.of(file.toString(), 0).getList();
        else{
            let deep:number = 0,
                ext:string;

            if(file.getParent()&&file.getParentFile().getName().startsWith("*")){
                deep=50;
                ext=file.getName().replace("*","");
                file=file.getParentFile().getParentFile();
            }else if(file.getName().startsWith("*")){
                deep=0;
                ext=file.getName().replace("*","");
                file=file.getParentFile();
            }

            return TreeDir
                .of(file.toString(),deep)
                .setPredicate((file:File)=>Objects.isNull(ext)?true:file.isFile()&&file.getName().endsWith(ext))
                .getList();
        }

    }
}
Object.package(this);