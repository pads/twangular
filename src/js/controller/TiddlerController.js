function TiddlerController($scope, tiddlerService) {

    $scope.getTiddler = function() {

        tiddlerService.getTiddler($scope.bagName, $scope.tiddlerTitle, function(tiddler) {

            $scope.tiddler = tiddler;
        }, $scope.render);
    };

    $scope.clearTiddler = function() {

        $scope.tiddler = null;
    };

    $scope.putTiddler = function() {

        var tags = $scope.tiddlerTags;
        if(tags) {
            tags = tags.split(' ');
        } else {
            tags = [];
        }

        var tiddlerData = { title: $scope.tiddlerTitle, text: $scope.tiddlerText, tags: tags };

        tiddlerService.putTiddler($scope.bagName, tiddlerData, function(tiddler) {

            $scope.tiddler = tiddler;
        });
    };

    $scope.deleteTiddler = function() {

        tiddlerService.deleteTiddler($scope.bagName, $scope.tiddlerTitle, function() {

            $scope.tiddler = null;
        });
    };
}