var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("common/tsconfig.json");
var   exec = require('child_process').exec;

gulp.task("default", function () {

    exec('node backend/api.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("common/dist"));
});

