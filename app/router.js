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
  this.route('practice', function() {
    this.route('contest', {path: '/:practice_id'}, function() {
      this.route('problem', {path: '/p/:problem_id'});
    });
  });
  this.route('problem');
  this.route('competitions', function() {
    this.route('id', {path: '/:competition_id'}, function() {
      this.route('contest', {path: '/c/:contest_id'}, function() {
        this.route('attempt');
      });
    });
  });
});

export default Router;
