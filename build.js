'use strict';

var fs = require("fs");
var browserify = require("browserify");
var stringify = require("stringify");

/* Build Main App*/
browserify("app/app.js")
.transform(stringify, {
      appliesTo: { includeExtensions: ['.hjs', '.html', '.whatever'] }
    })
.transform("babelify", {
        presets: ["es2015"]
    })
    .bundle()
    .pipe(fs.createWriteStream("dist/js/app.js"));
