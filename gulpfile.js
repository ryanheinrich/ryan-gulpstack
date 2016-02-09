var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var uncss = require('gulp-uncss');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var nano = require('gulp-cssnano');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var sequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');

var PATHS = {
    sass: ['./src/styles/sass/**/*.scss'],
    javascript: [
        'dist/js/**/*.js',
    ],
    css: [
        'dist/css/*.css',
    ],
    assets: [
        'src/assets/**/*',
    ]
};

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
	return gulp.src('dist', {read: false})
		.pipe(clean({force: true}));
});

// Copy files out of the assets folder
gulp.task('copy', function() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest('dist/assets'));
});



gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({optimizationLevel: 3,progressive: true,interlaced: true}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function(done) {
    gulp.src(['src/styles/sass/**/*.scss'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(uncss({
            html: ['src/*.html', 'src/pages/**/*.html']
        }))
        .pipe(gulp.dest('dist/css/'))

        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(nano())

        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
        done();
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('custom.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', function(done){
  sequence('clean', ['styles', 'images', 'copy', 'scripts'], 'html', done);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});




/*
  gulp.task('index')
  Open up the index.html file
  In the head tag, replace all of the script tags for your controllers and services with the inject:js comment below. Make sure to leaveLeave the app.js script tag.

  <!-- inject:js -->
  <!-- endinject -->
  Replace the css tag for the style.css with the inject:css command below

  <!-- inject:css -->
  <!-- endinject -->

  to inject
*/

gulp.task('default', ['build', 'browser-sync'], function() {
    gulp.watch(PATHS.assets, ['copy']);
    gulp.watch(["src/styles/sass/**/*.scss"], ['styles']);
    gulp.watch(["src/scripts/**/*.js"], ['scripts']);
    gulp.watch(['src/images/**/*'], ['images']);
    gulp.watch(['src/*.html'], ['html', 'bs-reload']);
    // gulp.watch("*.html").on('change', browserSync.reload);
});
