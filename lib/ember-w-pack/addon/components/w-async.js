import Component from "@ember/component";
import { computed } from '@ember/object';
import layout from '../templates/components/w-async';
import { later } from '@ember/runloop';

export default class WAsyncComponent extends Component {
  layout = layout
  
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.promise) {
      this.set('task', {
        isRunning: true,
        last: {value: null}
      })

      this.promise.then(resolved => {
        this.set('task', {
          isRunning: false,
          last: {
            value: resolved
          }
        })
      })
    }
    else if (this.triggered) {
      this.task.perform()
      later(() => this.set('triggered', false))
    }
    else if (this.autoFire) this.task.perform();
  }

  @computed('task.{isRunning,last.value}')
  get showLoader() {
    const { task } = this
    return task.isRunning && !task.last.value
  }
}
