"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predication = void 0;
var List_1 = require("./List");
var Predication = /** @class */ (function () {
    function Predication() {
        this.plist = new List_1.ArrayList();
    }
    Predication.prototype.and = function (Predicate) {
        throw new Error("no predicate implemented");
    };
    Predication.prototype.or = function (Predicate) {
        throw new Error("no predicate implemented");
    };
    Predication.prototype.test = function (value) {
        return this.plist
            .stream()
            .mapTo(function (v) {
            if (v instanceof Predication)
                return v.test(String(value));
            else {
                return v(String(value));
            }
        })
            .allMatch(function (value) { return value === true; });
    };
    return Predication;
}());
exports.Predication = Predication;
//# sourceMappingURL=Predication.js.map