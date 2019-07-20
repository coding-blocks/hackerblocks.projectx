import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';


export default class ProblemViewComponent extends Component {
  @service store
  @service api

  selectedTab = 'problem'
}
