import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class ProblemController extends Controller {
  @service store
  @service api

  @computed('levels')
  get currentContestLevel() {
    return this.levels.findBy('contest.id', this.contest.id)
  }

  @dropTask
  onRunTask = function*(language, code, input) {
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
        return submission
      }
    }
    return null
  }

  @dropTask
  onSubmitTask = function*(language, code) {
    const response = yield this.api.request('submissions/submit', {
      method: 'POST',
      data: {
        contest_id: 1,
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
        return submission
      }
    }
    return null
  }
}
