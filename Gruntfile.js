/*global module:false */
module.exports = function(grunt) {

    grunt.initConfig({

        copy: {
            lib: { expand: true, flatten: true, src: ["lib/**/*.js"], dest: "app/assets/", filter: "isFile" },
            src: { expand: true, flatten: true, src: ["src/**/*.js"], dest: "app/assets/", filter: "isFile" }
        },
        exec: {
            tsserve: {
                command: "cd app && tsapp serve",
                stdout: true
            },
            tspush: {
                command: "cd app && tsapp push twangular_public",
                stdout: true
            }
        },
        clean: ["lib", "tmp"],
        jshint: {
            all: ["Gruntfile.js", "src/js/**/*.js", "test/**/*.js"]
        },
        watch: {
            files: ["src/**/*.*", "app/twangular.html"],
            tasks: ["test", "default"]
        },
        jasmine: {
            test: {
                src: ["src/js/service/*.js"],
                options: {
                    vendor: ["lib/angular/angular.js", "lib/angular-resource/angular-resource.js"],
                    specs: "test/*Spec.js",
                    template: require("grunt-template-jasmine-istanbul"),
                    templateOptions: {
                        coverage: "tmp/coverage/coverage.json",
                        report: "tmp/coverage"
                    }
                }
            }
        }
    });

    grunt.registerTask("ts-deploy", "Deploy the application to TiddlySpace", function () {

        grunt.task.run("exec:tspush");
    });

    grunt.registerTask("ts-serve", "Host the application locally via tsapp", function () {

        grunt.task.run("exec:tsserve");
    });

    grunt.registerTask("default", ["jshint", "copy"]);
    grunt.registerTask("test", ["jasmine"]);

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
};