const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');
const cssnano = require('cssnano');
const htmlMinify = require('html-minifier');

function html() {
	const options = {
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		sortClassName: true,
		useShortDoctype: true,
		collapseWhitespace: true,
		minifyCSS: true,
		keepClosingSlash: true,
	};
	return gulp
		.src('public/**/*.html')
		.pipe(plumber())
		.on('data', function (file) {
			const buferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
			return (file.contents = buferFile);
		})
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }));
}
exports.html = html;

function css() {
	const plugins = [autoprefixer(), mediaquery(), cssnano()];
	return gulp
		.src('public/styles/**/*.css')
		.pipe(plumber())
		.pipe(concat('index.css'))
		.pipe(postcss(plugins))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }));
}
exports.css = css;

function images() {
	return gulp
		.src('public/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({ stream: true }));
}
exports.images = images;

function icon() {
	return gulp
		.src('public/icon/**/*.{jpg,png,svg,gif,ico,webp,avif}')
		.pipe(gulp.dest('dist/icon'))
		.pipe(browserSync.reload({ stream: true }));
}
exports.icon = icon;

function clean() {
	return del('dist');
}
exports.clean = clean;

const build = gulp.series(clean, gulp.parallel(html, css, images, icon));
exports.build = build;

function watchFiles() {
	gulp.watch(['public/**/*.html'], html);
	gulp.watch(['public/styles/**/*.css'], css);
	gulp.watch(['public/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
	gulp.watch(['public/icon/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}
const watchapp = gulp.parallel(build, watchFiles);
exports.watchapp = watchapp;

function serve() {
	browserSync.init({
		server: {
			baseDir: './dist',
		},
	});
}
exports.serve = serve;
