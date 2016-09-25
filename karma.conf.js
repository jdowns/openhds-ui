module.exports = function(config){
  config.set({

      basePath : './',

      plugins : [
          'karma-coverage',
          'karma-junit',
          'karma-babel-preprocessor',
          'karma-chrome-launcher',
          'karma-firefox-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine'
      ],

      preprocessors: {
          'ui/!(bower_components|npm_modules)/**/!(test)/*.js': 'babel',
          'ui/!(bower_components|npm_modules)/**/!(test)/*.js': 'coverage'
    },

    files : [
        'ui/bower_components/angular/angular.js',
        'ui/bower_components/angular-route/angular-route.js',
        'ui/bower_components/angular-mocks/angular-mocks.js',
        'ui/test/framework.js',
        'ui/app.js',

        'ui/census/controller/*.js',
        'ui/auth/controller/*.js',
        'ui/update/controller/*.js',
        'ui/audit/controller/*.js',

        'ui/census/test/*.js',
        'ui/auth/test/*.js',
        'ui/update/test/*.js',
        'ui/audit/test/*.js',
        'ui/test/*.js'
    ],

      autoWatch : true,

      frameworks: ['jasmine'],

      browsers : ['PhantomJS'],


      reporters: ['coverage', 'progress', 'junit'],
      junitReporter : {
          outputFile: 'test_out/unit.xml',
          suite: 'unit'
      }

  });
};
