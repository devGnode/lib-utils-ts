"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flombok = void 0;
var flombok;
(function (flombok) {
    function GETTER(readOnly = false) {
        return function (target, key) {
            let name = key.substr(0, 1).toUpperCase() + key.substr(1, key.length);
            Object.defineProperty(target, "get" + name, {
                writable: !(readOnly),
                value: function () { return this[key]; }
            });
        };
    }
    flombok.GETTER = GETTER;
    function SETTER(readOnly = false) {
        return function (target, key) {
            let name = key.substr(0, 1).toUpperCase() + "" + key.substr(1, key.length);
            Object.defineProperty(target, "set" + name, {
                writable: !(readOnly),
                value: function (value) { this[key] = value; }
            });
        };
    }
    flombok.SETTER = SETTER;
})(flombok = exports.flombok || (exports.flombok = {}));
//# sourceMappingURL=flombok.js.map