'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var fs = require('fs');
var mainBowerFiles = require('main-bower-files');
var cors = require('cors');


// package config
var config = JSON.parse(fs.readFileSync('./package.json'));
var paths = {
    sass:[
        './src/sass/**/*.scss',
    ]
};

// transform used by gulp inject
var transform = function(path) {
    var version = new Date().getTime().toString();
    if (path.slice(-4) === '.css') {
        return '<link rel="stylesheet" href="' + path + '?v=' + version + '"/>';
    }
    path += '?v=' + version;
    // return inject.transform.apply(inject.transform, arguments);
    return '<script type="text/javascript" src="' + path + '"></script>';
};

// clean task
gulp.task('clean', function() {
    return gulp.src('./dist/*', { read: false })
        .pipe(clean());
});

/**
 * Inject sass files to main sass file
 */
gulp.task('inject-sass', function() {
    return gulp.src('./main.scss')
        .pipe(inject(gulp.src(['./src/sass/**/*.scss'], { read: false }), {
            addRootSlash: false,
            name: 'sass'
        }))
        //.pipe(rename('main.scss'))
        .pipe(gulp.dest('./'));
});

/**
 * Sass task
 */
gulp.task('sass', ['inject-sass'], function(done) {
    gulp.src('./main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload())
        .on('end', done);
});

// inject dev files to json
gulp.task('inject-dev', function() {

    gulp.src('./index.html')
        .pipe(inject(gulp.src(['./dist/css/**/*.css'], { read: false }), {
            relative: true,
            name: 'app',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/inter/index.css'], { read: false }), {
            relative: true,
            name: 'font',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/inter/index.css'], { read: false }), {
            relative: true,
            name: 'font',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/font-awesome/css/font-awesome.min.css'], { read: false }), {
            relative: true,
            name: 'font-awesome',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/jquery/dist/jquery.js'], { read: false }), {
            relative: true,
            name: 'jquery',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/bootstrap/dist/css/bootstrap.css'], { read: false }), {
            relative: true,
            name: 'bootstrap',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/bootstrap/dist/js/bootstrap.js'], { read: false }), {
            relative: true,
            name: 'bootstrap-js',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/axios/dist/axios.js'], { read: false }), {
            relative: true,
            name: 'axios',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/handlebars/handlebars.js'], { read: false }), {
            relative: true,
            name: 'handlebars',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/mvc/**/*'], { read: false }), {
            relative: true,
            name: 'mvc',
            transform: transform
        }))
        .pipe(inject(gulp.src(mainBowerFiles()), {
            relative: true,
            name: 'vendor',
            transform: transform
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('./*.html')
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

// watch task
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass', 'mvc', 'inject-dev']);
    //gulp.watch('./*.html', ['html']);
});

// run local web server, that will be used to serve angular files
gulp.task('webserver', function() {
    connect.server({
        name: config.name,
        root: "." + config.webServer.path,
        port: config.webServer.port,
        livereload: true,
        middleware: function() {
            return [cors()];
        }
    });
});


// build dev
gulp.task('build', function() {
    runSequence('clean', 'sass', 'copy-resources', 'copy-font-awesome','copy-jquery','bootstrap','handlebars','axios','mvc','inject-dev');
});

// build dev and start local server
gulp.task('serve', function() {
    runSequence('build', 'webserver', 'watch');
});

gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('copy-resources', function() {
    return gulp.src(['node_modules/@fontsource/inter/**/*']).pipe(gulp.dest('dist/inter'));
});

gulp.task('copy-font-awesome', function() {
    return gulp.src(['node_modules/fontawesome-4.7/**/*']).pipe(gulp.dest('dist/font-awesome'));
});
gulp.task('copy-jquery', function() {
    return gulp.src(['bower_components/jquery/**/*']).pipe(gulp.dest('dist/jquery'));
});
gulp.task('bootstrap', function() {
    return gulp.src(['bower_components/bootstrap/**/*']).pipe(gulp.dest('dist/bootstrap'));
});

gulp.task('axios', function() {
    return gulp.src(['bower_components/axios/**/*']).pipe(gulp.dest('dist/axios'));
});
gulp.task('handlebars', function() {
    return gulp.src(['bower_components/handlebars/**/*']).pipe(gulp.dest('dist/handlebars'));
});
// Generate dist folder
gulp.task('mvc', function() {
    return gulp.src(['app/**/*.js']).pipe(gulp.dest('dist/mvc'));
});
