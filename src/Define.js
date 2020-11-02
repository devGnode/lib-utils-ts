"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Define = void 0;
const Optional_1 = require("./Optional");
class Define extends Optional_1.Optional {
    constructor(value) { super(value); }
    isNullable() { return this.isNull(); }
    isNull() { return this.value === null || this.value === undefined; }
    orNull(value) { return this.isNull() ? value : this.value; }
    orElseThrow(exception) {
        if (this.isNull())
            throw exception;
        return this.value;
    }
    orThrow(exception) {
        if (this.isNull())
            throw exception;
        return this;
    }
    getType() { return typeof this.value; }
    valueOf() { return this.value; }
    toString() { return String(this.value); }
    static of(value) { return new Define(value); }
}
exports.Define = Define;
//# sourceMappingURL=Define.js.map