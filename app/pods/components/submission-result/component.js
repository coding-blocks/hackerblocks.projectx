import Component from '@ember/component';
import { computed } from '@ember/object';
import { jsonToTable } from '../../../util/json-to-table';
export default class SubmissionResult extends Component {
  didRender() {
    this.element.scrollIntoView({ behavior: "smooth", block: "end" })
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
  jsonToTable(data) {
    const table = jsonToTable(data);
      return table;
  }
}
