import Component from '@ember/component';
import ENV from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FullScreenContestView extends Component {
  @service monitorer
  showSubmitDialog = false

  didReceiveAttrs() {
    this._super(...arguments)
    this.setupMonitorer()
  }

  async didInsertElement() {
    // await this.ajax.request(ENV.apiHost + '/time')
    // if(this.contest.enforceFullscreen) {
    //   const fullScreenContestViewElement = document.getElementById('fullsceen-contest-view')
    //   if (fullScreenContestViewElement.requestFullscreen) {
    //     fullScreenContestViewElement.requestFullscreen.call(fullScreenContestViewElement)
    //   } else if (fullScreenContestViewElement.webkitRequestFullscreen) { /* Safari */
    //     fullScreenContestViewElement.webkitRequestFullscreen();
    //   } else if (fullScreenContestViewElement.msRequestFullscreen) { /* IE11 */
    //     fullScreenContestViewElement.msRequestFullscreen();
    //   }
    // }
  }

  re

  @action 
  resetFaultMessages() {
    this.monitorer.resetFaultMessages()
  }
}
