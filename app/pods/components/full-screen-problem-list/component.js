import Component from '@ember/component';
import { computed } from '@ember/object';

export default class FullScreenProblemListComponent extends Component {
  @computed('contest.problems')
  get problemIds() {
    return this.contest.hasMany('problems').ids()
  }

  @computed('contest.currentAttempt.progresses', 'problemIds')
  get progressHash() {
    const problemIds = this.problemIds//kyoki kuch problems ki progressey nahi hai
    const progresses = this.contest.get('currentAttempt.progresses')
    const progressProblemHash = {}
    progresses.map(progress => progressProblemHash[progress.belongsTo('problem').id()] = progress)
    return problemIds.map(id => {
      return {
         problemId: id,
         progress: progressProblemHash[id]
        }
      })
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
