/* jshint node:true, camelcase:false */

var fs = require('fs');

module.exports = function(grunt) {

  // params
  var lang = grunt.option('lang') || 'en';
  var ftpDir = 'learnlayout';
  if (lang !== 'en') {
    ftpDir += '_' + lang;
  }

  // test for valid language
  try {
    fs.statSync('translations/' + lang + '.yaml');
  }
  catch (e) {
    grunt.fail.fatal('Invalid language "' + lang + '"');
  }
  grunt.log.write('Language: ' + lang);

  // config
  grunt.initConfig({

    jekyll: {
      options: {
        src: 'templates',
        plugins: '_plugins',
        dest: '_site',
        pygments: true,
        raw: 'lang: ' + lang
      },
      build: {},
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
        dest: ftpDir,
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
  grunt.registerTask('deploy', ['default', 'ftp-deploy']);

};
