import Route from '@ember/routing/route';

export default class AttemptIndexRoute extends Route{
  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    },
    difficulty: {
      refreshModel: false
    },
    status: {
      refreshModel: false
    }
  }

  model() {
    return this.modelFor('contests.college.contest')
  }

  setupController(controller, model){
    controller.set('college_contest', model.college_contest)
    controller.set('contest', model.contest)
  }
}
