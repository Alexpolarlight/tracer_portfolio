const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Copy All HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
})

// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// // Minify JS
// gulp.task('minify', function(){
//     gulp.src('src/js/*js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// })

// Scripts
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./dist"  
    });
    gulp.watch(['src/js/*.js'], ['scripts',]);
    gulp.watch(['src/scss/*.scss'], ['sass',]);
    gulp.watch(['src/*.html'], ['copyHtml',]);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve', 'copyHtml', 'message', 'imageMin', 'scripts']);

// Logs Message
gulp.task('message', function(){
    return console.log('Gulp is running...');
})

