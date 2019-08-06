import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ContestIndexController extends Controller{
  @action
  onAfterCreate(){
    this.transitionToRoute('contests.college.contest.attempt')
  }
}
