/*jshint unused:false */
function LoginController($scope, loginService) {

    $scope.login = function() {

        loginService.login($scope.username, $scope.password, function(result) {

            $scope.result = result;
            if(result.success) {
                location.reload();
            }
        }, "tiddlyspace.cookie_form", true);
    };
}