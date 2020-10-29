"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesJson = exports.Properties = exports.PropertiesA = exports.AbstractProperties = void 0;
const IOStream_1 = require("./IOStream");
const Define_1 = require("../Define");
const Exception_1 = require("../Exception");
const List_1 = require("../List");
require("../globalUtils");
class AbstractProperties {
    constructor() {
        this.prop = new List_1.HashMap({});
    }
    getProperty(key, defaultValue) {
        Define_1.Define.of(key).orElseThrow(new Exception_1.NullPointerException("key value is null !"));
        return Define_1.Define.of(this.prop.get(key)).orNull(defaultValue);
    }
    setProperty(key, value) {
        Define_1.Define.of(key).orElseThrow(new Exception_1.NullPointerException("key value is null !"));
        this.prop.put(key, value);
    }
    hasKey(key) { return this.prop.keySet().contains(key); }
    stringPropertiesName() { return this.prop.keySet(); }
    load(input) {
        Define_1.Define.of(input).orElseThrow(new Exception_1.NullPointerException("target is null !"));
        let chunk = null, chunkKey, push = false;
        this.path = input.getPath();
        input.getLines()
            .stream()
            .filter(value => !value.contains(/^\t*\s*(\#|\!)/))
            .each(value => {
            if (chunk === null)
                value.regExp(/\t*\s*([\w\d\_\-\:\.]{1,})\t*\s*\=\t*\s*([^\r\n]*)/, (dummy, value) => {
                    if (String(value[2]).stripSlashes().contains(/\s{1,}\\\t*\s*$/)) {
                        chunkKey = value[1];
                        chunk = String(value[2]).replace(/\\$|^\s*\t*/g, "");
                    }
                    else
                        this.prop.put(value[1], value[2]);
                    return "";
                });
            else if (chunk !== null && !push) {
                if (!String(value).stripSlashes().contains(/\s{1,}\\\t*\s*$/))
                    push = true;
                chunk += value.replace(/\\$|^\s*\t*/g, "");
                if (push) {
                    this.prop.put(chunkKey, chunk);
                    chunkKey = chunk = null;
                    push = false;
                }
            }
        });
    }
    store(output) {
        let out = "";
        this.prop.stream().each((value, key) => { out += `${key}=${value}\n`; });
        output.write(out, false, "utf8", true);
    }
    update() {
        Define_1.Define.of(this.path).orElseThrow(new Exception_1.NullPointerException("path is null !"));
        let file = new IOStream_1.FileReader(this.path).getLines(), itr = this.prop.keySet().iterator(), str, found = false;
        while (itr.hasNext()) {
            str = itr.next();
            file.stream().each((value, key) => {
                if (value.contains(new RegExp(`^\s*${str}\s*`))) {
                    file.set(Number(key), `${str}=${this.getProperty(str)}`);
                    found = true;
                }
            });
            if (!found)
                file.add(`${str}=${this.getProperty(str)}`);
            found = false;
        }
        new IOStream_1.FileWriter(this.path).write(file.toArray().join("\n"));
    }
}
exports.AbstractProperties = AbstractProperties;
class PropertiesA extends AbstractProperties {
    constructor() { super(); }
}
exports.PropertiesA = PropertiesA;
class Properties extends AbstractProperties {
    constructor() { super(); }
}
exports.Properties = Properties;
class PropertiesJson extends AbstractProperties {
    constructor() {
        super();
        this.truncate = false;
    }
    load(input) {
        Define_1.Define.of(input).orElseThrow(new Exception_1.NullPointerException("target is null !"));
        this.path = input.getPath();
        try {
            this.prop = new List_1.HashMap(JSON.parse(input.toString()));
        }
        catch (e) {
            throw new Exception_1.JSONException(`Wrong parsing file : ${input.getPath()}`);
        }
    }
    store(output) {
        let out = "";
        Define_1.Define.of(output).orElseThrow(new Exception_1.NullPointerException("target output stream is null !"));
        this.prop.stream().each((value, key) => { out += `\t"${key}":"${value}",\n`; });
        output.write("{\n%s\n}".format(out.replace(/,\n*$/, "")), this.truncate);
        this.truncate = false;
    }
    update() { this.truncate = true; this.store(new IOStream_1.FileWriter(this.path)); }
}
exports.PropertiesJson = PropertiesJson;
//# sourceMappingURL=Properties.js.map