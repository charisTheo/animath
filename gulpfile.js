var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function(cb){
    var started = false;

    return nodemon({
        script: 'server/server.js',
        baseDir: 'server/public'
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    });
})

gulp.task('browserSync', gulp.series(['nodemon'], function(clean) {
        // browserSync({
        //     proxy: 'localhost:3000/',
        //     port: 5000,
        //     files: ["server/public/css/*.css", "server/public/views/*.hbs", "server/public/views/partials/*.hbs",  "server/public/js/*.js"]
        // });
        browserSync.init({
            server: {
              baseDir: 'server/public',
              directory: true,
              server: 'server',
            },
        }, {            
            proxy: 'localhost:3000/',
            port: 5000,
            files: ["server/public/css/*.css", "server/public/views/*.hbs", "server/public/views/partials/*.hbs",  "server/public/js/*.js"]
        });
        return clean();
    })
);

gulp.task('sass', gulp.series(function(clean){
    gulp.src('server/public/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('server/public/css'));
    return clean();
}));

gulp.task('watch', gulp.series(function(clean){
    gulp.watch('server/public/scss/*.scss', gulp.series(['sass', browserSync.reload]));
    gulp.watch('server/views/*.hbs', browserSync.reload);
    gulp.watch('server/views/partials/*.hbs', browserSync.reload);
    gulp.watch('server/public/js/*.js', browserSync.reload);
    return clean();
}));

gulp.task('default', gulp.series(['sass', 'browserSync', 'watch']));
