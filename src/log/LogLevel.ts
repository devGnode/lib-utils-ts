import {Enum} from "../Enum";
/***
 * https://github.com/devGnode/logger20js
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
export class LogLevel extends Enum{
    @Enum.args() static readonly ALL:LogLevel;
    @Enum.args() static readonly LOG:LogLevel;
    @Enum.args() static readonly DEBUG:LogLevel;
    @Enum.args() static readonly ERROR:LogLevel;
    @Enum.args() static readonly INFO:LogLevel;
    @Enum.args() static readonly CUSTOM:LogLevel;
    @Enum.args() static readonly WARN:LogLevel;
}
Object.package(this);