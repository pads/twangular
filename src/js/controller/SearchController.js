/*jshint unused:false */
function SearchController($scope, searchService) {

    $scope.search = function() {

        searchService.search($scope.query, function(searchResults) {

            $scope.searchResults = searchResults;
        }, $scope.render);
    };

    $scope.clearSearch = function() {

        $scope.searchResults = [];
    };
}