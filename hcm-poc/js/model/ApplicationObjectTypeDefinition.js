
define(['./TypeDefinition', './PropertyDefinition'], function (TypeDefinition, PropertyDefinition) {
    'use strict';

    /**
     * @class
     * Represents an application defined data type.
     */
    function ApplicationObjectTypeDefinition(name) {
        TypeDefinition.call(this, name);
        this._properties = new Map();
        this._queries = new Map();
    }
    ApplicationObjectTypeDefinition.prototype = Object.create(TypeDefinition.prototype);
    ApplicationObjectTypeDefinition.prototype.constructor = ApplicationObjectTypeDefinition;

    /**
     * @return {Boolean} is this a scalar type?
     */
    ApplicationObjectTypeDefinition.prototype.isScalar = function () {
        return false;
    };

    /**
     * @return {Boolean} is this an object type?
     */
    ApplicationObjectTypeDefinition.prototype.isObject = function () {
        return true;
    };

    /**
     * @return {[PropertyDefinition]} the defined properties for this type.
     */
    ApplicationObjectTypeDefinition.prototype.getProperties = function () {
        return Array.from(this._properties.values());
    };

    /**
     * @return {PropertyDefinition} the requested property.
     */
    ApplicationObjectTypeDefinition.prototype.getProperty = function (name) {
        return this._properties.get(name);
    };

    /**
     * @return {[QueryDefinition]} the defined queries for this type.
     */
    ApplicationObjectTypeDefinition.prototype.getQueries = function () {
        return Array.from(this._queries.values());
    };

    /**
     * @return {QueryDefinition} the requested query.
     */
    ApplicationObjectTypeDefinition.prototype.getQuery = function (name) {
        return this._queries.get(name);
    };

    /**
     * @return {[MutationDefinition]} the defined mutations for this type.
     */
    ApplicationObjectTypeDefinition.prototype.getMutations = function () {
        //  TODO
    };

    ApplicationObjectTypeDefinition.create = function (typeObj, discoveredTypes) {
        let name = typeObj.name;
        let type = new ApplicationObjectTypeDefinition(name);

        //  Iterate over the defined fields on the type.
        let fields = typeObj.fields;
        if ((typeof fields != 'undefined') && (fields != null)) {
            for (let i = 0; i < fields.length; i++) {
                let field = fields[i];
                let propDef = PropertyDefinition.create(field, discoveredTypes);
                type._properties.set(propDef.getName(), propDef);
            }
        }

        discoveredTypes.add(name);
        return type;
    };

    return ApplicationObjectTypeDefinition;
});
