import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class CodeEditorComponent extends Component {
  @service api
  @service store
  @service scroller

  lastResult = null

  @dropTask onRunTask = function*(language, code, input) {
    const response = yield this.api.request('submissions/run', {
      method: 'POST',
      data: {
        problem_id: this.problem.id,
        input: window.btoa(input),
        source: window.btoa(code),
        language
      }
    })

    let maxTries = 20
    while(maxTries--) {
      yield timeout(2000)
      const submission = yield this.store.findRecord('submission', response.submissionId, { refresh: true })
      if (submission.judge_result){
        this.set('resultComponent', 'run-result')
        this.set('lastResult', submission.judge_result)
        this.scroller.scrollVertical('.result');
        return submission
      }
    }
    return null
  }

  @dropTask onSubmitTask = function*(language, code) {
    const response = yield this.api.request('submissions/submit', {
      method: 'POST',
      data: {
        contest_id: this.contest.id,
        problem_id: this.problem.id,
        source: window.btoa(code),
        language
      }
    })

    let maxTries = 20
    while(maxTries--) {
      yield timeout(2000)
      const submission = yield this.store.findRecord('submission', response.submissionId, { refresh: true })
      if (submission.judge_result){
        if (submission.judge_result.error){
          this.set('resultComponent', 'run-result')
        } else {
          this.set('resultComponent', 'submit-result')
        }
        this.set('lastResult', submission.judge_result)
        this.scroller.scrollVertical('.result');
        return submission
      }
    }
    return null
  }
}
