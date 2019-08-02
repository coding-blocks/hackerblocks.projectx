import Controller from '@ember/controller';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service';
import Moment from 'moment'

export default class DCBIndexController extends Controller {
  @service session 
  
  @computed('problems')
  get top_problem() {
    return this.problems.find(problem => problem.dcbProblems && Moment(problem.dcbProblems.start) > Moment().subtract(1, 'day'))
  }

  @computed('problems')
  get previous_problems() {
    return this.problems.filter(problem => problem.dcbProblems && !(Moment(problem.dcbProblems.start) > Moment().subtract(1, 'day')))
  }
}
