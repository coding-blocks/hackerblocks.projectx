import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class CollegeContestRoute extends Route{
  async model(params) {
    const { college_contest_id } = params
    const college_contest = await this.store.findRecord('college_contest', college_contest_id, {
      include: 'contest',
      reload: true
    })

    const contest = await college_contest.contest

    const contest_attempt = this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: contest.id
    })


    return RSVP.hash({
      college_contest,
      contest,
      contest_attempt
    })
  }

  afterModel(model){
    model.contest.set("currentAttempt", model.contest_attempt)
    this.set('breadCrumb', {
      title: model.college_contest.name
    })
  }
}
