import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, taskGroup } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import { Base64 } from 'js-base64';
import { alias } from '@ember/object/computed';

export default class CodeEditorComponent extends Component {
  @service api
  @service store

  @alias('judgeTaskGroup.lastSuccessful.value.judge_result') lastResult

  showAwardedBadge = false

  @computed('problem.id', 'contest.id')
  get storageKey () {
    if(this.problem) {
      return `hb:code:${this.get('problem.id')}:${this.get('contest.id')}`
    }
  }

  @taskGroup({ drop: true }) judgeTaskGroup

  @task({ group: 'judgeTaskGroup' }) onRunTask = function*(language, code, input) {
    try {
      const response = yield this.api.request('submissions/run', {
        method: 'POST',
        data: {
          content_id: this.content.id,
          input: Base64.encode(input),
          source: Base64.encode(code),
          language
        }
      })
      let maxTries = 30
      while(maxTries--) {
        yield timeout(2000)
        const submission = yield this.store.findRecord('submission', response.submissionId, { refresh: true })
        if (submission.judge_result){
          return submission
        }
      }
      return null
    } catch (err) {
      this.set('resultComponent', '')
      if (err.status == 429) {
        this.set('submitSpam', true)
        later(() => this.set('submitSpam', false), 10000)
      }
    }
  }

  @task({ group: 'judgeTaskGroup' }) onSubmitTask = function*(language, code) {
    try {
      const response = yield this.api.request('submissions/submit', {
        method: 'POST',
        data: {
          contest_id: this.contest.id,
          content_id: this.content.id,
          source: Base64.encode(code),
          language
        }
      })
  
      let maxTries = 30
      while(maxTries--) {
        yield timeout(2000)
        const submission = yield this.store.findRecord('submission', response.submissionId, {
          refresh: true,
          include: 'badge'
        })
        if (submission.get('badge.id')) {
          this.set('badge', submission.get('badge'))
          this.set('showAwardedBadge', true)
        }
        if (submission.judge_result){
          if (this.fullScreen) {
            const score = +submission.score
            const progress = yield this.problem.get('progress')
            if (progress.get('status') === 'done') {
              return
            }
            if (score === 100) {
              progress.set('status', 'done')
            } else if (score > 0 && score < 100) {
              progress.set('status', 'undone')
            } else {
              progress.set('status', 'failed')
            }
            progress.save()
          }
          return submission
        }
      }
      return null
    } catch (err) {
      if (err.status == 429) {
        this.set('submitSpam', true)
        later(() => this.set('submitSpam', false), 10000)
      }
    }
  }
}
