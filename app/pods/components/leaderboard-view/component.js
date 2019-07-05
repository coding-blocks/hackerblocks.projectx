import Component from '@ember/component';

export default class LeaderboardViewComponent extends Component {
  didReceiveAttrs() {
    this.fetchLeaderboardTask.perform()
  }
}
