// after installing gulp (global+local) and plugins
/*

steps:
0. read/write to dest
1. add cleanup
2. concatenate
3. add uglify
4. add sourcemaps
5. add watcher

?? should we add gulp script debugging here?
That will be pretty tricky on windows, no?

*/

var gulp = require('gulp');
var gulp-concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var maps = require('gulp-sourcemaps');

// Is this cross-platform? (that is, does windows support this?)
// Or do we need to use trash?
var del = require('del');

gulp.task('concatScripts', function () {
  return gulp.src([])
    .pipe(maps.init();)
    .pipe('concat.js')
})
