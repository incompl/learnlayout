/* jshint node:true, camelcase:false */

module.exports = function(grunt) {

  // config
  grunt.initConfig({

    jekyll: {
      options: {
        src: 'templates',
        plugins: '_plugins',
        config: '_config.yml',
        dest: '_site',
        pygments: true
      },
      build: {

      },
      serve: {
        options: {
          watch: true,
          serve: true
        }
      }
    }

  });

  // plugins
  grunt.loadNpmTasks('grunt-jekyll');

  // tasks
  grunt.registerTask('default', ['jekyll:build']);
  grunt.registerTask('serve', ['jekyll:serve']);

};
