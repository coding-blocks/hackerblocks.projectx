import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default class ProblemViewComponent extends Component {
  @service store
  @service api

  selectedTab = 'problem'
}
