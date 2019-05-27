import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('contests', function() {});
  this.route('dcb', function() {
    this.route('problem', {path: '/:problem_id'});
  });
  this.route('loading');
  this.route('logout');
});

export default Router;
