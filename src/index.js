'use strict'

let ns = {};

ns.isArray = function (arg) 
{
    return Object.prototype.toString.call(arg) 
        === '[object Array]';
};

ns.isObject = function (arg) 
{
    return ns.getType(arg) === "object";
};

ns.isNumber = function (arg) 
{
    return typeof arg === "number";
};

ns.isDate = function (arg)
{
    return arg instanceof Date;
};

ns.getType = function (arg)
{
    if (arg == null) { 
        return arg.toString().toLowerCase(); 
    } 

    var type = Object.prototype.toString
        .call(arg).slice(8,-1).toLowerCase();

    if (type === 'generatorfunction') { 
        return 'function' 
    }

    if (type.match(new RegExp(
        "^(array|bigint|date|" +
        "error|function|generator|" +
        "regexp|symbol)$"
    ))) {
        return type;
    }

    return (
        typeof arg === 'object' || 
        typeof arg === 'function'
    ) ? 'object' : typeof arg;
};

ns.bytes = function (arg) 
{
    // TODO -- ...
    return 0;
};

ns.toJSON = function (arg)
{
    // TODO - add polyfill
    return JSON.stringify(arg);
};

ns.fromJSON = function (arg) 
{
    // TODO - add polyfill
    return JSON.parse(arg);
};

ns.formatDate = function (arg)
{
    if (ns.isDate(arg)) {
        return arg.getFullYear() + "-" +
            ("0" + arg.getMonth()).slice(-2) + "-" +
            ("0" + arg.getDate()).slice(-2) + " " + 
            
    } else if (ns.isString(arg)) {

    }
};

ns.serialize = function (arg, level) 
{
    var type = ns.getType(arg), temp, result;

    level = ns.isNumber(level) ? level : 0;
    switch (type) {
        case "string":
        case "number":
        case "boolean":
        case "undefined":
        case "function":
            result = {
                t: type.charAt(0),
                v: arg.toString()
            };
            break;
            
        case "object":
            if (angular.isDate($value)){
                // Date
                result = {
                    type: "d",
                    value: $filter("date")($value, "yyyy-MM-dd HH:mm:ss")
                };
            } 
            
            else if (angular.isArray($value)) {
                // Array
                temp = [];
                for (var i = 0; i < $value.length; i++) {
                    temp.push(serialize($value[i], $level + 1));
                }
                result = {
                    type: "a",
                    value: temp
                };
            }
            
            else if (
                value instanceof Element ||
                value instanceof HTMLElement ||
                value instanceof HTMLDocument
            ) {
                // HTML Element
                console.warn ("TODO - serialize html elements");
            } 
            
            else {
                // POJO
                temp = {};
                for (var key in $value) {
                    temp[key] = serialize($value[key], $level + 1);
                }
                result = {
                    type: "o",
                    value: temp
                };
            }
            break;
        }

        // only json encode at the end - to save characters
        return (!$level) ? angular.toJson(result) : result;

};

ns.unserialize = function (arg) 
{

};

ns.param = function param (arg) 
{
    var ret = "";
    for (var p in arg) {

    }
};

ns.unparam = function (arg) 
{

};

ns.base64Encode = function (arg)
{
    var chars = {
        ascii: function () {
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        },
        indices: function () {
            if (!this.cache) {
                this.cache = {};
                var ascii = chars.ascii();

                for (var c = 0; c < ascii.length; c++) {
                    var chr = ascii[c];
                    this.cache[chr] = c;
                }
            }
            return this.cache;
        }
    };

    var ascii = chars.ascii(),
        len = data.length - 1,
        i = -1,
        b64 = '';

    while (i < len) {
        var code = data.charCodeAt(++i) << 16 | 
            data.charCodeAt(++i) << 8 | 
            data.charCodeAt(++i);
        b64 += ascii[(code >>> 18) & 63] + 
            ascii[(code >>> 12) & 63] + 
            ascii[(code >>> 6) & 63] + 
            ascii[code & 63];
    }

    var pads = data.length % 3;

    if (pads > 0) {
        b64 = b64.slice(0, pads - 3);
        while (b64.length % 4 !== 0) {
            b64 += '=';
        }
    }

    return b64;
};

ns.base64Decode = function (arg)
{
    var chars = {
        ascii: function () {
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        },
        indices: function () {
            if (!this.cache) {
                this.cache = {};
                var ascii = chars.ascii();

                for (var c = 0; c < ascii.length; c++) {
                    var chr = ascii[c];
                    this.cache[chr] = c;
                }
            }
            return this.cache;
        }
    };

    var indices = chars.indices(),
        pos = b64.indexOf('='),
        padded = pos > -1,
        len = padded ? pos : b64.length,
        i = -1,
        data = '';

    while (i < len) {
        var code = indices[b64[++i]] << 18 | 
            indices[b64[++i]] << 12 | 
            indices[b64[++i]] << 6 | 
            indices[b64[++i]];
        if (code !== 0) {
            data += String.fromCharCode((code >>> 16) & 255, (code >>> 8) & 255, code & 255);
        }
    }

    if (padded) {
        data = data.slice(0, pos - b64.length);
    }

    return data;
}


export { ns as default }