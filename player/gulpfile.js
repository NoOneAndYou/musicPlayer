
// gulp.src()    读文件
// gulp.dest()   写文件
// gulp.task()   任务
// gulp.watch()  监听

var gulp = require('gulp');

var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-debug');
// var concat = require('gulp-concat');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixed = require('autoprefixer');
var cssnano = require('cssnano');

// 开启服务器
var connect = require('gulp-connect');

// export NODE_ENV = development 配置环境变量是生产环境, producation（开发环境）
var devMove = process.env.NODE_ENV == 'development';

var folder = {
    src : 'src/',   // 开发目录
    dist : 'dist/'   // 压缩打包之后的目录
}

gulp.task('html', function() {
    var page = gulp.src(folder.src + 'html/*')
            .pipe(connect.reload())
        if (!devMove) {
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + 'html/'))
})

gulp.task('image', function() {
    gulp.src(folder.src + 'image/*')
        .pipe(connect.reload())
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'))
})

gulp.task('js', function() {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        if (!devMove) {
            page.pipe(strip())   // 去注释
            // .pipe(concat('main.js')) // 合并js文件
            page.pipe(uglify())
        }

        page.pipe(gulp.dest(folder.dist + 'js/'))
})

gulp.task('css', function() {
    var options = [autoprefixed(), cssnano()];
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less())   // 转成css文件
        .pipe(connect.reload())
        if (!devMove) {
            page.pipe(postcss(options))  // 压缩和添加前缀css3
        }
        page.pipe(gulp.dest(folder.dist + 'css/'))
})

gulp.task('watch', function() {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'image/*', ['image']);
})

gulp.task('server', function() {
    connect.server({
        port: '8090',
        livereload: true
    });
})


gulp.task("default", ["html", "image", "js", "css", "watch", "server"])
