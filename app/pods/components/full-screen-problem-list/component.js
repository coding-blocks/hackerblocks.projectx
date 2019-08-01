import Component from '@ember/component';
import { computed } from '@ember/object';

export default class FullScreenProblemListComponent extends Component {
  @computed('contest.problems')
  get problemIds() {
    return this.contest.hasMany('problems').ids()
  }

  @computed('contest.quizzes')
  get quizIds() {
    return this.contest.hasMany('quizzes').ids()
  }

  @computed('route')
  get problemRoute() {
    return this.route + '.problem'
  }

  @computed('route')
  get quizRoute() {
    return this.route + '.quiz'
  }
}
