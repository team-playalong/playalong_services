'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

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
          scripts: {
            files: ['app/**/*.js'],
            tasks: ['jshint:all'],
            options: {
              spawn: false,
            },
          },
        }
    });

    
    grunt.registerTask('default', ['concat']);
};