const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const svgo = require('gulp-svgo');
const newer = require('gulp-newer');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "src/",
            online: true
        }
    });
};

function styles() {
    return gulp.src('src/css/style.css')
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(cleancss({
            level: { 1: { specialComments: 0 } }
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream())
};

function scripts() {
    return gulp.src('src/js/script.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/'))
        .pipe(browserSync.stream())
}

function images() {
    return gulp.src('src/assets/images/src/**/*')
        .pipe(newer('src/assets/images/'))
        .pipe(imagemin())
        .pipe(gulp.dest('src/assets/images/dest'))
}

function cleanimg() {
    return del('src/assets/images/dest/**/*', {
        force: true
    })
}

function icons() {
    return gulp.src('src/assets/icons/src/**/*')
        .pipe(newer('src/assets/icons/'))
        .pipe(svgo())
        .pipe(gulp.dest('src/assets/icons/dest'))
}

function buildcopy() {
    return gulp.src([
            'src/css/**/*.min.css',
            'src/js/**/*.min.js',
            'src/assets/fonts/**/*',
            'src/assets/images/**/*',
            'src/assets/icons/**/*',
            'src/**/*.html',
        ], { base: 'src' })
        .pipe(gulp.dest('dist'))
}

function cleandist() {
    return del('dist/**/*', {
        force: true
    })
}

function watch() {
    gulp.watch(['src/js/**/*.js', '!src/**/*.min.js'], scripts);
    gulp.watch(['src/css/*', '!src/css/*.min.css'], styles);
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/assets/images/src/**/*', images);
    gulp.watch('src/assets/icons/src/**/*', icons);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.icons = icons;
exports.cleanimg = cleanimg;
exports.build = gulp.series(cleandist, styles, scripts, images, icons, buildcopy);
exports.default = gulp.parallel(styles, scripts, browsersync, watch);