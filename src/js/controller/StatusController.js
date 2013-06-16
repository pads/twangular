/*jshint unused:false */
function StatusController($scope, statusService) {

    $scope.getStatus = function() {

        statusService.getStatus(function(status) {

            $scope.status = status;
        });
    };

    $scope.clearStatus = function() {

        $scope.status = null;
    };
}
