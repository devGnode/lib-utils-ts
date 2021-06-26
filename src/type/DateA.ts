import {HashMap} from "../List";

const local_round = value=>value.length%2===0?"0"+value:value;

export abstract class DateA extends Date{
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
    public elapsedTime( date : Date ) : number{return this.getTime()- date.getTime();}
    /***
     *
     */
    public compareTo( date:Date): number{ return this.elapsedTime(date); }
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