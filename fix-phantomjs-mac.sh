#!/bin/bash

cd node_modules/grunt-contrib-jasmine/node_modules/grunt-lib-phantomjs
npm install phantomjs
cd node_modules/phantomjs/tmp
rm -R phantomjs-1.8.2-macosx
unzip phantomjs-1.8.2-macosx.zip
cp -R phantomjs-1.8.2-macosx ../lib/phantom
