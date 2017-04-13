
define([], function () {
    'use strict';

    /**
     * @class
     * Base class for all type-specific generated classes.
     */
    function TypeClass(typeDefinition) {
        this._typeDefinition = typeDefinition;
    }

    /**
     * @return {String} the type name.
     */
    TypeClass.prototype.getName = function() {
        return this._typeDefinition.getName();
    }

    /**
     * @return {TypeDefinition} the type definition for the class.
     */
    TypeClass.prototype.getTypeDefinition = function() {
        return this._typeDefinition;
    }

    return TypeClass;
});
