import Route from '@ember/routing/route';
import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class QuizRoute extends Route {
  queryParams = {
    q: {
      replace: true
    }
  }
  async model(params) {
    const { contest } = this.modelFor('contests.contest')
    const content = this.modelFor('contests.contest.attempt.content')
    const quiz = this.store.queryRecord('quiz', {
      custom: {
        ext: 'url',
        url: `${content.get('quiz.id')}`
      },
      contest_id: contest.id
    })
    const contentAttempt = this.store.queryRecord('content-attempt', {
      custom: {
        ext: 'url',
        url: `${content.get('id')}/topAttempt`
      },
      contest_id: contest.get('id')
    })

    return RSVP.hash({
      contest,
      contentAttempt,
      content,
      quiz
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contentAttempt', model.contentAttempt)
    controller.set('content', model.content)
    controller.set('quiz', model.quiz)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.contest')
    }
    throw err
  }
}
