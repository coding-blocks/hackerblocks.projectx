import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency'

export default class ProblemController extends Controller {
  @service store
  @service api

  @dropTask
  onRunTask = function*(language, code) {
    const response = yield this.api.request('submissions/run', {
      method: 'POST',
      data: {
        input: 'some input',
        source: code,
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
        source: code,
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
