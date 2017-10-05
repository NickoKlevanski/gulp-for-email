var gulp         = require('gulp'),
     postcss      = require('gulp-postcss'),
     sass         = require('gulp-sass'),
     less         = require('gulp-less'),
     autoprefixer = require('autoprefixer'),
     browser      = require('browser-sync'),
     notify       = require('gulp-notify'),
     inlineCss    = require('gulp-inline-css')
     sourcemaps   = require('gulp-sourcemaps'),
     twig         = require('gulp-twig');
 	
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

 gulp.task('twig', function () {
    return gulp.src('./src/twig/*.html')
         .pipe(twig())
         .pipe(gulp.dest('./src/'));
 });

 gulp.task('inline', function() {
    return gulp.src('*.html')
         .pipe(inlineCss())
         .pipe(gulp.dest('../app/'));
 });

 // Starts a BrowerSync instance
 gulp.task('serve', ['build:less', 'twig'], function(){
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
     gulp.watch(['./src/twig/*.html'], ['twig']);
 });