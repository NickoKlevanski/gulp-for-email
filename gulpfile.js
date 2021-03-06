var gulp         = require('gulp'),
     postcss      = require('gulp-postcss'),
     less         = require('gulp-less'),
     autoprefixer = require('autoprefixer'),
     browser      = require('browser-sync'),
     notify       = require('gulp-notify'),
     sourcemaps   = require('gulp-sourcemaps');

 gulp.task('build:less', function () {
   return gulp.src('./src/less/**/*.less')
         .pipe(sourcemaps.init())
         .pipe(less())
         .on('error', notify.onError({
            message: 'LESS compile error: <%= error.message %>'
         }))
         .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest('./src/css'))
         .pipe(browser.stream({match: '**/*.css'}));
 });

 // Starts a BrowerSync instance
 gulp.task('serve', ['build:less'], function(){
     browser.init({
         server: {
             baseDir: "./src/"
         }
     });
 });

 // Runs all of the above tasks and then waits for files to change
 gulp.task('default', ['serve'], function() {
     gulp.watch(['./src/less/**/*.less'], ['build:less']);
     gulp.watch('./src/**/*.html').on('change', browser.reload);
 });