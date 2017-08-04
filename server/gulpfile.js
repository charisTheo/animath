'use strict';

var gulp = require('gulp');
var scss = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('browserSync', ['nodemon'], function() {
    browserSync({
        proxy: 'localhost:3000/',
        port: 5000,
        files: ["public/css/*.css", "public/views/*.hbs", "public/views/partials/*.hbs",  "public/js/*.js"]
    });
});

gulp.task('nodemon', function(cb){
    var started = false;

    return nodemon({
        script: './server.js',
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    });
})

gulp.task('scss', function(){
    return gulp.src('./public/scss/styles.scss')
        .pipe(scss())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
 
gulp.task('default', ['scss', 'browserSync'], function () {
  gulp.watch('./public/scss/*.scss', ['scss']);
  gulp.watch('./views/*.hbs', browserSync.reload);
  gulp.watch('./views/partials/*.hbs', browserSync.reload);
  gulp.watch('./public/js/*.js', browserSync.reload);
});