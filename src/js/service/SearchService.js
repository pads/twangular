angular.module("searchModule", ["ngResource"]).factory("searchService", function($resource) {

    var service = {};
    var Search = $resource("/search.json");

    service.search = function(query, callback) {

        var searchResults = Search.query({ q: query, fat: 1 }, function() {

            callback(searchResults);
        });
    };

    return service;
});