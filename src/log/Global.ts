import {Path} from "../file/Path";
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
    log( message:string, ...args:Object[] ):void
    info( message:string, ...args:Object[] ):void
    debug( message:string, ...args:Object[] ):void
    error( message:string, ...args:Object[] ):void
    custom( message:string, ...args:Object[] ):void
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