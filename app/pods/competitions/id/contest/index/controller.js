import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class IndexController extends Controller {
  @computed('contest.problems')
  get nextProblemId(){
    if (this.contest)
      return this.contest.hasMany('problems').ids()[0]
  }
}
