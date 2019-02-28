'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

// gulp.task('browserSync', ['nodemon'], function() {
//     browserSync({
//         proxy: 'localhost:3000/',
//         port: 5000,
//         files: ["public/css/*.css", "public/views/*.hbs", "public/views/partials/*.hbs",  "public/js/*.js"]
//     });
// });

// gulp.task('nodemon', function(cb){
//     var started = false;

//     return nodemon({
//         script: './server.js',
//     }).on('start', () => {
//         if (!started) {
//             cb();
//             started = true;
//         }
//     });
// })

gulp.task('sass', function(){
    return gulp.src('./public/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
 
// gulp.task('default', ['sass', 'browserSync'], function () {
//   gulp.watch('./public/scss/*.scss', ['sass']);
//   gulp.watch('./views/*.hbs', browserSync.reload);
//   gulp.watch('./views/partials/*.hbs', browserSync.reload);
//   gulp.watch('./public/js/*.js', browserSync.reload);
// });