import Route from '@ember/routing/route';


export default class ContestArchiveIndexRoute extends Route {
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
      return this.modelFor('competitions.id.contest-archive')
    }
  
    setupController(controller, model) {
      controller.set('contest', model.contest)
      controller.set('competition', model.competition)
    }
  }
  
