import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SubmissionResult extends Component {
  didRender() {
    this.element.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  @computed('contentType')
  get isProjectSubmission() {
    return this.contentType === 'project'
  }

  @computed('contentType')
  get message() {
    if(this.contentType === 'project') {
      if(this.judgeResult.stderr !== '') {
        return 'Wrong Answer'
      } else if(this.judgeResult.stdout && this.judgeResult.score === 100) {
        return 'Correct Answer'
      }
      return 'Incorrect Answer'
    }
      return 'Compilation Successful'
  }

  @computed('judgeResult')
  get isRunning() {
    return !this.judgeResult
  }

  @computed('judgeResult')
  get isErrored() {
    return !!this.judgeResult.stderr
  }

  @computed('judgeResult')
  get isSubmission() {    
    return !!(this.judgeResult.testcases)
  }

  @computed('isErrored')
  get errorPayload() {    
    if (this.isErrored) {      
      return window.atob(this.judgeResult.stderr || this.judgeResult.stdout)
    }
  }

  @computed('isSubmission')
  get output() {
    if (!this.isSubmission) {
      return window.atob(this.judgeResult.stdout)
    }
  }

  @computed('isSubmission')
  get testcasesPayload() {
    if (this.isSubmission) {
      return this.judgeResult.testcases
    }
  }
}
