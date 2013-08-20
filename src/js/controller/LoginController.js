/*jshint unused:false */
function LoginController($scope, loginService) {

    $scope.login = function() {

        loginService.login($scope.username, $scope.password, function(result) {

            $scope.result = result;
        }, "tiddlyspace.cookie_form");
    };
}