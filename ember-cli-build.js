'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      enabled: ['staging', 'production'].includes(process.env)
    },
    // Add options here
    'ember-composable-helpers': {
      only: ['range', 'toggle', 'inc', 'includes', 'array', 'dec'],
    },
    'ember-truth-helpers': {
      only: ['eq', 'lt', 'gt'],
    },
    'ember-math-helpers' : {
      only: ['sub', 'div', 'add']
    },
    'ember-cli-string-helpers': {
      only: ['truncate', 'concat'],
    },
    'ember-cli-uglify': {
      /* https://github.com/mike-north/ember-monaco/issues/54 */
      exclude: EmberApp.env() == 'production' ? ['ember-monaco/**'] : []
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('node_modules/@coding-blocks/motley/dist/hb/app.min.css')
  app.import('node_modules/js-base64/base64.min.js')
  app.import('node_modules/jszip/dist/jszip.min.js')

  return app.toTree();
};
