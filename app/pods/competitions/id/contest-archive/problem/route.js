import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ContestArchiveProblemRoute extends Route {
  model(params) {
    const { contest } = this.modelFor('competitions.id.contest-archive')
    const problem = this.store.queryRecord('problem', {
      custom: {
        ext: 'url',
        url: `${params.problemId}`
      },
      contest_id: contest.get('id'),
      include: 'solution_stubs',
      reload: true
    })

    return Ember.RSVP.hash({
      contest,
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('problem', model.problem)
  }

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.problem.name
    })
  }

//   @action
//   error(err) {
//     if (err.isAdapterError) {
//       this.transitionTo('contests.course.contest')
//     }
//   }
}
