/*global describe:false, beforeEach:false, afterEach:false, it:false, module:false, inject:false */
describe("Bag Service", function() {

    var service;
    var $mockHttpBackend;

    beforeEach(function() {

        module("bagModule");

        inject(function(bagService, _$httpBackend_) {

            service = bagService;
            $mockHttpBackend = _$httpBackend_;
        });
    });

    it("should send the expected GET request when fetching a bag", function() {

        $mockHttpBackend.expectGET("/bags/twangular_public/tiddlers.json").respond(200, "");

        service.getBag("twangular_public", function() {});
    });

    afterEach(function() {

        $mockHttpBackend.flush();
        $mockHttpBackend.verifyNoOutstandingExpectation();
        $mockHttpBackend.verifyNoOutstandingRequest();
    });
});