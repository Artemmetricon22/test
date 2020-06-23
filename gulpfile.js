const gulp         = require('gulp');
const plugins      = require('gulp-load-plugins')();
const plumber      = require('gulp-plumber');
const browserSync  = require('browser-sync').create();
const del          = require('del');

gulp.task('sass', (done) => {
    gulp.src('src/scss/**/*.+(scss|sass)')
        .pipe(plumber())
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
            pretty: true,
            includePaths: ['./node_modules/susy/sass']
        }))
		.pipe(plugins.autoprefixer({
			overrideBrowserslist: ['last 10 versions'],
			cascade: false
		}))
		.on("error", plugins.notify.onError({
			message: "Error: <%= error.message %>",
			title: "Error running something"
		}))
		.pipe(plugins.csso())
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest('dist/static/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
	done();
});

gulp.task('copy-index', (done) => {
    gulp.src('src/index.html')
        .pipe(plumber())
		.pipe(gulp.dest('dist'))
		.on('end', browserSync.reload)
	done();
});


gulp.task('clean:dist', (done) =>{
    del.sync('dist/**/*', {
      force: true
    });
    done();
});

gulp.task('copy-js', (done) => {
    gulp.src('src/js/**/*.+(js)')
        .pipe(plumber())
		.pipe(gulp.dest('dist/js'))
		.on('end', browserSync.reload)
	done();
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
});

gulp.task('watch', ()=>{
    gulp.watch('src/js/**/*.+(js)', gulp.series('copy-js'));
    gulp.watch('src/index.html', gulp.series('copy-index'));
    gulp.watch('src/scss/**/*.+(scss|sass)', gulp.series('sass'));
})

gulp.task('default', gulp.series('clean:dist' ,gulp.parallel('copy-index', 'copy-js', 'sass'), gulp.parallel('watch', 'serve')));