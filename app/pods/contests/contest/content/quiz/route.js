import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class Quiz extends Route {
  queryParams = {
    q: {
      refreshModel: true
    }
  }

  model() {
    const { contest } = this.modelFor('contests.contest')
    const { content } = this.modelFor('contests.contest.content')
    const quiz = content.get('quiz')

    return hash({
      contest,
      content,
      quiz
    })
  }
  
  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('content', model.content)
    controller.set('quiz', model.quiz)
  }
}
