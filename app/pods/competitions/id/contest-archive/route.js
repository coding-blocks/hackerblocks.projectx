import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  async model (params) {
    const contest = await this.store.findRecord('contest', params.contestId)
    
    let contest_attempt = await this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: params.contestId
    })

    if (!contest_attempt) {
      contest_attempt = this.store.createRecord('contest-attempt', {
        contest
      })
      await contest_attempt.save()
    }

    const competition = this.modelFor('competitions.id')

    return RSVP.hash({
      contest,
      contest_attempt,
      competition
    })
  },

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.contest.name
    })
  }
});
