'use strict'

export const lang = {

    isArray: function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    },

    getType: function (arg) {
        if (arg == null) { 
            return arg.toString().toLowerCase(); 
        } 

        var type = Object.prototype.toString.call(arg).slice(8,-1).toLowerCase();
    
        if (type === 'generatorfunction') { 
            return 'function' 
        }

        if (type.match(/^(array|bigint|date|error|function|generator|regexp|symbol)$/)) {
            return type;
        }

        return (typeof arg === 'object' || typeof arg === 'function') ? 'object' : typeof arg;

    },

    serialize: function (arg) {

    },

    unserialize: function (arg) {

    },

    param: function (arg) {

    },

    unparam: function (arg) {

    },

    $_GET: function (arg, source) {

    },

};