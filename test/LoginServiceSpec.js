/*global describe:false, beforeEach:false, afterEach:false, it:false, expect:false, module:false, inject:false */
describe("Login Service", function() {

    var service;
    var $mockHttpBackend;

    beforeEach(function() {

        module("loginModule");

        inject(function(loginService, _$httpBackend_) {

            service = loginService;
            $mockHttpBackend = _$httpBackend_;
        });
    });

    it("should send the expected POST request when logging in", function() {

        $mockHttpBackend.expectPOST("/challenge/cookie_form", "user=pads&password=letmein").respond(401, "");

        service.login("pads", "letmein", function() {});
        $mockHttpBackend.flush();
    });

    it("should return a 401 code to the callback after an unauthorised login is attempted", function() {

        var expectedStatusCode = 401;
        var returnedStatusCode = -1;

        $mockHttpBackend.expectPOST("/challenge/cookie_form", "user=pads&password=letmein").respond(401, "");

        service.login("pads", "letmein", function(statusCode) {
            returnedStatusCode = statusCode;
        });

        // This forces the backend to finish the request, triggering the appropriate callback
        $mockHttpBackend.flush();
        expect(returnedStatusCode).toBe(expectedStatusCode);
    });

    it("should return a 204 code to the callback after a successful login is made", function() {

        var expectedStatusCode = 204;
        var returnedStatusCode = -1;

        $mockHttpBackend.expectPOST("/challenge/cookie_form", "user=pads&password=imin").respond(204, "");

        service.login("pads", "imin", function(statusCode) {
            returnedStatusCode = statusCode;
        });

        $mockHttpBackend.flush();
        expect(returnedStatusCode).toBe(expectedStatusCode);
    });

    //TODO test redirect
    //TODO test different challenger

    afterEach(function() {

        $mockHttpBackend.verifyNoOutstandingExpectation();
        $mockHttpBackend.verifyNoOutstandingRequest();
    });
});