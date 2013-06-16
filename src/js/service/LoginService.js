angular.module("loginModule", ["ng"]).factory("loginService", function($http) {

    var service = {};
    var challengerURL = "/challenge/cookie_form";

    service.login = function(username, password, callback) {

        var formData = "user=" + username + "&password=" + password;

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