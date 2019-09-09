const { src, dest, watch, series, parallel } = require('gulp');

var  postcss = require('gulp-postcss')
, autoprefix = require('autoprefixer')
, cssVars = require('postcss-simple-vars')
, postcssNested = require('postcss-nested')
, postcssImport = require('postcss-import')
, browserSync = require('browser-sync').create()
;

// File paths
const files = {
    htmlPath: './app/*.html',
    stylesPath: './app/assets/styles/*.css'
}

function htmlTask(){
  //We need to return something
browserSync.reload();
  return src(files.htmlPath);
}

function stylesTask(){
  return src(files.stylesPath)
  .pipe(postcss([postcssImport, cssVars, postcssNested, autoprefix]))
  .pipe(dest('./app/temp/styles'));
}

function cssInject() {
  return src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
};

function watchTask(){
  browserSync.init({
    notify: false,
    server : {
      baseDir: "app"
    }
  });
  watch([files.htmlPath, files.stylesPath],
      parallel(htmlTask, stylesTask));
}

//With node tasks we must always export them at the end.
exports.default = series(
    parallel(htmlTask, stylesTask),
    watchTask
);
