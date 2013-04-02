angular.module("tiddlerModule", ["ngResource"]).config(function($httpProvider) {

    $httpProvider.defaults.headers.put["Content-Type"] = "application/json";

}).factory("tiddlerService", function($resource) {

    var service = {};
    var Tiddler = $resource("/bags/:bagName/tiddlers/:tiddlerTitle:contentType",
        {
            bagName: "@bagName",
            tiddlerTitle: "@tiddlerTitle",
            contentType: "@contentType"
        },
        {
            put: { method: "PUT" }
        }
    );

    service.getTiddler = function(bagName, tiddlerTitle, callback) {

        var tiddler =  Tiddler.get({ bagName: bagName, tiddlerTitle: tiddlerTitle, contentType: ".json" }, function() {

            callback(tiddler);
        });
    };

    service.putTiddler = function(bagName, tiddlerData, callback) {

        var tiddler = Tiddler.put({ bagName: bagName, tiddlerTitle: tiddlerData.title }, tiddlerData, function() {

            callback(tiddler);
        });
    };

    service.deleteTiddler = function(bagName, tiddlerTitle, callback) {

        Tiddler.remove({ bagName: bagName, tiddlerTitle: tiddlerTitle }, callback);
    };

    return service;
});