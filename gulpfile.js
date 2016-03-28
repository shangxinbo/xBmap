var combiner = require('stream-combiner2');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulp = require('gulp');

var release_version = '1.0.2'

gulp.task('js compress', function() {
    var dest = 'dist/';
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dest));
});
gulp.task('default', ['js compress']);