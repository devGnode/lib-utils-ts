"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIterator = exports.Iterator = void 0;
const Exception_1 = require("./Exception");
class Iterator {
    constructor(value) {
        this.iteration = 0;
        this.list = [];
        this.list = value;
    }
    get(key) {
        if (this.list[key] === undefined)
            throw new Exception_1.NoSuchElementException(`elements [ ${key} ] is not defined`);
        return this.list[key];
    }
    hasNext() {
        return this.iteration + 1 <= this.list.length;
    }
    next() {
        let key = this.iteration;
        this.iteration++;
        return this.get(key);
    }
}
exports.Iterator = Iterator;
class ListIterator extends Iterator {
    constructor(listIterate) {
        super(listIterate);
    }
    add(e) {
        this.list[this.iteration++] = e;
    }
    ;
    hasPrevious() {
        try {
            this.get(this.iteration - 1);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    nextIndex() {
        try {
            this.get(this.iteration);
            return this.iteration;
        }
        catch (e) {
            return null;
        }
    }
    ;
    previous() {
        this.iteration--;
        return this.get(this.iteration);
    }
    set(e) {
        this.list[this.iteration - 1] = e;
    }
}
exports.ListIterator = ListIterator;
//# sourceMappingURL=Iterator.js.map