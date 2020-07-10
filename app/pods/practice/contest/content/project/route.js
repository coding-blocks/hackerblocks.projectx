import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class ProjectRoute extends Route {

  @service submission
  model() {
    const { contest } = this.modelFor('practice.contest')
    const { content } = this.modelFor('practice.contest.content')
    const project = content.get('project')

    return hash({
      contest,
      content,
      project
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('content', model.content)
    controller.set('project', model.project)
    this.submission.initialize(model.contest, model.content)
  }
}
