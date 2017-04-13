define([], function () {
    'use strict';

    var QueryService = {};

    /**
     * @method
     * @return {Promise<ResultSet>}
     */
    QueryService.performQuery = function (typeDef, queryDef, options) {
        throw new Error("Not implemented");
    };


    return QueryService;
});
