module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    bower: { 
      install: {
          options: {
              layout: 'byComponent',
              bowerOptions: {forceLatest: true}
          }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
    },

    // babel: {
    //     options: {
    //         sourceMap: true
    //     },
    //     dist: {
    //         files: {
    //             'dist/app.js': 'src/app.js'
    //         }
    //     }
    // }
    
    jshint: {
      options: {
          ignores: ['js/ignore/**/*.js'],
          // reporter: require('jshint-stylish')
          // browser: true,
          // camelcase: true,
          // curly: true,
          // eqeqeq: true,
          // eqnull: true,
          // es3: true,
          // expr: true,
          // laxbreak: true,   // Allow line breaking before && or ||
          // loopfunc: true,
          // newcap: true,
          // noarg: true,
          // onevar: true,
          // sub: true,
          // undef: true,
          // white: true,
          globals: {
              jQuery: false,
          }
      },
      all: ['Gruntfile.js', 'js/**/*.js'],
      // beforeconcat: ['lib/**/*.js', 'js/**/*.js'],
      // afterconcat: ['dist/**/*.js']
    },

    concat: {
      options: {
        //separator: ';'
      },
      libs: {
        src: ['lib/**/*.js'],
        dest: 'dist/libs.js'
      },
      app: {
        src: [
          'js/**/*.js'
        ],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      options: {
        compress: true,
        mangle: true,
      },
      libs: {  
          src: 'dist/libs.js',
          dest: 'dist/libs.js'
      },
      app: {  
          src: 'dist/app.js',
          dest: 'dist/app.js'
      },
    },

  });
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['babel', 'concat', 'uglify']);
};