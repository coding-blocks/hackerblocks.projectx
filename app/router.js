import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('contests', function() {
    this.route('college', function() {
      this.route('all', function() {
        this.route('live');
        this.route('upcoming');
        this.route('archived');
      });
      this.route('attempt', function() {});
    });
    this.route('admission', function() {
      this.route('cast', function() {
        this.route('upcoming');
        this.route('archived');
      });
      this.route('apat', function() {
        this.route('archived');
        this.route('upcoming');
      });
    });
    this.route('course', function() {
      this.route('id', { path: '/:course_id'});
    });
    this.route('hiring', function() {
      this.route('all', function() {
        this.route('archived');
        this.route('upcoming');
      });
    });
    this.route('contest', {path: '/:contest_id'}, function() {
      this.route('attempt', function() {
        this.route('loading');
        this.route('content', {path: '/:content_id'}, function() {
          this.route('problem', {path: '/problem'});
          this.route('quiz', {path: '/quiz'});
          this.route('project', {path: '/project'})
          this.route('web');
        });
      });
      this.route('feedback');
      this.route('content', {path: '/:content_id'}, function() {
        this.route('quiz');
        this.route('problem');
        this.route('project')
      });
    });
  });
  this.route('dcb', function() {
    this.route('problem', {path: '/:content_id'});
  });
  this.route('loading');
  this.route('logout');
  this.route('practice', function() {
    this.route('contest', {path: '/:practice_id'}, function() {
      this.route('problem', {path: '/p/:problem_id'});
      this.route('content', {path: '/:content_id'}, function() {
        this.route('problem');
        this.route('quiz');
        this.route('project');
      });
    });
  });
  this.route('problem');
  this.route('competitions', function() {
    this.route('id', {path: '/:competition_id'}, function() {
      this.route('contest-archive', {path: '/archive/:contestId'} ,function() {
        this.route('problem', {path: '/p/:problemId'});
      });
    });
  });
  this.route('users', function() {
    this.route('id', { path: '/:user_id' });
  })
  this.route('help');
  this.route('login');
  this.route('error');
  this.route('404', { path: '/*:' });

  this.route('contest', function() {});

  this.route('web-challenge', function() {});
});

export default Router;
