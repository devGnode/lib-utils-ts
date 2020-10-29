"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static regExp(regexp = /.+/, value, callback) {
        try {
            let tmp, toReplace;
            while ((tmp = regexp.exec(value))) {
                toReplace = callback !== undefined ? callback.call(tmp, value, tmp) : "";
                value = value.replace(tmp[0], toReplace);
            }
        }
        catch (e) {
            return value;
        }
        return value;
    }
    static merge(objA = {}, ...args) {
        try {
            let i = 0, objB;
            while ((objB = args[i])) {
                for (let tmp in objB)
                    if (!objA[tmp])
                        objA[tmp] = objB[tmp];
                i++;
            }
        }
        catch (e) {
            return objA;
        }
        return objA;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map