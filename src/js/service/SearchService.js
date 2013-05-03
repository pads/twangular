angular.module("searchModule", ["ngResource"]).factory("searchService", function($resource) {

    var service = {};
    var Search = $resource("/search.json");

    service.search = function(query, callback, render) {

        var parameters = { q: query, fat: 1 };
        if(render) {
            parameters.render = 1;
        }

        var searchResults = Search.query(parameters, function() {

            callback(searchResults);
        });
    };

    return service;
});