"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONException = exports.IOException = exports.NoSuchElementException = exports.NullPointerException = exports.IndexOfBoundException = exports.RuntimeException = void 0;
/***
 * Exception Area
 */
var RuntimeException = /** @class */ (function (_super) {
    __extends(RuntimeException, _super);
    function RuntimeException(message, code) {
        if (message === void 0) { message = null; }
        if (code === void 0) { code = 0; }
        var _this = _super.call(this, message) || this;
        _this.name = RuntimeException["name"];
        return _this;
    }
    return RuntimeException;
}(Error));
exports.RuntimeException = RuntimeException;
var IndexOfBoundException = /** @class */ (function (_super) {
    __extends(IndexOfBoundException, _super);
    function IndexOfBoundException(message) {
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        _this.name = IndexOfBoundException["name"];
        return _this;
    }
    return IndexOfBoundException;
}(Error));
exports.IndexOfBoundException = IndexOfBoundException;
var NullPointerException = /** @class */ (function (_super) {
    __extends(NullPointerException, _super);
    function NullPointerException(message) {
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        _this.name = NullPointerException["name"];
        return _this;
    }
    return NullPointerException;
}(Error));
exports.NullPointerException = NullPointerException;
var NoSuchElementException = /** @class */ (function (_super) {
    __extends(NoSuchElementException, _super);
    function NoSuchElementException(message) {
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        _this.name = NoSuchElementException["name"];
        return _this;
    }
    return NoSuchElementException;
}(Error));
exports.NoSuchElementException = NoSuchElementException;
var IOException = /** @class */ (function (_super) {
    __extends(IOException, _super);
    function IOException(message) {
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        _this.name = IOException["name"];
        return _this;
    }
    return IOException;
}(Error));
exports.IOException = IOException;
var JSONException = /** @class */ (function (_super) {
    __extends(JSONException, _super);
    function JSONException(message) {
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        _this.name = IOException["name"];
        return _this;
    }
    return JSONException;
}(Error));
exports.JSONException = JSONException;
//# sourceMappingURL=Exception.js.map