import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SubmitResult extends Component {
  selectedIndex = 0

  didRender() {
    this.element.scrollIntoView({behavior: "smooth", block: "end" })
  }

  @computed('selectedIndex')
  get compilerMessage() {
    return this.judgeResult.data.testcases[this.selectedIndex].result
  }
}
