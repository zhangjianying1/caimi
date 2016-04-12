var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');

var watch = require('gulp-watch');
var connect = require('gulp-connect');



gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});
gulp.task('cssmin', function(done){
    gulp.src(['./src/css/base.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('src/__build/css'))
        .on('end', done)
})


gulp.task('default',['connect', 'watch'])
