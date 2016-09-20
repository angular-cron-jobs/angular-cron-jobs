module.exports = function(config) {
  "use strict";

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: "",

    frameworks: ["jasmine"],

    files: [
      // components
      "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.6/angular.js",
      "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.6/angular-mocks.js",

      // source files
      "src/*.js",
      "test/*.js"
    ],

    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-coverage"
    ],

    // list of files to exclude
    exclude: [

    ],

    preprocessors: {
      "src/*.js": ["coverage"]
    },

    // optionally, configure the reporter
    coverageReporter: {
      dir : "coverage/",
      reporters: [
        {type: "lcov", subdir: "lcov"}
      ]
    },

    // test results reporter to use
    // possible values: "dots", "progress", "junit"
    reporters: ["dots", "coverage"],


    // web server port
    port: 9878,


    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ["PhantomJS"],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  });
};
