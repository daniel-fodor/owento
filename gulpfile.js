'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('styles', function () {
  return gulp.src('./src/scss/style.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer())
    // Minify the file
    .pipe(csso({ sourceMap: true }))
    // Output
    .pipe(gulp.dest('./src/css'))
});

gulp.task('watch', function(cb) {
  gulp.watch('src/scss/**/**.scss', gulp.series('styles'));
});
