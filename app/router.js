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
      this.route('contest', { path: '/c/:college_contest_id'}, function() {
        this.route('attempt', function() {
          this.route('problem', { path: '/p/:problem_id' });
        });
      });

      this.route('attempt', function() {});
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
        this.route('feedback');
      });
      this.route('apat', function() {
        this.route('archived');
        this.route('upcoming');
      });
    });

    this.route('admissions', function() {
      this.route('case', function() {});
    });
    this.route('course', function() {
      this.route('contest', { path: '/c/:course_contest_id'}, function() {
        this.route('problem', { path: '/p/:problem_id' });
      });
      this.route('id', { path: '/:course_id'});
    });
    this.route('hiring', function() {
      this.route('all', function() {
        this.route('archived');
        this.route('upcoming');
      });
      this.route('contest', { path: '/c/:hiring_contest_id'}, function() {
        this.route('attempt', function() {
          this.route('problem', {path: '/p/:problem_id'});
          this.route('quiz', {path: '/q/:quiz_id'});
        });
        this.route('feedback');
      });
    });

    this.route('contest', {path: '/:contest_id'}, function() {
      this.route('problem', {path: '/p/:problem_id'});
      this.route('attempt', function() {
        this.route('problem', {path: '/p/:problem_id'});
        this.route('quiz', {path: '/q/:quiz_id'});
        this.route('web');
        this.route('loading');
      });
      this.route('feedback');
    });
    this.route('old-contest', {path: '/c/:contest_id'}, function() {
      this.route('problem', {path: '/p/:problem_id'});
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
        this.route('feedback');
      });
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
});

export default Router;
