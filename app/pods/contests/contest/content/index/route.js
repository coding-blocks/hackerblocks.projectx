import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  beforeModel() {
    const { content } = this.modelFor('contests.contest.content')
    switch(content.content.type) {
      case 'problem': 
        return this.transitionTo('contests.contest.content.problem')
      case 'quiz':
        return this.transitionTo('contests.contest.content.quiz')
    }
  }
}
