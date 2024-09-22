const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

gulp.task("css", function () {
	return gulp
		.src("src/css/input.css") // Path to your input CSS file
		.pipe(
			postcss([
				tailwindcss(),
				autoprefixer(),
				cssnano(), // Minify the output CSS
			])
		)
		.pipe(gulp.dest("css/output.css")); // Destination folder for the output CSS
});

gulp.task("watch", function () {
	gulp.watch("src/input.css", gulp.series("css"));
});
 
gulp.task("default", gulp.series("css", "watch"));
