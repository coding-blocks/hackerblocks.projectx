import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  beforeModel() {
    const content = this.modelFor('contests.contest.attempt.content')
    switch(content.type) {
      case 'problem': this.transitionTo('contests.contest.attempt.content.problem'); break
      case 'quiz': this.transitionTo('contests.contest.attempt.content.quiz'); break
      case 'project': this.transitionTo('contests.contest.attempt.content.project'); break
    }
  }
}
