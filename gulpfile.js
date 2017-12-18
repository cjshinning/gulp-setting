var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var connect  = require('gulp-connect');

// 压缩js
gulp.task('js', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
});

// 编译sass
gulp.task('sass', function(){
	gulp.src('src/scss/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(csso())
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload())
});

// 图片压缩
gulp.task('images', function(){
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
		.pipe(connect.reload())
});

// html压缩
gulp.task('html', function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
});

// livereload热加载
gulp.task('connect', function(){
	connect.server({
		port: 8001,
    	livereload: true
	})
});

gulp.task('watch', function () {
  gulp.watch(['src/js/*.js'], ['js']);
  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch(['src/scss/*.scss'], ['images']);
  gulp.watch(['src/*.html'], ['html']);
});

// 默认任务
gulp.task('default', ['connect','watch']);