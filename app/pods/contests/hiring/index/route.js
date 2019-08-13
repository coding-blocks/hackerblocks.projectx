import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  afterModel(){
    this.transitionTo('contests.hiring.all.index')
  }
}
