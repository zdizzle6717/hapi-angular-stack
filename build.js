'use strict';

var fs = require("fs");
var browserify = require("browserify");
var stringify = require("stringify");
const sass = require('node-sass');
const autoPrefixer = require('autoprefixer');
const autoPrefix = require('postcss')([autoPrefixer]);

/* Build Main App*/
browserify("app/app.js")
.transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] }
    })
.transform("babelify", {
        presets: ["es2015"]
    })
    .bundle()
    .pipe(fs.createWriteStream("dist/js/app.js"));

// Compile SCSS
sass.render({
    file: 'app/styles/app.scss',
    outputStyle: 'compressed'
}, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }

    autoPrefix.process(result.css.toString())
        .then((result) => {
            let dataString = result.css.toString();
            let kbs = Buffer.byteLength(dataString) / 1000;

            result.warnings().forEach(function(warn) {
                console.warn(warn.toString());
            });
            fs.writeFileSync('dist/css/app.css', dataString, 'utf8');
        });
});
