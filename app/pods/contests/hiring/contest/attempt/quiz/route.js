import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class QuizRoute extends Route {
  @service navigation

  queryParams = {
    q: {
      replace: true
    }
  }
  
  async model(params) {
    const contest = await this.modelFor('contests.hiring.contest').contest
    const contest_attempt = contest.get('currentAttempt')
    const quiz = await this.store.queryRecord('quiz', {
      custom: {
        ext: 'url',
        url: `${params.quiz_id}`
      },
      contest_id: contest.id
    })
    const quiz_attempt = this.store.queryRecord('quiz-attempt', {
      custom: {
        ext: 'url',
        url: 'top-attempt'
      },
      filter: {
        contest_id: contest.id,
        quiz_id: quiz.id
      }
    })

    return RSVP.hash({
      contest,
      contest_attempt,
      quiz,
      quiz_attempt
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
    controller.set('quiz', model.quiz)
    controller.set('quiz_attempt', model.quiz_attempt)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.hiring.contest')
    }
    throw err
  }
}
