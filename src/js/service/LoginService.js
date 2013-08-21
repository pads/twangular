angular.module("loginModule", ["ng"]).factory("loginService", function($http) {

    var service = {};
    var challengerURL = "/challenge/cookie_form";

    // adapted from: https://github.com/TiddlySpace/tiddlyspace/commit/5f4adbe009ed4bda3ce39058a3fb07de1420358d#L0L79
    function extractCookieValue(name) {
        var nameEquals = name + "=";
        var cookies = document.cookie.split(";");
        for(var index = 0; index < cookies.length; index++) {
            var cookie = cookies[index];
            while(cookie.charAt(0) === " ") {
                cookie = cookie.substring(1, cookie.length);
            }
            if(cookie.indexOf(nameEquals) === 0) {
                return cookie.substring(nameEquals.length, cookie.length);
            }
        }
        return null;
    }

    service.login = function(username, password, callback, challenger, sendCSRFToken) {

        var formData = "user=" + username + "&password=" + password;
        if(sendCSRFToken) {
            formData += "&csrf_token=" + extractCookieValue("csrf_token");
        }

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