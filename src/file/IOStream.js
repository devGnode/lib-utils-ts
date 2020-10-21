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
exports.FileWriter = exports.OutputStreamWriter = exports.FileReaderA = exports.InputStreamReader = void 0;
var fs = require("fs");
var Exception_1 = require("../Exception");
var Define_1 = require("../Define");
var fs_1 = require("fs");
var Path_1 = require("./Path");
var InputStreamReader = /** @class */ (function () {
    function InputStreamReader(file) {
        this.file = null;
        this.data = null;
        this.index = 0;
        try {
            this.file = file;
            this.data = (fs.readFileSync(file, 'utf8') || "").split("");
        }
        catch (e) {
            throw new Exception_1.IOException("File not found : " + file);
        }
    }
    InputStreamReader.prototype.read = function () { return Define_1.Define.of(this.data[this.index++]).orElseThrow(new Exception_1.NullPointerException("target is null !")); };
    InputStreamReader.prototype.getPath = function () { return this.file; };
    InputStreamReader.prototype.getLines = function () { return this.toString().explodeAsList(/\r|\n|\n/); };
    InputStreamReader.prototype.toString = function () { return this.data.join(""); };
    InputStreamReader.prototype.getFileName = function () {
        return "";
    };
    return InputStreamReader;
}());
exports.InputStreamReader = InputStreamReader;
/***
 *
 */
var FileReaderA = /** @class */ (function (_super) {
    __extends(FileReaderA, _super);
    function FileReaderA(file) {
        return _super.call(this, file) || this;
    }
    return FileReaderA;
}(InputStreamReader));
exports.FileReaderA = FileReaderA;
/***
 */
var OutputStreamWriter = /** @class */ (function () {
    function OutputStreamWriter(file, flag) {
        if (flag === void 0) { flag = "a"; }
        this.file = null;
        this.flag = "a";
        this.file = file;
        this.flag = flag;
    }
    OutputStreamWriter.prototype.write = function (data, truncate, encoding, create) {
        if (truncate === void 0) { truncate = true; }
        if (encoding === void 0) { encoding = "utf8"; }
        if (create === void 0) { create = true; }
        try {
            if (!OutputStreamWriter.exists(new Path_1.Path(this.file)) && create)
                fs_1.mkdirSync(new Path_1.Path(this.file).getPath(), { recursive: true });
            if (truncate)
                fs.truncateSync(this.file, 0);
            fs_1.writeFileSync(this.file, data, { encoding: encoding, flag: this.flag });
        }
        catch (e) {
            throw new Exception_1.IOException("Something wrong : " + e.message);
        }
    };
    OutputStreamWriter.exists = function (path) {
        try {
            fs_1.statSync(path.get());
            return true;
        }
        catch (e) {
            return false;
        }
    };
    OutputStreamWriter.prototype.getPath = function () { return this.file; };
    OutputStreamWriter.prototype.getFileName = function () {
        return "";
    };
    return OutputStreamWriter;
}());
exports.OutputStreamWriter = OutputStreamWriter;
var FileWriter = /** @class */ (function (_super) {
    __extends(FileWriter, _super);
    function FileWriter(file) {
        return _super.call(this, file) || this;
    }
    return FileWriter;
}(OutputStreamWriter));
exports.FileWriter = FileWriter;
//# sourceMappingURL=IOStream.js.map