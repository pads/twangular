describe("Search Service", function() {

    var service;
    var $mockHttpBackend;

    beforeEach(function() {

        module("searchModule");

        inject(function(searchService, _$httpBackend_) {

            service = searchService;
            $mockHttpBackend = _$httpBackend_;
        });
    });

    it("should send the expected GET request when searching for tiddlers", function() {

        $mockHttpBackend.expectGET("/search.json?fat=1&q=tag:test").respond(200, "");

        service.search("tag:test", function() {});
    });

    afterEach(function() {

        $mockHttpBackend.flush();
        $mockHttpBackend.verifyNoOutstandingExpectation();
        $mockHttpBackend.verifyNoOutstandingRequest();
    });
});