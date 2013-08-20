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
        }).success(function() {

            callback({ success: true });
        }).error(function(reason, code) {

            callback({ success: false, reason: reason, code: code });
        });
    };

    return service;
});