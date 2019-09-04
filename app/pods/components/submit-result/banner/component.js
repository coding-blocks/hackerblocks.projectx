import Component from '@ember/component';
import { computed } from '@ember/object';

export default class BannerComponent extends Component{
  @computed('judgeResult.data.testcases')
  get correctAnswer() {
    return this.judgeResult.data.testcases.reduce((prev, curr) =>
      curr.result !== 'correct' ? false : true
      , true)
  }
}
