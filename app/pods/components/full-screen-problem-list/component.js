import Component from '@ember/component';
import { computed } from '@ember/object';

export default class FullScreenProblemListComponent extends Component {
  @computed('contest.currentAttempt.progresses', 'contest.contents')
  get progressHash() {
    const progresses = this.contest.get('currentAttempt.progresses')
    const progressProblemHash = {}
    progresses.map(progress => progressProblemHash[progress.belongsTo('content').id()] = progress)
    // console.log('progressProblemHash', content)
    console.log('progresses', progresses)
    console.log('progressProblemHash', progressProblemHash)
    return this.get('contest.contents').map(content => {
      return {
          content,
          contentId: content.get('id'),
          progress: progressProblemHash[content.get('id')]
        }
      })
  }
}
