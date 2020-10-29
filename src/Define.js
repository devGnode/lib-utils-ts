"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Define = void 0;
class Define {
    constructor(value) {
        this.value = null;
        this.value = value;
    }
    isNullable() { return this.isNull(); }
    isNull() { return this.value === null || this.value === undefined; }
    orNull(value) { return this.isNull() ? value : this.value; }
    orElseThrow(exception) {
        if (this.isNull())
            throw exception;
        return this.value;
    }
    getType() { return typeof this.value; }
    valueOf() { return this.value; }
    toString() { return String(this.value); }
    static of(value) { return new Define(value); }
}
exports.Define = Define;
//# sourceMappingURL=Define.js.map