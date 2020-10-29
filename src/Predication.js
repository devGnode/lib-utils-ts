"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Predication = void 0;
const List_1 = require("./List");
class Predication {
    constructor() {
        this.plist = new List_1.ArrayList();
    }
    and(Predicate) {
        throw new Error("no predicate implemented");
    }
    or(Predicate) {
        throw new Error("no predicate implemented");
    }
    test(value) {
        return this.plist
            .stream()
            .mapTo((v) => {
            if (v instanceof Predication)
                return v.test(String(value));
            else {
                return v(String(value));
            }
        })
            .allMatch(value => value === true);
    }
}
exports.Predication = Predication;
//# sourceMappingURL=Predication.js.map