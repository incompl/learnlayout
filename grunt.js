// Sample grunt-jekyll grunt.js file
// https://github.com/dannygarcia/grunt-jekyll

/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jekyll: {
            server : {
                src : 'templates',
                dest: 'dev',
                server : true,
                server_port : 8000,
                auto : true,
                pygments: true
            },
            dev: {
                src: 'templates',
                dest: 'dev'
            },
            prod: {
                src: 'templates',
                dest: 'prod'
            }
        },

        watch: { // for development run 'grunt watch'
            jekyll: {
                files: ['templates/*.html'],
                tasks: ['jekyll:dev']
            }
        }
    });

    // Default task. Run standard jekyll server.
    grunt.registerTask('default', 'jekyll:server');

    // plugin tasks
    grunt.loadNpmTasks('grunt-jekyll');
};