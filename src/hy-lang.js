module.exports = function (hydra) {

    /**
     * Returns true if the provided argument is an array and returns false otherwise.
     * @param {*} arg 
     */
    hydra.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };

    /**
     * 
     * @param {*} arg 
     */
    hydra.getType = function (arg) {
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

    }



};