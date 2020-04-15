import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SubmissionTestcases extends Component {
  selectedIndex = 0

  @computed('selectedIndex')
  get compilerMessage() {
    console.log(this.testcases)    
    return this.testcases[this.selectedIndex].result
  }
}
