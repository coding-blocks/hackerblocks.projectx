import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class FeedbackRoute extends Route {
  @service navigation

  async beforeModel() {
    const contest = this.modelFor('contests.hiring.contest').contest
    const feedbacks = await this.store.query('contest-feedback', {
      filter: {
        contest_id: contest.get('id')
      }
    })
    if (feedbacks.length) {
      this.transitionTo('contests.hiring')
    }
  }
  
  model() {
    const contest = this.modelFor('contests.hiring.contest').contest
    const contest_attempt = contest.get('currentAttempt')
    const feedback = this.store.createRecord('contest-feedback', {
      stars: 5,
      body: '',
      contest: contest
    })

    return RSVP.hash({
      contest,
      contest_attempt,
      feedback
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('feedback', model.feedback)
  }
  
  afterModel(model) {
    if (!model.contest_attempt) {
      this.transitionTo('contests.hiring.contest')
    }
  }

  activate() {
    this.navigation.setVisibility(false)
  }
  
  deactivate() {
    this.navigation.setVisibility(true)
  }
}
