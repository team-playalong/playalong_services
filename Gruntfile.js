'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: 'src/**/*.js',
                dest: 'dist/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
};