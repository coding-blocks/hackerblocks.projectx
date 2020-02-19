import Component from '@ember/component';
import layout from '../templates/components/w-async';
import { and } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class WAsync extends Component {
  layout = layout
  showLoading = 'w-async/loading'

  @and('task.isRunning', 'showLoading') isLoading

  @computed('task.last')
  get result() {
    return this.task.last.isError ? 
      this.task.lastErrored.error : 
      this.task.lastSuccessful.value
  }

  didReceiveAttrs() {
    if (this.autoFire) {
      this.task.perform()
    }
  }
}
