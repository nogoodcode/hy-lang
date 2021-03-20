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

};

ns.serialize = function (arg) 
{

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


export { ns as default }