import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class CourseContestRoute extends Route{
  async model(params) {
    const { course_contest_id } = params
    const course_contest = await this.store.findRecord('course-contest', course_contest_id, {
      include: 'contest',
      reload: true
    })

    const contest = await course_contest.contest

    const contest_attempt = this.store.queryRecord('contest-attempt', {
      custom: {
        ext: 'url',
        url: 'current-attempt'
      },
      contest_id: contest.id
    })


    return RSVP.hash({
      course_contest,
      contest,
      contest_attempt
    })
  }
}
