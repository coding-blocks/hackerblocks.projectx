import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SubmissionTestcases extends Component {
  selectedIndex = 0

  @computed('selectedIndex')
  get compilerMessage() {
    const testcase = this.testcases[this.selectedIndex]
    
    if (testcase.result) {
      return testcase.result
    }

    return window.atob(testcase.score === 100 ? testcase.stdout : testcase.stderr)
  }
}
