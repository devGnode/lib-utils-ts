import {Utils} from "./Utils";

// @ts-ignore
Number.prototype.equals = String.prototype.equals = function(value : string | number = "") : boolean {
    return this.valueOf()===value;
};
// @ts-ignore
String.prototype.equalsToIgnoreCase = function ( value : string = "") : boolean {
    return this.toString().toLowerCase()===value.toLowerCase();
};
// @ts-ignore
String.prototype.regExp = function ( regExp : RegExp = /.+/, callback : Function = null ) : string{
    return Utils.regExp(regExp,this.toString(),callback);
};