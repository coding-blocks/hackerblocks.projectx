import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RatingCardComponent extends Component {
  @service store
  @service currentUser

  feedback = null

  didReceiveAttrs() {
    this.feedback = this.store.createRecord('problem-feedback', {
      stars: 0,
      body: '',
      user: this.currentUser.user,
      problem: this.problem,
      contest: this.contest
    })
  }

  @dropTask saveFeedbackTask = function *() {
    return yield this.feedback.save()
  }

  @action
  updateFeedbackStars(value) {
    debugger
    this.feedback.set('stars', value)
  }
}
