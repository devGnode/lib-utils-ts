import {comparable, comparator, iterator, MapEntries} from "../Interface";
import {HashMap} from "../utils/HashMap";
import {Objects} from "./Objects";

const local_round = (value:number):string=>String(value).length%2===0?"0"+String(value):String(value);
/***
 * @Dates : Proxy class, allow to extend the prototype
 * of the native String or string Object. Dont forget to
 * implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class Dates extends Date implements comparable<Date>{
    /***
     *
     */
    public plusDays( days : number ) : Date{return new Date( this.setDate( this.getDate() + days ) );}
    /***
     *
     */
    public lessDays( days : number ) : Date{return this.plusDays(-Math.abs(days));}
    /***
     *
     */
    public plusYears( years : number ) : Date{return this.plusDays(365*years );}
    /***
     *
     */
    public lessYears( years : number ) : Date{return this.plusYears(-Math.abs(years));}
    /***
     *
     */
    public elapsedTime( date : Date ) : number{return this.getTime()-date.getTime();}
    /***
    *
    */
    private static compareDate: comparator<Date> = new class implements comparator<Date>{
        public compare(o1:Date, o2: Date): number {
            if(Objects.isNull(o1)&&Objects.isNull(o2)||Objects.isNull(o1)||Objects.isNull(o2)) return 0;
            let tmp:number;
            return (tmp = o1.elapsedTime( o2 )) > 0 ? 1 : tmp < 0 ? -1 : tmp;
        }
    }
    /***
     *
     */
    public compareTo( date:Date): number{ return Dates.compareDate.compare(this,date); }
    /***
     *
     */
    public dateFormat( pattern : string ) : string{
        let now =this instanceof Date ? this : new Date(), tmp:MapEntries<string, Object>;
        let itr:iterator<MapEntries<string, Object>> = HashMap.of({
            YYYY:now.getFullYear(), YY: String(now.getFullYear()).substring(2,4),
            MM:local_round(now.getMonth()+1),dd: local_round(now.getDate()),
            hh:local_round(now.getHours()), mm: local_round( now.getMinutes()),
            ss:local_round(now.getSeconds()),ms:now.getMilliseconds()
        }).entrySet().iterator();
        while(itr.hasNext()){
            tmp = itr.next();
            pattern = pattern.replace(new RegExp("\%"+tmp.getKey().toString()),tmp.getValue.toString());
        }
        return pattern;
    }
}
Object.package(this);