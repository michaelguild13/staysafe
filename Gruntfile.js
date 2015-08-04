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
          'js/components/*.jsx',
          'js/*.jsx'
        ],
        dest: 'dist/app.js'
      }
    },

    babel: {
      options: {
          nonStandard: true
      },
      app: {
        src: 'dist/app.js',
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

    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
    },

  });
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', [ 'concat', 'babel'/*, 'uglify'*/]);
};