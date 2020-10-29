"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONException = exports.IOException = exports.NoSuchElementException = exports.NullPointerException = exports.IndexOfBoundException = exports.RuntimeException = void 0;
class RuntimeException extends Error {
    constructor(message = null, code = 0) {
        super(message);
        this.name = RuntimeException["name"];
    }
}
exports.RuntimeException = RuntimeException;
class IndexOfBoundException extends Error {
    constructor(message = null) {
        super(message);
        this.name = IndexOfBoundException["name"];
    }
}
exports.IndexOfBoundException = IndexOfBoundException;
class NullPointerException extends Error {
    constructor(message = null) {
        super(message);
        this.name = NullPointerException["name"];
    }
}
exports.NullPointerException = NullPointerException;
class NoSuchElementException extends Error {
    constructor(message = null) {
        super(message);
        this.name = NoSuchElementException["name"];
    }
}
exports.NoSuchElementException = NoSuchElementException;
class IOException extends Error {
    constructor(message = null) {
        super(message);
        this.name = IOException["name"];
    }
}
exports.IOException = IOException;
class JSONException extends Error {
    constructor(message = null) {
        super(message);
        this.name = IOException["name"];
    }
}
exports.JSONException = JSONException;
//# sourceMappingURL=Exception.js.map