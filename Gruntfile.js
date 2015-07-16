module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.initConfig({
        concat: {
            js: {
                src: 'app/**/*.js',
                dest: 'dist/app.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
        },
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        },
        watch: {
            js: {
                files: ['app/**/*.js', 'test/**/*.js'],
                tasks: ['jshint:all'],    
            },
            wiredep: {
                files: ['bower_components/*'],
                tasks: ['wiredep'],       
            },
            
            options: {
              spawn: false,
            }
        },
        connect: {
          server: {
            options: {
              livereload: true,
              base: '_site/',
              port: 9009
            }
          }
        },
        wiredep: {

          task: {

            // Point to the files that should be updated when
            // you run `grunt wiredep`
            src: [
              'app/views/**/*.html',   // .html support...
              'app/views/**/*.jade',   // .jade support...
              'app/styles/main.scss',  // .scss & .sass support...
              'app/config.yml'         // and .yml & .yaml support out of the box!
            ],

            options: {
              
            }
          }
        }
    });

    
    grunt.registerTask('default', ['wiredep','concat']);
    grunt.registerTask('serve', [
    'connect:server',
    'watch'
    ]);

};