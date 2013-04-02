function BagController($scope, bagService) {

    $scope.getBag = function() {

        bagService.getBag($scope.bagName, function(bag) {

            $scope.bag = bag;
        });
    };

    $scope.clearBag = function() {

        $scope.bag = [];
    };
}