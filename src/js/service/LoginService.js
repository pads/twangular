angular.module("loginModule", ["ng"]).factory("loginService", function($http) {

    var service = {};
    var challengerURL = "/challenge/cookie_form";

    service.login = function(username, password, callback, challenger) {

        var formData = "user=" + username + "&password=" + password;

        if(challenger) {
            challengerURL = "/challenge/tiddlywebplugins." + challenger;
        }

        $http.post(challengerURL, formData, {

            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).success(function(data, status) {

            callback(status);
        }).error(function(data, status) {

            callback(status);
        });
    };

    return service;
});