import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ProblemRoute extends Route {
  model(params) {
    const { contest } = this.modelFor('contests.contest')
    const content = this.store.queryRecord('content', {
      custom: {
        ext: 'url',
        url: `${params.content.problemId}`
      },
      contest_id: contest.get('id'),
      include: 'solution_stubs',
      reload: true
    })

    return Ember.RSVP.hash({
      contest,
      content
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('content', model.content)
  }

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.content.name
    })
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.contest')
    }
  }
}
