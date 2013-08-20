[![Build Status](https://travis-ci.org/pads/twangular.png)](https://travis-ci.org/pads/twangular)
[![Coverage Status](https://coveralls.io/repos/pads/twangular/badge.png)](https://coveralls.io/r/pads/twangular)

# twangular

An AngularJS library for TiddlyWeb.

I'm learning AngularJS and applying it in a (hopefully) useful way.  More coming soon...

# Contributing

Requires:
* node
* Python 2.x (and the pip installer)
* grunt: `npm install -g grunt-cli`
* bower: `npm install -g bower`
* tsapp: `pip install -U tsapp`

Install project development dependencies:

    npm install

Install project dependencies:

    bower install

Run the grunt help task for project tasks:

    grunt --help

To run the example application:

    grunt
    grunt ts-serve

Open `http://localhost:8080/twangular.html`

## Testing

Run `grunt test` to run tests in the console.

Run `grunt jasmine:test:build` to create a Spec runner (`_SpecRunner.html`) to open in the browser.