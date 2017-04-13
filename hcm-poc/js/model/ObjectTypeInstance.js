
define([], function () {
    'use strict';

    /**
     * @class
     * Respresents a single data object instance, i.e. a "row" or data.
     */
    function ObjectTypeInstance(typeClass) {
        this._typeClass = typeClass;
        this._props = {};
        this._state = ObjectTypeInstance.LIFECYCLE_STATE.ACTIVE;
        this._addPropertyAccessors();
        this._addDefaultValues();
    }

    ObjectTypeInstance.prototype.getTypeClass = function () {
        return this._typeClass;
    };

    ObjectTypeInstance.prototype.getKey = function () {
        throw new Error("Not implemented");
    };

    ObjectTypeInstance.prototype.getVersion = function () {
        throw new Error("Not implemented");
    };

    ObjectTypeInstance.prototype.getLifecycleState = function () {
        this._state;
    };

    ObjectTypeInstance.prototype.isLifecycleActive = function () {
        return (this._state === ObjectTypeInstance.LIFECYCLE_STATE.ACTIVE);
    };

    ObjectTypeInstance.prototype.isLifecycleReleased = function () {
        return (this._state === ObjectTypeInstance.LIFECYCLE_STATE.RELEASED);
    };

    ObjectTypeInstance.prototype.release = function () {
        this._state = ObjectTypeInstance.LIFECYCLE_STATE.RELEASED;
    };

    ObjectTypeInstance.prototype._getterImpl = function (propName) {
        return this._props[propName];
    };

    /**
     * @method
     * @param {Object} values an object containing name/value pairs to be updated.
     */
    ObjectTypeInstance.prototype.update = function(values) {
        for (let propName in values) 
            this._props[propName] = values[propName];
    };

    ObjectTypeInstance.prototype._addPropertyAccessors = function () {
        var self = this;
        this._typeClass.getTypeDefinition().getProperties().forEach(function (propDef) {
            let propName = propDef.getName();
            Object.defineProperty(self, propName, {
                get: function () { return self._getterImpl(propName); },
            });
        });
    };

    ObjectTypeInstance.prototype._addDefaultValues = function () {
        var self = this;
        var defaultValues = {};
        this._typeClass.getTypeDefinition().getProperties().forEach(function (propDef) {
            let propName = propDef.getName();
            let defValue = propDef.getDefaultValue();
            defaultValues[propName] = defValue;
        });
        this.update(defaultValues);
    };

    /**
     * Lifecycle states an ObjectTypeInstance can exist in.
     */
    ObjectTypeInstance.LIFECYCLE_STATE = {
        ACTIVE: 0,
        RELEASED: 1
    };

    return ObjectTypeInstance;
});
