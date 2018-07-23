var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");

// Funcion lanzar servidor, escuchar sass y actualizar navegador
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js", ['jscompress']);
});


// Función autoprefixer
gulp.task('autoprefixer', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(gulp.dest('dist/css'))
});


// Función sass
gulp.task('sass', function(){
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true
        }))
		.pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        //.pipe(notify("CSS - Sass compilado"));
});

// Función watch para ejecutar sass 
//La tengo metida ya en mi función de serve y no me hace falta
//gulp.task('watch', function(){
//	gulp.watch('src/scss/**/*.scss', ['sass']);
//})



// Función para minificar archivos .js
gulp.task('jscompress', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ],
    cb
  )
  .pipe(notify("JS - JS comprimido"));
});


// Función para optimizar imágenes
gulp.task('optimize', function() {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});


