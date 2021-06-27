import {HashMap} from "../List";
import {comparable, comparator} from "../Interface";

const local_round = value=>value.length%2===0?"0"+value:value;
/***
 * @DateA : Proxy class, allow to extend the prototype of the native Object.
 * Dont forget to implement your method in global interface ObjectConstructor,
 * Location of this interface is in Interfaces.ts
 */
export abstract class DateA extends Date implements comparable<Date>{
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
            return o1.elapsedTime( o2 );
        }
    }
    /***
     *
     */
    public compareTo( date:Date): number{ return DateA.compareDate.compare(this,date); }
    /***
     *
     */
    public dateFormat( pattern : string ) : string{
        let now =this instanceof Date ? this : new Date();
        HashMap.of<string,string>({
            YYYY:now.getFullYear(), YY: String(now.getFullYear()).substring(2,4),
            MM:local_round(now.getMonth()+1),dd: local_round(now.getDate()),
            hh:local_round(now.getHours()), mm: local_round( now.getMinutes()),
            ss:local_round(now.getSeconds()),ms:now.getMilliseconds()
        }).each((value,key)=>{
            pattern = pattern.replace(new RegExp("\%"+key),value);
        });
        return pattern;
    }
}