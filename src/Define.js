"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Define = void 0;
/***
 *
 */
var Define = /** @class */ (function () {
    /***
     *
     * @param value
     */
    function Define(value) {
        /***
         *
         */
        this.value = null;
        this.value = value;
    }
    /***
     *
     */
    Define.prototype.isNullable = function () { return this.isNull(); };
    /***
     *
     */
    Define.prototype.isNull = function () { return this.value === null || this.value === undefined; };
    /***
     *
     * @param value
     */
    Define.prototype.orNull = function (value) { return this.isNull() ? value : this.value; };
    /***
     *
     * @param exception
     */
    Define.prototype.orElseThrow = function (exception) {
        if (this.isNull())
            throw exception;
        return this.value;
    };
    /***
     *
     */
    Define.prototype.getType = function () { return typeof this.value; };
    /***
     *
     */
    Define.prototype.valueOf = function () { return this.value; };
    /***
     *
     */
    Define.prototype.toString = function () { return String(this.value); };
    /***
     *
     * @param value
     */
    Define.of = function (value) { return new Define(value); };
    return Define;
}());
exports.Define = Define;
//# sourceMappingURL=Define.js.map