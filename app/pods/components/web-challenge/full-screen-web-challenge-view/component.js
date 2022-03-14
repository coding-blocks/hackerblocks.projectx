import Component from '@ember/component';
import { action } from '@ember/object';
import { timeout } from "ember-concurrency";
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class FullScreenWebChallenge extends Component{
  @service store
  @service submission

  currentTab= 'problem'
  showSubmitted = false
  triggerFetchSubmissions = true

  didReceiveAttrs() {
    this._super(...arguments)

    this.submission.initialize(this.contest, this.content)
  }

  @dropTask newSubmissionTask = function* () {
    yield timeout(1000)

    const submission = this.store.createRecord('web-challenge-submission', {
      contestAttempt: yield this.contest.get('currentAttempt'),
      content: this.content,
      source: this.source
    })
    
    yield submission.save({adapterOptions: { contest_id: this.contest.id}})
    this.set('showSubmitted', true)
    this.set('triggerFetchSubmissions', true)
  }

  @action
  resetSource() {
    this.set('source', { html: '', css: '', js: ''})
  }

  @action
  setSource(source) {
    this.set('source', source)
    window.scrollTo(0,document.body.scrollHeight);
  }
}
