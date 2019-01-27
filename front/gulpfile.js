var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var util = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin'); //html压缩


var path = {
    'html': './templates/**/',//**中间有任意多个目录
    'css': './src/css/',
    'js': './src/js/',
    'images': './src/images/',
    'css_dist': './dist/css/',
    'js_dist': './dist/js/',
    'images_dist': './dist/images/',
    'html_dist': './dist/templates/'
};
//处理html文件任务
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(path.html + '*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest(path.html_dist))
        .pipe(bs.stream())  //重新加载
    });

//定义一个css任务
// gulp.task('css', function () {
//     return gulp.src(path.css + '*.css')
//         .pipe(cssnano())
//         .pipe(rename({'suffix': '.min'}))
//         .pipe(gulp.dest(path.css_dist))
//         .pipe(bs.stream())
//
// });

//定义一个scss任务
gulp.task('css', function () {
    return gulp.src(path.css + "*.{scss,css}")
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream())
});
//定义一个js任务
gulp.task('js', function () {
    return gulp.src(path.js + '*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', util.log))
        .pipe(rename({'suffix': '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream())
});

//定义一个图片文件
gulp.task('images', function () {
    return gulp.src(path.images + '*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.images_dist))
        .pipe(bs.stream())
});

//定义监听文件修改的任务
gulp.task('watch', function () {
    gulp.watch(path.html + '*.html', ['html']);
    gulp.watch(path.css + '*.scss', ['css']);
    gulp.watch(path.js + '*.js', ['js']);
    gulp.watch(path.images + '*.*', ['images']);
});

//初始化服务器，brower-sync的任务
gulp.task('bs', function () {
    return bs.init({
        'server': {
            'baserDir': './'
        }
    })
});

//创建默认任务
gulp.task('default', ['bs', 'watch']);