/*global module:false, require:false */
module.exports = function(grunt) {

    grunt.initConfig({

        copy: {
            lib: {
                expand: true,
                flatten: true,
                src: ["lib/**/*.js"],
                dest: "app/assets/",
                filter: "isFile"
            },
            src: {
                expand: true,
                flatten: true,
                src: ["src/**/*.js"],
                dest: "app/assets/",
                filter: "isFile"
            },
            coverage: {
                expand: true,
                flatten: true,
                src: ["tmp/coverage/**/*.*"],
                dest: "app/assets/",
                filter: "isFile"
            }
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
            all: ["Gruntfile.js", "src/js/**/*.js", "test/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        watch: {
            files: ["src/**/*.*", "test/*.js", "app/twangular.html"],
            tasks: ["default"]
        },
        jasmine: {
            test: {
                src: ["src/js/service/*.js"],
                options: {
                    vendor: ["lib/angular/angular.js", "lib/angular-resource/angular-resource.js"],
                    helpers: ["lib/angular-mocks/angular-mocks.js"],
                    specs: "test/*Spec.js",
                    template: require("grunt-template-jasmine-istanbul"),
                    templateOptions: {
                        coverage: "tmp/coverage/coverage.json",
                        report: "tmp/coverage"
                    }
                }
            }
        },
        plato: {
            complexity: {
                options : {
                    jshint : grunt.file.readJSON(".jshintrc")
                },
                files: {
                    "tmp/complexity": ["src/js/**/*.js"]
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

    grunt.registerTask("default", ["jshint", "test", "copy"]);
    grunt.registerTask("test", ["jasmine"]);

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-plato");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
};