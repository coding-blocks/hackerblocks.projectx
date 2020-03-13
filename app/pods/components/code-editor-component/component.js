import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, taskGroup } from 'ember-concurrency-decorators';
import { computed } from '@ember/object';
import { alias, equal } from '@ember/object/computed';

export default class CodeEditorComponent extends Component {
  @service api
  @service store
  @service submission

  @alias('submission.codeTaskGroup.lastSuccessful.value') lastSubmission
  @alias('lastSubmission.judge_result') lastResult
  @equal('submission.codeTaskGroup.last.error.status', 429) submitSpam

  badge = null
  showAwardedBadge = false

  @computed('problem.id', 'contest.id')
  get storageKey () {
    if(this.problem) {
      return `hb:code:${this.get('problem.id')}:${this.get('contest.id')}`
    }
  }

  didReceiveAttrs() {
    this.submission.initialize(this.contest, this.content)
  }

  @task submitCodeTask = function *(language, code) {
    yield this.submission.submitCodeTask.perform(language, code)
    if (this.lastSubmission.get('badge.id')) {
      this.set('badge', this.lastSubmission.get('badge'))
      this.set('showAwardedBadge', true)
    }
  }
}
