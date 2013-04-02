angular.module("bagModule", ["ngResource"]).factory("bagService", function($resource) {

    var service = {};
    var Bag = $resource("/bags/:bagName/tiddlers.json");

    service.getBag = function(bagName, callback) {

        var bag =  Bag.query({ bagName: bagName }, function() {

            callback(bag);
        });
    };

    return service;
});