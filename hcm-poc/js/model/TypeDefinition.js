
define([], function () {
    'use strict';

    /**
     * @class
     */
    function TypeDefinition(name) {
        this._name = name;
    }

    /**
     * @return {String} the type name.
     */
    TypeDefinition.prototype.getName = function() {
        return this._name;
    };

    /**
     * @return {Boolean} is this a scalar type?
     */
    TypeDefinition.prototype.isScalar = function () {
        throw new Error("function 'isScalar' must be over-ridden in subtype");
    };

    /**
     * @return {Boolean} is this an object type?
     */
    TypeDefinition.prototype.isObject = function () {
        throw new Error("function 'isObject' must be over-ridden in subtype");
    };

    return TypeDefinition;
});
