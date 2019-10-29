var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");

// Funcion lanzar servidor. Escucha sass. Actualiza navegador. Comprime JS
gulp.task("default", ["sass", "jscompress"], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("src/scss/**/*.scss", ["sass"]);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("src/js/*.js", ["jscompress"]).on("change", browserSync.reload);
});

// Función sass. Autoprefixer. Carpeta de destino. Actualiza el navegador. Minifica CSS. Renombra el fichero de compilación de CSS. Carpeta de destino
gulp.task("sass", function() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 10 versions"],
        cascade: true
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream())
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
  //.pipe(notify("CSS - Sass compilado"));
});

// Función watch para ejecutar sass (la tengo metida ya en mi función de serve y no me hace falta)
//gulp.task('watch', function(){
//	gulp.watch('src/scss/**/*.scss', ['sass']);
//})

// Función para minificar archivos .js. Notifica cuando la tarea se realiza
gulp.task("jscompress", function() {
  gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify("JS - JS comprimido"));
});

// Función para optimizar imágenes
gulp.task("imageoptimizer", function() {
  gulp
    .src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});
