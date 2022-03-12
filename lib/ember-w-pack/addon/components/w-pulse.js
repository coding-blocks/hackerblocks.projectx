import Component from '@ember/component';
import layout from '../templates/components/w-pulse';
import { task } from 'ember-concurrency-decorators';
import { timeout } from "ember-concurrency";
import { later } from '@ember/runloop';

export default class WPulseComponent extends Component {
  layout = layout

  duration = 3000

  didReceiveAttrs() {
    this._super(...arguments) 

    if(this.triggered) this.generatePulseTask.perform()
  }

  @task
  generatePulseTask = function *() {
    yield timeout(this.duration)
    later(() => this.set('triggered', false))
  }
}
