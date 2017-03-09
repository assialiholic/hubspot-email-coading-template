// --------------------------------------------------
// setting
// --------------------------------------------------
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence'),
  del = require('del');

var DIRECTORY = {
  SOURCE: 'src',
  BUILD: 'build',
  PUG: {
    SOURCE: ['src/pug/**/*.pug', '!src/pug/**/_*.pug'],
    BUILD: 'build',
    BASEDIR: __dirname + '/src/pug'
  },
  IMG: {
    SOURCE: 'src/img/**/*.{jpg,gif,png,svg,ico}',
    BUILD: 'build/img',
  }
};

function plumberNotify(){
  return $.plumber({errorHandler: $.notify.onError("<%= error.message %>")});
}


// --------------------------------------------------
// task
// --------------------------------------------------

// pug
gulp.task('pug', function () {
  return gulp.src(DIRECTORY.PUG.SOURCE)
  .pipe(plumberNotify())
  .pipe($.pug({ pretty: true, basedir: DIRECTORY.PUG.BASEDIR }))
  .pipe(gulp.dest(DIRECTORY.PUG.BUILD));
});

// clean
gulp.task('clean', function (callback) {
  return del([DIRECTORY.BUILD], callback);
});

// build
gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    'pug',
    callback
  );
});

// watch
gulp.task('watch', ['build'], function () {
  browserSync.init({
      server: DIRECTORY.BUILD
  });
  gulp.watch([DIRECTORY.SOURCE + '/**/*.pug'], ['pug', browserSync.reload]);
});



// --------------------------------------------------
// command
// --------------------------------------------------

// default
gulp.task('default', ['watch']);
