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
exports.PropertiesJson = exports.Properties = exports.PropertiesA = exports.AbstractProperties = void 0;
var IOStream_1 = require("./IOStream");
var Define_1 = require("../Define");
var Exception_1 = require("../Exception");
var List_1 = require("../List");
/***
 * Properties class, exportable :
 *   interface properties<V> extends IProperties<string,V>
 *  + AbstractProperties<V> implements properties<V>
 *
 *  + PropertiesA<V> extends AbstractProperties<V>
 *
 *  + Properties extends AbstractProperties<Object>
 *
 *  + PropertiesJson extends AbstractProperties<Object>
 *
 *  let prop : Properties = new Properties();
 *  prop.load(new FileReaderA("../../path"));
 */
var AbstractProperties = /** @class */ (function () {
    /***
     *
     */
    function AbstractProperties() {
        /***
         *
         */
        this.prop = new List_1.HashMap({});
    }
    /***
     *
     * @param key
     * @param defaultValue
     */
    AbstractProperties.prototype.getProperty = function (key, defaultValue) {
        Define_1.Define.of(key).orElseThrow(new Exception_1.NullPointerException("key value is null !"));
        return Define_1.Define.of(this.prop.get(key)).orNull(defaultValue);
    };
    /***
     *
     * @param key
     * @param value
     */
    AbstractProperties.prototype.setProperty = function (key, value) {
        Define_1.Define.of(key).orElseThrow(new Exception_1.NullPointerException("key value is null !"));
        this.prop.put(key, value);
    };
    /***
     * containsKey
     * @param key
     */
    AbstractProperties.prototype.hasKey = function (key) { return this.prop.keySet().contains(key); };
    /***
     *
     */
    AbstractProperties.prototype.stringPropertiesName = function () { return this.prop.keySet(); };
    /***
     * This method doesnt't support this annotation :
     *  prop=foo \
     *      bar
     *
     * Throw :
     *  - NullPointerException
     *  - IOException
     * @param input
     */
    AbstractProperties.prototype.load = function (input) {
        var _this = this;
        Define_1.Define.of(input).orElseThrow(new Exception_1.NullPointerException("target is null !"));
        this.path = input.getPath();
        input.getLines()
            .stream()
            .filter(function (value) { return !value.contains(/^\s*(\#|\!)/); })
            .each(function (value) {
            value.regExp(/\s*([\w\d\_\-\:\.]{1,})\=\s*([^\r\n]*)/, function (dummy, value) {
                console.log(String(value[2]).stripSlashes());
                if (String(value[2]).stripSlashes().contains(/\s*\\$/))
                    console.log("6556464646qs6d4q6d4sq64d6sq4d64sq6d4sq6d4sq");
                _this.prop.put(value[1], value[2]);
                return "";
            });
        });
        console.log(this.prop);
    };
    /***
     *
     */
    AbstractProperties.prototype.store = function (output) {
        var out = "";
        this.prop.stream().each(function (value, key) { out += key + "=" + value + "\n"; });
        output.write(out, false);
    };
    /***
     * Update properties before use this method, call load method.
     * This method are throwable :
     *  - NullPointerException
     *  - IOException
     */
    AbstractProperties.prototype.update = function () {
        var _this = this;
        Define_1.Define.of(this.path).orElseThrow(new Exception_1.NullPointerException("path is null !"));
        var file = new IOStream_1.FileReaderA(this.path).getLines(), itr = this.prop.keySet().iterator(), str, found = false;
        while (itr.hasNext()) {
            str = itr.next();
            file.stream().each(function (value, key) {
                if (value.contains(new RegExp("^s*" + str + "s*"))) {
                    file.set(Number(key), str + "=" + _this.getProperty(str));
                    found = true;
                }
            });
            if (!found)
                file.add(str + "=" + this.getProperty(str));
            found = false;
        }
        new IOStream_1.FileWriter(this.path).write(file.toArray().join("\n"));
    };
    return AbstractProperties;
}());
exports.AbstractProperties = AbstractProperties;
/***
 *
 */
var PropertiesA = /** @class */ (function (_super) {
    __extends(PropertiesA, _super);
    function PropertiesA() {
        return _super.call(this) || this;
    }
    return PropertiesA;
}(AbstractProperties));
exports.PropertiesA = PropertiesA;
/***
 *
 */
var Properties = /** @class */ (function (_super) {
    __extends(Properties, _super);
    function Properties() {
        return _super.call(this) || this;
    }
    return Properties;
}(AbstractProperties));
exports.Properties = Properties;
/**
 *
 *
 * */
var PropertiesJson = /** @class */ (function (_super) {
    __extends(PropertiesJson, _super);
    /***
     *
     */
    function PropertiesJson() {
        return _super.call(this) || this;
    }
    /***
     * Throw :
     *  - NullPointerException
     *  - IOException
     *  - JSONException
     * @param input
     */
    PropertiesJson.prototype.load = function (input) {
        Define_1.Define.of(input).orElseThrow(new Exception_1.NullPointerException("target is null !"));
        this.path = input.getPath();
        try {
            this.prop = new List_1.HashMap(JSON.parse(input.toString()));
        }
        catch (e) {
            throw new Exception_1.JSONException("Wrong parsing file : " + input.getPath());
        }
    };
    /***
     *
     */
    PropertiesJson.prototype.store = function (output) {
        var out = "";
        Define_1.Define.of(output).orElseThrow(new Exception_1.NullPointerException("target output stream is null !"));
        this.prop.stream().each(function (value, key) { out += "\t\"" + key + "\":\"" + value + "\",\n"; });
        output.write("{\n%s\n}".format(out.replace(/,\n*$/, "")), false);
    };
    /***
     * As Json properties file doesn't support comment
     * just make a store
     */
    PropertiesJson.prototype.update = function () { this.store(new IOStream_1.FileWriter(this.path)); };
    return PropertiesJson;
}(AbstractProperties));
exports.PropertiesJson = PropertiesJson;
//# sourceMappingURL=Properties.js.map