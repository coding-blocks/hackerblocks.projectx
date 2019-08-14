'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'hackerblocks',
    podModulePrefix: 'hackerblocks/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-simple-auth-token': {
      identificationField: 'code',
      passwordField: 'code',
      tokenPropertyName: 'jwt',
      refreshAccessTokens: true,
      tokenExpireName: 'exp',
      refreshLeeway: 60, //send a request for refresh_token 60sec before actual expiration
      authorizationPrefix: 'JWT ',
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.publicUrl = 'http://localhost:4200'
    ENV.apiHost = 'http://localhost:3000'
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.clientId = 3680446660
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.clientId = 3680446660
  }

  if (environment === 'staging') {
    ENV.publicUrl = 'http://hack.codingblocks.xyz/admin';
    ENV.apiHost = 'https://api.codingblocks.xyz';
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.clientId = "2146237097"
  }

  if (environment === 'production') {
    ENV.publicUrl = 'https://srv17.cb.lk/app'
    ENV.apiHost = 'https://srv17.cb.lk'
    ENV.oneauthURL = 'https://account.codingblocks.com'
    ENV.rootURL = '/app';
    ENV.clientId = 3680446660
    // here you can enable a production-specific feature
  }

  ENV['ember-simple-auth'] = {
    refreshTokenPropertyName: "refresh_token"
  }
	ENV['ember-simple-auth-token'].serverTokenEndpoint = ENV.apiHost + "/api/v2/jwt/login/"
	ENV['ember-simple-auth-token'].serverTokenRefreshEndpoint = ENV.apiHost + "/api/v2/jwt/refresh/"

  return ENV;
};
