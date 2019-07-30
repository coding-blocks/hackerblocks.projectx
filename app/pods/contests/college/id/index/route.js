import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class IdRoute extends Route {
  queryParams = {
    offset: {
      refreshModel: false
    },
    limit: {
      refreshModel: false
    }
  }

  async model(params) {
    const { college_contest_id } = this.paramsFor('contests.college.id')
    const college_contest = await this.store.findRecord('college_contest', college_contest_id, {
      include: 'contest',
      reload: true
    })
    
    const contest = college_contest.contest
    return RSVP.hash({
      college_contest,
      contest
    })
  }

  setupController(controller, model) {
    controller.set('college_contest', model.college_contest)
    controller.set('contest', model.contest)
  }
}
