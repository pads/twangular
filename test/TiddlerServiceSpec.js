/*global describe:false, beforeEach:false, afterEach:false, it:false, module:false, inject:false */
describe("Tiddler Service", function() {

    var service;
    var $mockHttpBackend;

    beforeEach(function() {

        module("tiddlerModule");

        inject(function(tiddlerService, _$httpBackend_) {

            service = tiddlerService;
            $mockHttpBackend = _$httpBackend_;
        });
    });

    it("should send the expected GET request when fetching a tiddler", function() {

        $mockHttpBackend.expectGET("/bags/twangular_public/tiddlers/TestTiddler.json").respond(200, "");

        service.getTiddler("twangular_public", "TestTiddler", function() {});
    });

    it("should send the expected PUT request when creating a tiddler", function() {

        $mockHttpBackend.expectPUT("/bags/twangular_private/tiddlers/NewTiddler").respond(204, "");

        var tiddlerData = { title: "NewTiddler", text: "This is a test" };
        service.putTiddler("twangular_private", tiddlerData, function() {});
    });

    it("should send the expected DELETE request when removing a tiddler", function() {

        $mockHttpBackend.expectDELETE("/bags/twangular_public/tiddlers/RemoveTiddler").respond(204, "");

        service.deleteTiddler("twangular_public", "RemoveTiddler", function() {});
    });

    it("should send the expected GET request when fetching a tiddler with the render option set", function() {

        $mockHttpBackend.expectGET("/bags/twangular_public/tiddlers/TestTiddler.json?render=1").respond(200, "");

        service.getTiddler("twangular_public", "TestTiddler", function() {}, true);
    });

    afterEach(function() {

        $mockHttpBackend.flush();
        $mockHttpBackend.verifyNoOutstandingExpectation();
        $mockHttpBackend.verifyNoOutstandingRequest();
    });
});