import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('contests', function() {
    this.route('college', function() {
      this.route('id', {path: '/:college_contest_id'}, function() {
        this.route('problem', {path: '/p/:problem_id'});
      });
      this.route('all', function() {
        this.route('live');
        this.route('upcoming');
        this.route('archived');
      });
    });
    this.route('admission', function() {
      this.route('cast', function() {
        this.route('upcoming');
        this.route('archived');
      });
      this.route('contest', {path: '/c/:admission_contest_id'}, function() {
        this.route('attempt', function() {
          this.route('problem', {path: '/p/:problem_id'});
          this.route('quiz', {path: '/q/:quiz_id'});
        });
      });
      this.route('apat', function() {
        this.route('archived');
        this.route('upcoming');
      });
    });

    this.route('admissions', function() {
      this.route('case', function() {});
    });
  });
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
        this.route('attempt', function() {
          this.route('problem', {path: '/p/:problem_id'});
        });
      });
    });
  });
  this.route('users', function() {
    this.route('id', { path: '/:user_id' });
  })
});

export default Router;
