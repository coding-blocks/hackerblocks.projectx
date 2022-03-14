import Component from '@ember/component';
import { action } from '@ember/object';
import { timeout } from "ember-concurrency";
import { restartableTask } from 'ember-concurrency-decorators';
import { later } from '@ember/runloop';

export default class WebChallengeWebChallengeCodeEditorComponent extends Component {
  HTMLSource = ''
  CSSSource = ''
  JSSource = ''
  autoRunEnabled = true

  didReceiveAttrs() {
    this._super(...arguments)

    this.set('HTMLSource', atob(this.source.html) || '')
    this.set('CSSSource', atob(this.source.css) || '')
    this.set('JSSource', atob(this.source.js) || '')

  }

  didUpdateAttrs() {
    this._super(...arguments) 
    if(this.autoRunEnabled) {
      later(() => this.initIframeTask.perform())
    }
  }

  @restartableTask
  initIframeTask = function *() {
    yield timeout(1800)

    this.$('#web-challenge-iframe').remove()

    const outputIframe = document.createElement('iframe')
    outputIframe.setAttribute('id', 'web-challenge-iframe')

    this.$('#web-challenge-output').append(this.$(outputIframe))
    
    this.$('#web-challenge-iframe').addClass('w-100 h-100')
    this.$('#web-challenge-iframe').attr('frameborder', '0')
    this.$('#web-challenge-iframe').contents().find('head').append(`<style>${this.CSSSource}</style>`)
    this.$('#web-challenge-iframe').contents().find('body').append(`${this.HTMLSource}`)
    this.$('#web-challenge-iframe').contents().find('body').append(`<script>try {${this.JSSource}} catch (err) {throw err;}</script>`)
  }

  @restartableTask
  handleSourceChangeTask = function *(language, source) {
    switch(language) {
      case 'html': this.set('HTMLSource', source); break;
      case 'css': this.set('CSSSource', source); break;
      case 'js': this.set('JSSource', source); break;
    }

    this.set('source', { html: btoa(this.HTMLSource), css: btoa(this.CSSSource), js: btoa(this.JSSource) })
  }

  @action 
  manualRun() {
    this.initIframeTask.perform()
  }

  @action
  toggleAutoRunEnabled() {
    this.toggleProperty('autoRunEnabled')

    if(this.autoRunEnabled) {
      this.handleSourceChangeTask.perform()
    }
  }
}
