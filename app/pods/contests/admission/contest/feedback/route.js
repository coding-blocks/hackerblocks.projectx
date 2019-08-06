import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class FeedbackRoute extends Route {
  @service navigation

  async beforeModel() {
    const contest = this.modelFor('contests.admission.contest').contest
    const feedbacks = await this.store.query('contest-feedback', {
      filter: {
        contest_id: contest.get('id')
      }
    })
    if (feedbacks.length) {
      this.transitionTo('contests.admission')
    }
  }
  
  model() {
    const contest = this.modelFor('contests.admission.contest').contest
    const contest_attempt = contest.get('currentAttempt')
    const feedback = this.store.createRecord('contest-feedback', {
      stars: 3,
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
      this.transitionTo('contests.admission.contest')
    }
  }

  @action
  willTransition() {
    this.navigation.setVisibility(true)
  }
  
  @action
  didTransition() {
    this.navigation.setVisibility(false)
  }
}
