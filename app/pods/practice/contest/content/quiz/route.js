import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class QuizRoute extends Route {
  queryParams = {
    q: {
      refreshModel: false
    }
  }

  model() {
    const { contest } = this.modelFor('practice.contest')
    const { content } = this.modelFor('practice.contest.content')
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

    return hash({
      contest,
      content,
      quiz,
      contentAttempt
    })
  }
  
  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('content', model.content)
    controller.set('quiz', model.quiz)
    controller.set('contentAttempt', model.contentAttempt)
  }
}
