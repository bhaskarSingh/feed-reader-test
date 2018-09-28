const gulp = require('gulp');
const browserSync = require('browser-sync');

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

gulp.task('buildAndServe', gulp.series(copy, serve));