
define([], function () {
    'use strict';

    /**
     * @class
     * Represents the definition of a property of a type.
     */
    function PropertyDefinition(name, props) {
        if (props === undefined) 
            props = { };

        this._name = name;
        this._nullable = props["nullable"] || true;
        this._canContainNulls = props["canContainNulls"] || true;
        this._typeName = props["typeName"] || 'unknown';
        this._type = props["type"] || null;
        this._cardinality = props["cardinality"] || PropertyDefinition.Cardinality.SINGLE;
        this._defaultValue = props["defaultValue"] || null;
    }

    PropertyDefinition.Cardinality = {
        SINGLE: 0,
        MANY: 1
    };

    PropertyDefinition.create = function (fieldObj, discoveredTypes) {
        let name = fieldObj.name;
        let typeObj = fieldObj.type;
        let prop = new PropertyDefinition(name);
        prop._digestType(typeObj, discoveredTypes);
        return prop;
    };

    PropertyDefinition.prototype.getName = function () {
        return this._name;
    };

    PropertyDefinition.prototype.getType = function () {
        return this._type;
    };

    PropertyDefinition.prototype.getCardinality = function () {
        return this._cardinality;
    };

    /**
     * Can the property be a null value?  If the property has a cardinality
     * of MANY than this value indicates if the collection itself can be null.
     */
    PropertyDefinition.prototype.isNullable = function () {
        return this._nullable;
    };

    /**
     * If this property has a cardinality of MANY then this value indicates if
     * property collection may contain null values.  If this property has a 
     * cardinality of SINGLE then the meaning of this value is undefined.
     */
    PropertyDefinition.prototype.canContainNulls = function() {
        return this._canContainNulls;
    };

    PropertyDefinition.prototype.getDefaultValue = function() {
        return this._defaultValue;
    };

    return PropertyDefinition;
});
