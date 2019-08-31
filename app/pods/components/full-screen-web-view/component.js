import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object'

export default class FullScreenWebViewComponent extends Component {
  currentTab = 'problem'
  @service api

  @action
  handleTextChange(event) {
    this.set(event.type, event.content)
  }

  @action
  onEditorReady (editor) {
    this.set('editor', editor)
  }

  @computed('contest.id', 'problem.id')
  get key () {
    return `webproblem:${this.contest.id}:${this.problem.id}`
  }

  didReceiveAttrs () {
    this._super(...arguments)
  }

  @dropTask submitTask = function * () {
    const {htmlUrl, cssUrl, jsUrl} = yield this.api.request('submissions/web/urls')
    const {html, css, js} = this.editor.getContent()
    
    const uploadHTML = fetch(htmlUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: html
    }).then(() => htmlUrl.split('?')[0])

    const uploadCSS = fetch(cssUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: css
    }).then(() => cssUrl.split('?')[0])

    const uploadJS = fetch(jsUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: js
    }).then(() => jsUrl.split('?')[0])

    const links = yield Promise.all([uploadHTML, uploadCSS, uploadJS])

    yield this.api.request('submissions/web/submit', {
      method: 'POST',
      data: {
        contest_id: this.contest.id,
        problem_id: this.problem.id,
        links
      }
    })
    
  }

}