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
exports.NoSuchElementException = exports.NullPointerException = exports.indexOfBoundException = void 0;
var indexOfBoundException = /** @class */ (function (_super) {
    __extends(indexOfBoundException, _super);
    function indexOfBoundException(message) {
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        _this.name = indexOfBoundException["name"];
        return _this;
    }
    return indexOfBoundException;
}(Error));
exports.indexOfBoundException = indexOfBoundException;
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
//# sourceMappingURL=Exception.js.map