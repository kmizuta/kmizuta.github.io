
define(['./ObjectTypeInstance', './QueryService', './TypeClass'],
    function (ObjectTypeInstance, QueryService, TypeClass) {
        'use strict';

        function ObjectTypeClass(typeDefinition) {
            TypeClass.call(this, typeDefinition);
            this._instancePrototype = Object.create(ObjectTypeInstance.prototype).__proto__;
            this._addQueries();
        }
        ObjectTypeClass.prototype = Object.create(TypeClass.prototype);
        ObjectTypeClass.prototype.constructor = ObjectTypeClass;

        /**
         * @return {TypeInstance} create a new instance of this class' type.
         */
        ObjectTypeClass.prototype.newInstance = function () {
            throw new Error("Not implemented");
        }

        ObjectTypeClass.prototype.getByKey = function (key) {
            throw new Error("Not implemented");
        }

        ObjectTypeClass.prototype._queryImpl = function (queryName, options) {

            let queryDef = this.getTypeDefinition().getQuery(queryName);
            if (queryDef === null) {
                throw new Error("unknown query name: " + queryName);
            }

            let result = QueryService.performQuery(this.getTypeDefinition(), queryDef, options);
            return result;
        }

        ObjectTypeClass.prototype._addQueries = function () {
            var self = this;
            let queries = this.getTypeDefinition().getQueries();
            queries.forEach(function (query) {
                let queryName = query.getName();
                let queryFunc = function (options) { return self._queryImpl(queryName, options) };
                queryFunc.bind(self);
                self[queryName] = queryFunc;
            });
        }

        return ObjectTypeClass;
    });
