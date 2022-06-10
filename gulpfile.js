const gulp = require("gulp"),
    sass = require("gulp-sass")(require('sass')),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    notify = require("gulp-notify"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require('browser-sync').create();


function scss() {
    return (
        gulp
        .src("assets/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./assets/css/"))
    );
}

function watch() {
    browserSync.init({
		server:{
			baseDir: "./"
		},
		port:3000
	});
    gulp.watch("assets/scss/*.scss", scss).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
}

exports.watch = watch;
exports.scss = scss;