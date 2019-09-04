import Component from '@ember/component';
import { computed } from '@ember/object';

export default class RunResultComponent extends Component {
  didRender() {
    this.element.scrollIntoView({behavior: "smooth", block: "end" })
  }

  @computed('judgeResult')
  get output() {
    if (this.judgeResult.data){
      return window.atob(this.judgeResult.data.output)
    } else if (this.judgeResult.error) {
      return window.atob(this.judgeResult.error)
    } else {
      return 'Your solution could not be judged in time. If the problem persists, please report it to Hacker Blocks admins - info@hackerblocks.com.'
    }
  }
}
