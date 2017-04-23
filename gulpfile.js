var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
    pages: ['frontend/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: [
        'common/src/Board.ts',
        'common/src/Field.ts',
        'common/src/Figure.ts',
        'common/src/FigureType.ts',
        'common/src/GameState.ts',
        'common/src/Side.ts',
        'frontend/printer.ts',
        'common/src/test.ts'
    ],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("frontend/dist"));
});


function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("common/bundle/"));
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

function doDefault() {
    gulp.task("default", ["copy-html"], bundle);
}

