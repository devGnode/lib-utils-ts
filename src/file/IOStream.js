"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriter = exports.OutputStreamWriter = exports.FileReader = exports.InputStreamReader = exports.AbstractIOFile = void 0;
const fs = require("fs");
const Exception_1 = require("../Exception");
const Define_1 = require("../Define");
const fs_1 = require("fs");
const Path_1 = require("./Path");
require("../globalUtils");
const Iterator_1 = require("../Iterator");
class AbstractIOFile {
    constructor(file) {
        this.file = null;
        this.file = file;
    }
    getPath() { return this.file; }
    getFileName() { return new Path_1.Path(this.file).getFileName(); }
    static exists(path) {
        try {
            fs_1.statSync(path.get());
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static getFileSize(filename = "") {
        try {
            let stats = fs_1.statSync(filename);
            return stats["size"];
        }
        catch (e) {
            return -1;
        }
    }
}
exports.AbstractIOFile = AbstractIOFile;
class InputStreamReader extends AbstractIOFile {
    constructor(file) {
        super(file);
        this.data = [];
        this.index = 0;
        try {
            this.data = (fs.readFileSync(file, 'utf8') || "").split("");
        }
        catch (e) {
            throw new Exception_1.IOException(`File not found : ${file}`);
        }
    }
    size() { return this.data.length; }
    reset() { this.index = 0; }
    read() { return Define_1.Define.of(this.data[this.index++]).orElseThrow(new Exception_1.NullPointerException("target is null !")); }
    getLines() { return this.toString().explodeAsList(/\r|\n|\n/); }
    getIterator() { return new Iterator_1.Iterator(this.data); }
    toString() { return String(this.data.join("")); }
}
exports.InputStreamReader = InputStreamReader;
class FileReader extends InputStreamReader {
    constructor(file) { super(file); }
}
exports.FileReader = FileReader;
class OutputStreamWriter extends AbstractIOFile {
    constructor(file, flag = "a", truncate = true) {
        super(file);
        this.flag = "a";
        this.truncate = true;
        this.flag = flag;
        this.truncate = truncate;
    }
    setTruncate(state) { this.truncate = state; }
    setFlag(flag) { this.flag = flag; }
    write(data, truncate = true, encoding = "utf8", create = true) {
        try {
            if (!OutputStreamWriter.exists(new Path_1.Path(this.file)) && create)
                fs_1.mkdirSync(new Path_1.Path(this.file).getPath(), { recursive: true });
            if (truncate)
                fs.truncateSync(this.file, 0);
            fs_1.writeFileSync(this.file, data, { encoding: encoding, flag: this.flag });
        }
        catch (e) {
            throw new Exception_1.IOException(`Something wrong : ${e.message}`);
        }
    }
}
exports.OutputStreamWriter = OutputStreamWriter;
class FileWriter extends OutputStreamWriter {
    constructor(file) { super(file); }
}
exports.FileWriter = FileWriter;
//# sourceMappingURL=IOStream.js.map