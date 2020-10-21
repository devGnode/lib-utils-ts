"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var fs_1 = require("fs");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.regExp = function (regexp, value, callback) {
        if (regexp === void 0) { regexp = /.+/; }
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
    /***
     * @param directory
     * @return {boolean}
     */
    Utils.exists = function (directory) {
        if (directory === void 0) { directory = null; }
        try {
            fs_1.statSync(directory);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map