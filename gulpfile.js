const gulp = require('gulp');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');

/* copy all the files from app folder to build folder */
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

/* run local server with live reloading*/
function serve() {
    return browserSync.init({
      server: 'build',
      open: false,
      port: 3000
    });
}

/* make js file backward compatible and compress the file too */
function processJs() {
    return gulp.src(['app/js/*.js'])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(['build/js']));
}

/* make js file backward compatible and compress the file too */
function processSpec() {
    return gulp.src(['app/jasmine/spec/*.js'])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(['build/jasmine/spec']));
}

/* compress the css files */
function processCss() {
    return gulp.src('app/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('build/css'));
}

/* watch for any changes in the file*/
function watch(done) {
    gulp.watch('app/css/*.css', processCss);
    gulp.watch('app/jasmine/spec/*.js', processSpec);
    gulp.watch('app/js/*.js', processJs);
    done();
}

/* run all the task togther */
gulp.task(
    'buildAndServe',
    gulp.series(
        copy,processJs, processSpec, processCss,
        gulp.parallel(serve, watch)
    )
);