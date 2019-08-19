import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SubmitResult extends Component {
  selectedIndex = 0

  @computed('selectedIndex')
  get compilerMessage() {
    return this.judgeResult.data.testcases[this.selectedIndex].result
  }

  @computed('judgeResult.data.testcases')
  get correctAnswer() {
    return this.judgeResult.data.testcases.reduce((prev, curr) => 
      curr.result !== 'correct' ? false : true
    , true)
  }
}
