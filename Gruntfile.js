'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.initConfig({
        concat: {
            js: {
                src: 'app/**/*.js',
                dest: 'dist/app.js'
            }
        },
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        }
    });

    
    grunt.registerTask('default', ['concat']);
};