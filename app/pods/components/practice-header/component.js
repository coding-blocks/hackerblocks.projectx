import Component from '@ember/component';
import DS from 'ember-data';
import { computed } from '@ember/object';

export default class PracticeHeader extends Component {
  @computed('practice.contest')
  get problemCount() {
    return DS.PromiseObject.create({
      promise: this.practice.contest.then(c => ({
        count: c.hasMany('problems').ids().length
      }))
    })
  }
}
