/**
 * Created by Zolotarev.K on 03.05.2017.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');


gulp.task('sass', function(){
     return gulp.src('app/scss/**/styles.scss')
        .pipe(sass())
         .pipe(autoprefixer({
             browsers: ['last 2 version', 'safari 5', 'safari 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
             cascade: false
         }))
         .pipe(minifycss())
        .pipe(gulp.dest('app/css'))
         .pipe(notify({
             message: 'css good'
         }));
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Other watchers
})

gulp.task('default', ['watch']);