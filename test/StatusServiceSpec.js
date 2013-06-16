/*global describe:false, beforeEach:false, afterEach:false, it:false, module:false, inject:false */
describe("Status Service", function() {

    var service;
    var $mockHttpBackend;

    beforeEach(function() {

        module("statusModule");

        inject(function(statusService, _$httpBackend_) {

            service = statusService;
            $mockHttpBackend = _$httpBackend_;
        });
    });

    it("should send the expected GET request when obtaining the status", function() {

        $mockHttpBackend.expectGET("/status").respond(200, "");

        service.getStatus(function() {});
    });

    afterEach(function() {

        $mockHttpBackend.flush();
        $mockHttpBackend.verifyNoOutstandingExpectation();
        $mockHttpBackend.verifyNoOutstandingRequest();
    });
});