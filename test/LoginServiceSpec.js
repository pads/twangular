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

    it("should return false to the callback after an unauthorised login is attempted", function() {

        var returnedLoginStatus = null;

        $mockHttpBackend.expectPOST("/challenge/cookie_form", "user=pads&password=letmein").respond(401, "");

        service.login("pads", "letmein", function(succeeded) {
            returnedLoginStatus = succeeded;
        });

        // This forces the backend to finish the request, triggering the appropriate callback
        $mockHttpBackend.flush();
        expect(returnedLoginStatus.success).toBeFalsy();
    });

    it("should return the status code to the callback after an unauthorised login is attempted", function() {

        var returnedLoginStatus = null;

        $mockHttpBackend.expectPOST("/challenge/cookie_form",
            "user=pads&password=letmein").respond(401, "");

        service.login("pads", "letmein", function(succeeded) {
            returnedLoginStatus = succeeded;
        });

        $mockHttpBackend.flush();
        expect(returnedLoginStatus.code).toBe(401);
    });

    it("should return the reason for failing to the callback after an unauthorised login is attempted", function() {

        var returnedLoginStatus = null;

        $mockHttpBackend.expectPOST("/challenge/cookie_form",
            "user=pads&password=letmein").respond(401, "401 Unauthorized");

        service.login("pads", "letmein", function(succeeded) {
            returnedLoginStatus = succeeded;
        });

        $mockHttpBackend.flush();
        expect(returnedLoginStatus.reason).toBe("401 Unauthorized");
    });

    it("should return true to the callback after a successful login is made", function() {

        var returnedLoginStatus = null;

        // This isn't truly mimicking the backend, the POST will return a 303 and redirect to /, giving the 200
        $mockHttpBackend.expectPOST("/challenge/cookie_form", "user=pads&password=imin").respond(200, "");

        service.login("pads", "imin", function(succeeded) {
            returnedLoginStatus = succeeded;
        });

        $mockHttpBackend.flush();
        expect(returnedLoginStatus.success).toBeTruthy();
    });

    it("should be able to use a custom challenger", function() {

        var challenger = "tiddlyspace.cookie_form";

        $mockHttpBackend.expectPOST("/challenge/tiddlywebplugins.tiddlyspace.cookie_form",
            "user=pads&password=letmein").respond(401, "");

        service.login("pads", "letmein", function() {}, challenger);
        $mockHttpBackend.flush();
    });

    //TODO test custom redirect

    afterEach(function() {

        $mockHttpBackend.verifyNoOutstandingExpectation();
        $mockHttpBackend.verifyNoOutstandingRequest();
    });
});