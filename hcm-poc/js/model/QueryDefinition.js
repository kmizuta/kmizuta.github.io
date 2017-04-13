
define([], function () {
    'use strict';

    /**
     * @class
     */
    function QueryDefinition(name, returnType, returnsList) {
        this._name = name;
        this._returnType = returnType;
        this._returnsList = returnsList;
    }

    /**
     * @return {String} the name of the query.
     */
    QueryDefinition.prototype.getName = function() {
        return this._name;
    }

    /**
     * @return {TypeDefinition} the query's return type.
     */
    QueryDefinition.prototype.getReturnType = function() {
        return this._returnType;
    }

    /**
     * @return {Boolean} does the query return a single object or a list of objects?
     */
    QueryDefinition.prototype.isListReturn = function() {
        return this._returnsList;
    }
    

    return QueryDefinition;
});
