const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

gulp.task('copy-js', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('compress-js', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('copy-html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', gulp.parallel('copy-js'));
    gulp.watch('src/js/**/*.js', gulp.parallel('compress-js'));
    gulp.watch('src/*.html', gulp.parallel('copy-html'));
});

gulp.task('default', gulp.parallel('watch', 'browserSync'));