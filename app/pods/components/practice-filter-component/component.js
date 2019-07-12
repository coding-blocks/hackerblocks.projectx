import Component from '@ember/component';
import { action } from '@ember/object';

export default class PracticeFilterComponent extends Component {
  @action 
  updateDifficultyFilter(val) {
    if (this.difficulty.includes(val)) {
      this.difficulty.removeObject(val)
    } else {
      this.difficulty.addObject(val)
    }
    this.changeDifficultyFilter([...this.difficulty])
  }
  @action 
  updateStatusFilter(val) {
    if (this.status.includes(val)) {
      this.status.removeObject(val)
    } else {
      this.status.addObject(val)
    }
    this.changeStatusFilter([...this.status])
  }
}
