import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RatingCardComponent extends Component {
  @service store
  @service currentUser

  feedback = null

  didReceiveAttrs() {
    this.feedback = this.store.createRecord('content-feedback', {
      stars: 0,
      body: '',
      user: this.currentUser.user,
      content: this.content,
      contest: this.contest
    })
  }

  @dropTask saveFeedbackTask = function *() {
    return yield this.feedback.save()
  }

  @action
  updateFeedbackStars(value) {
    this.feedback.set('stars', value)
  }
}
