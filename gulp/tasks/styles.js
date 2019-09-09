var gulp = require('gulp')
// , watch = require('gulp-watch')
, postcss = require('gulp-postcss')
, autoprefix = require('autoprefixer')
, cssVars = require('postcss-simple-vars')
, postcssNested = require('postcss-nested')
, postcssImport = require('postcss-import')
, browserSync = require('browser-sync').create()
;

function style(){
  return gulp.src('./app/assets/styles/styles.css')
  .pipe(postcss([postcssImport, cssVars, postcssNested, autoprefix]))
  .pipe(gulp.dest('./app/temp/styles'))
}
