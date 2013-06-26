/**
 * unit test settings for BusterJS.
 */

var config = module.exports;


config['xr_development'] = {
  rootPath : "../",
  environment : "browser",
  resources : [ "lib/google-closure-library/closure/goog/**/*.js", "src/**/*.js" ],
  libs : [ "lib/google-closure-library/closure/goog/base.js",
      "lib/google-closure-library/closure/goog/deps.js", "xr-deps.js",
      "test/requires.js" ],
  tests : [ 'test/base-test.js', ]
};

config['xr_build'] = {
  rootPath : "../",
  environment : "browser",
  libs : [ "bin/xr.js" ],
  tests : [ 'test/base-test.js', ]
};
