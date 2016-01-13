var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync");

gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task("sass", function () {
    return gulp.src("css/calc.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("default", ["browserSync", "sass"], function() {
    gulp.watch("css/calc.scss", ["sass"]);
    gulp.watch("index.html", browserSync.reload);
});