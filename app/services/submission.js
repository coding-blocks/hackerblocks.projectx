import Service from '@ember/service';
import { inject as service } from '@ember/service'
import { Base64 } from 'js-base64';
import { dropTask, task, taskGroup } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class SubmissionService extends Service {
  @service api
  @service store

  lastResult = null

  initialize(contest, content) {
    this.set('contest', contest)
    this.set('content', content)
    this.set('lastResult', null)
  }

  @taskGroup({ drop: true }) codeTaskGroup

  @task({ group: 'codeTaskGroup' }) runCodeTask = function*(language, code, input) {
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
        this.set('lastResult', submission)
        return submission
      }
    }
    this.set('lastResult', null)
    return null
  }

  @task({ group: 'codeTaskGroup' }) submitCodeTask = function*(language, code) {
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
      if (submission.judge_result){
        yield this.store.queryRecord('content', {      
          custom: {
            ext: 'url',
            url: `${this.content.id}`
          },
          contest_id: this.contest.id,
        })  
        this.set('lastResult', submission)
        return submission
      }
    }
    this.set('lastResult', null)
    return null
  }

  @dropTask submitQuizTask = function *() {    
    const response = yield this.api.request('submissions/submit', {
      method: 'POST',
      data: {
        contest_id: this.contest.id,
        content_id: this.content.id
      }
    })
    let maxTries = 30
    while(maxTries--) {
      yield timeout(2000)
      const submission = yield this.store.findRecord('submission', response.submissionId, {
        refresh: true,
        include: 'badge'
      })
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
  }

  @dropTask submitProjectTask = function *(source_url) {
    const response = yield this.api.request('submissions/submit', {
      method: 'POST',
      data: {
        source: source_url,
        contest_id: this.contest.id,
        content_id: this.content.id
      }
    })
    let maxTries = 30
    while(maxTries--) {
      yield timeout(2000)
      const submission = yield this.store.findRecord('submission', response.submissionId, {
        refresh: true,
        include: 'badge'
      })
      if (submission.judge_result){
        if (this.fullScreen) {
          const score = +submission.score
          const progress = yield this.content.get('progress')
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
  }
}
