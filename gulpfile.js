const gulp = require('gulp');

const gulpIncludeTemplate = require("gulp-include-template");

const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');

const jsImport = require('gulp-js-import'); // https://www.npmjs.com/package/gulp-js-import

const replace = require('gulp-string-replace');
const rename = require('gulp-rename');

const RENoCacheSearch = /\[ncc_at\]/ig;
const RENoCacheReplace = 'nc' + Math.round(Math.random() * 12345) + '=' + 
                Date.now() + 
                '-' + Math.round(Math.random() * 100000000000) + '';

var path = {
    src: (parts) => [__dirname, 'src', ...parts].join('/'),
    build: (parts) => [__dirname, 'build', ...parts].join('/')
}


function html(cb) {
    gulp.src(path.src(['html', 'pc.html']))
        .pipe(gulpIncludeTemplate())
        .pipe(replace(RENoCacheSearch, RENoCacheReplace))
        .pipe(gulp.dest(path.build([])));
    cb();
}

function js(cb) {
    ['basic', 'pc'].forEach((fn) => {
        gulp.src(path.src(['js', `${fn}.js`]))
            .pipe(jsImport({ hideConsole: true }))
            .pipe(rename(`${fn}.js`))
            .pipe(gulp.dest(path.build(['static', 'js'])));
    });
    cb();
}

function scss(cb) {
    gulp.src(['basic', 'pc'].map((fn) => path.src(['scss', `${fn}.scss`])))
        .pipe(sass().on('error', sass.logError))
        .pipe(replace(RENoCacheSearch, RENoCacheReplace))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build(['static', 'css'])));
    cb();
}

function files(cb) {
    gulp.src(path.src(['assets', '**/*.png']))
        .pipe(gulp.dest(path.build(['static', 'img'])));
    cb();
}

exports.default = gulp.series(
    gulp.parallel(html, files),
    gulp.parallel(scss, js)
);
