import {Path} from "../file/Path";
import {OutputStream} from "../file/OutputStream";
/***
 * https://github.com/devGnode/logger20js
 * @writer   maroder
 * @version 1.0-R-JSTrip
 */
/****
 * @exportable
 */
export interface Log {
    warn( message:string, ...args:Object[] ):void
    warnOutputStream():OutputStream
    log( message:string, ...args:Object[] ):void
    logOutputStream():OutputStream
    info( message:string, ...args:Object[] ):void
    infoOutputStream():OutputStream
    debug( message:string, ...args:Object[] ):void
    debugOutputStream():OutputStream
    error( message:string, ...args:Object[] ):void
    errorOutputStream():OutputStream
    custom( message:string, ...args:Object[] ):void
    customOutputStream():OutputStream
    setPattern( pattern:string ):Log
    setProp( key:string, value:Object ):Log
    setPropObject( ...args:Object[] ):Log
}
/***
 * @private
 */
export interface FileRecording {
    saveLogState(state:boolean):void
    setFileMaxSize(sizeof:number):void
    setFileNamePattern(pattern:string):void
    setLogRotatePattern(timestamp:string):void
    setPath(path:Path):void

    canRecord():boolean
    isEnableLogRotate():boolean

    writeLn(message:string):boolean;
}
/***
 * @private
 */
export interface LogRotation {
    isExpired():boolean
    isValid():boolean
}