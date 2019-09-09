var gulp = require('gulp')
// , watch = require('gulp-watch')
, browserSync = require('browser-sync').create()
;

function watcher() {
  browserSync.init({
    notify: false,
    server : {
      baseDir: "app"
    }
  });
  gulp.watch('./app/*.html').on('change',html);
  gulp.watch('./app/assets/styles/**/*.css', gulp.series(style, cssInject));
  return
};

function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
};

function html(){
  // return new Promise(function(resolve, reject) {
  //   console.log("Imagine something useful with html being done here");
    // resolve();
  browserSync.reload();
};



module.exports = {
  watch : watcher,
  cssInject : cssInject
};
