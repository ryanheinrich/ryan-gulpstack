# ryan-gulpstack
Ryan's Gulp Stack - Workflow

Gulp Plugins Used
  gulp-plumber
  gulp-rename
  gulp-uncss
  gulp-autoprefixer
  gulp-concat
  gulp-jshint
  gulp-uglify
  gulp-imagemin
  gulp-cssnano
  gulp-sass
  gulp-clean
  browser-sync
  run-sequence
  gulp-htmlmin

Gulp Tasks
  gulp clean
    Removes all content in the 'dist' folder
  
  gulp copy
    Copies all files and folders from the 'src/assets' folder to the 'dist/assets' folder
    
  gulp images
    Optimizes and copies images from 'src/images' to 'dist/img' folder
    
  gulp styles
    Compiles Sass files from 'src/styles/sass' to 'dist/css'
    Imports 'bourbon' sass plugin
    Runs autoprefixer on css
    Runs 'uncss' on files in 'src/*.html' to remove any unused css styles
    Generates a minified version of css with the '.min.css' suffix and places in 'dist/css'
      *Note* Both minified and expanded versions of css are placed in 'dist/css'
    
  gulp html
    Minifies html files located in 'src/' and places them in root directory of 'dist' folder
    
  gulp build
    Runs: clean, styles, images, copy, scripts, & html in that sequence
  
  gulp DEFAULT
    Runs all tasks, launches browsersync, and watches 'src' files for changes
  
    
