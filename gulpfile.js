const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');


const path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        image: 'build/img/',
        fonts: 'build/fonts/',
        js: 'build/js/'
    },
    src: {
        html: 'src/*.html',
        style: 'src/scss/main.scss',
        image: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*',
        js: 'src/js/*.js'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/scss/**/*.scss',
        image: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*',
        js: 'src/js/*.js'
    },
};

function html () {
    return gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
}

function style () {
    return gulp.src(path.src.style)
            .pipe(sass())
            .pipe(autoprefixer({
                cascade: true
            }))
            .pipe(gulp.dest(path.build.css))
            .pipe(browserSync.stream())
}

function script () {
    return gulp.src(path.src.js)
            .pipe(webpack(require('./webpack.config')))
            .pipe(gulp.dest(path.build.js))
            .pipe(browserSync.reload({stream: true}))
}

function fonts () {
    return gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts))
}

function image () {
    return gulp.src(path.src.image)
            .pipe(gulp.dest(path.build.image))
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })
    gulp.watch(path.watch.style, style);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.image, image);
    gulp.watch(path.watch.fonts, fonts);
    gulp.watch(path.watch.js, script);
}

function build() {
    style();
    html();
    image();
    fonts();
    script();
    watch();
}

exports.html = html;
exports.style = style;
exports.image = image;
exports.fonts = fonts;
exports.watch = watch;
exports.build = build;
exports.script = script;