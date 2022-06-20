import dartSass from "sass"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"

import cleancss from "gulp-clean-css"
import webpcss from "gulp-webpcss"
import autoPrefixer from "gulp-autoprefixer"
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass)

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(sass({
         outputStyle: "expanded"
      }))

      .pipe(app.plugins.if(
         app.isBuild,
         groupCssMediaQueries()
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         webpcss({
            webpClass: ".webp",
            noWebpClas: ".no-webp"
         })
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         autoPrefixer({
            grid: true,
            overrideBrowserslist: ["last 3 version"],
            cascade: true
         })
      ))
      // раскоментировать строчку если нужен не сжатый вариант css файла
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(
         app.isBuild,
         cleancss()
      ))
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
}