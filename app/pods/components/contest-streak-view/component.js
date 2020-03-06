import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class ContestStreakView extends Component {
  @service store
  @alias('fetchContestStreakTask.lastSuccessful.value') streaks

  @computed('streaks')
  get streak() {
    if (this.streaks) {
      return this.streaks.toArray()[0]
    }
  }
  @computed('content')
  get topSubmission() {
    return this.content.topSubmission
  }

  didReceiveAttrs() {
    this.fetchContestStreakTask.perform()
  }

  @restartableTask fetchContestStreakTask = function *() {
    return yield this.store.query('contest-streak', {
      filter: {
        contestId: this.contest.id
      }
    })
  }
}
