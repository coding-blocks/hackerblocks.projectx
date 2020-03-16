import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SubmissionsListComponent extends Component{
  @computed('submission.solution')
  get sourceCode () {
    return window.atob(this.submission.solution.source)
  }
}
