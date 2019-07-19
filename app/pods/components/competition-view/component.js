import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class CompetitionViewComponent extends Component {
  @service api
  @service store

  didReceiveAttrs() {
    this.fetchRecentContestTask.perform()
  }

  @restartableTask fetchRecentContestTask = function *() {
    const payload = yield this.api.request(`competitions/${this.competition.id}/recent-contest`, {
      method: 'GET'
    })
    this.store.pushPayload('contest', payload)
    const contest = this.store.peekRecord('contest', payload.data.id)
    return contest
  }
}
