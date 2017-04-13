
var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

/*
 *        this._nullable = props[nullable] || true;
        this._canContainNulls = props[canContainNulls] || true;
        this._typeName = props[typeName] || 'unknown';
        this._type = props[type] || null;
        this._cardinality = props[cardinality] || PropertyDefinition.Cardinality.SINGLE;
        this._defaultValue = props[defaultValue] || null;
 */

requirejs(["../js/model/ObjectTypeInstance",
           "../js/model/PropertyDefinition",
           "../js/model/ApplicationObjectTypeDefinition",
           "../js/model/ObjectTypeClass"
           ],
        function (ObjectTypeInstance, PropertyDefinition,
                    ApplicationObjectTypeDefinition,
                    ObjectTypeClass) {

            let empNum = new PropertyDefinition("EmployeeNumber", {
                nullable: true,
                canContainNulls: true,
                typeName: null,
                type: 'String',
                cardinality: PropertyDefinition.Cardinality.SINGLE,
                defaultValue: null
            });
            let ename = new PropertyDefinition("EmployeeName", {
                nullable: false
            });
            
            let empTypeDef = new ApplicationObjectTypeDefinition("Employee");
            empTypeDef._properties.set(empNum.getName(), empNum);
            empTypeDef._properties.set(ename.getName(), ename);
            
            let empType = new ObjectTypeClass(empTypeDef);
            
            let empInstance = new ObjectTypeInstance(empType);
            
            console.log(empInstance);

        });
