module.exports = function(config){
  config.set({

      basePath : './',

      plugins : [
          'karma-coverage',
          'karma-junit',
          'karma-chrome-launcher',
          'karma-firefox-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine'
      ],

      preprocessors: {
          'resources/public/app/!(bower_components|npm_modules)/**/!(test)/*.js': 'coverage'
    },

    files : [
        'resources/public/app/bower_components/angular/angular.js',
        'resources/public/app/bower_components/angular-route/angular-route.js',
        'resources/public/app/bower_components/angular-mocks/angular-mocks.js',
        'test/framework.js',
        'resources/public/app/app.js',
        'resources/public/app/census/controller/*.js',
        'resources/public/app/auth/controller/*.js',
        'resources/public/app/update/controller/*.js',
        'resources/public/app/census/test/*.js',
        'resources/public/app/auth/test/*.js',
        'resources/public/app/auth/test/*.js',
        'resources/public/app/update/test/*.js',
        'test/*.js'
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
