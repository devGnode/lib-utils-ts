"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.regExp = function (regexp, value, callback) {
        if (regexp === void 0) { regexp = /.+/; }
        if (value === void 0) { value = ""; }
        if (callback === void 0) { callback = undefined; }
        if (typeof value !== "string")
            return value;
        try {
            var tmp = void 0, toReplace = void 0;
            while ((tmp = regexp.exec(value))) {
                toReplace = callback !== undefined ? callback.call(tmp, value, tmp) : "";
                value = value.replace(tmp[0], toReplace);
            }
        }
        catch (e) {
            return value;
        }
        return value;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map