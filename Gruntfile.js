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
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'startcontinue.com',
          port: 21
        },
        src: '_site',
        dest: 'learnlayout',
        exclusions: [
          'Gruntfile.js',
          'package.json',
          '.git*',
          'node_modules'
        ]
      }
    }

  });

  // plugins
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // tasks
  grunt.registerTask('default', ['jekyll:build']);
  grunt.registerTask('serve', ['jekyll:serve']);

  grunt.registerTask('deploy-english', ['default', 'ftp-deploy']);

};
