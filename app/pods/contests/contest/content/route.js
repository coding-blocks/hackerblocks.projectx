import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class Content extends Route {
  model(params) {    
    const { contest } = this.modelFor('contests.contest')
    const content = this.store.queryRecord('content', {      
      custom: {
        ext: 'url',
        url: `${params.content_id}`
      },
      contest_id: contest.id,
      include: 'problem,quiz'
    })    
    return hash({
      content,
      contest
    })
  }

  setupController(controller, model) {
    controller.set('content', model.content)
  }
}