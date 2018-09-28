const gulp = require('gulp');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');

function copy() {
    return gulp.src([
      'app/*.html',
      'app/**/*.svg',
      'app/**/*.eot',
      'app/**/*.ttf',
      'app/**/*.woff',
      'app/**/*.css',
      'app/jasmine/*',
      'app/**/*.js'
    ])
    .pipe(gulp.dest('build'));
}

function serve() {
    return browserSync.init({
      server: 'build',
      open: false,
      port: 3000
    });
}

function processJs() {
    return gulp.src(['app/js/*.js'])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(['build/js']));
}

function processSpec() {
    return gulp.src(['app/jasmine/spec/*.js'])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(['build/jasmine/spec']));
}

function processCss() {
    return gulp.src('app/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('build/css'));
}

gulp.task(
    'buildAndServe',
    gulp.series(
        copy,processJs, processSpec, processCss,
        serve
    )
);