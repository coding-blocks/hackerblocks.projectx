import Component from '@ember/component';
import { computed } from '@ember/object';

export default class CourseContestCard extends Component {
  @computed('course')
  get contestCount() {
    return this.course.hasMany('courseContests').ids().length
  }
}
