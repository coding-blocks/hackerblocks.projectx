import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const { contest } = this.modelFor('contests.contest')
    const content = this.modelFor('contests.contest.attempt.content')
    return {
      content,
      contest
    }
  },
  setupController(controller, model) {
    controller.set('content', model.content)
    controller.set('contest', model.contest)
    controller.set('source', { html: '', css: '', js: '' })
  }
});
