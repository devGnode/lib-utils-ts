"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const path = require("path");
require("../globalUtils");
class Path {
    constructor(pathA) {
        let p = path.parse(pathA);
        this.path = p.dir;
        this.file = p.name;
        this.ext = p.ext;
    }
    get() { return "%s/%s.%s".format(this.path, this.file, this.ext); }
    getPath() { return this.path; }
    getFileName() { return "%s.%s".format(this.file, this.ext); }
}
exports.Path = Path;
//# sourceMappingURL=Path.js.map