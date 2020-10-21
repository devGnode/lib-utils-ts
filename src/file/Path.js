"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
var path = require("path");
var Path = /** @class */ (function () {
    function Path(pathA) {
        var p = path.parse(pathA);
        this.path = p.dir;
        this.file = p.name;
        this.ext = p.ext;
    }
    Path.prototype.get = function () { return this.path + "/" + this.file + "." + this.ext; };
    Path.prototype.getPath = function () { return this.path; };
    Path.prototype.getFileName = function () { return "%s.%s".format(this.file, this.ext); };
    return Path;
}());
exports.Path = Path;
//# sourceMappingURL=Path.js.map