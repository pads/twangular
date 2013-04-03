function SearchController($scope, searchService) {

    $scope.search = function() {

        searchService.search($scope.query, function(searchResults) {

            $scope.searchResults = searchResults;
        });
    };

    $scope.clearSearch = function() {

        $scope.searchResults = [];
    };
}