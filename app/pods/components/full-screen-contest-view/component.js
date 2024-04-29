import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class FullScreenContestView extends Component {
  @service monitorer
  showSubmitDialog = false

  didReceiveAttrs() {
    this._super(...arguments)
    this.setupMonitorer()
  }
}
