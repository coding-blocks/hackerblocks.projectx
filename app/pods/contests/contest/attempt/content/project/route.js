import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProjectRoute extends Route {
  @service submission;

  model() {
    const { contest } = this.modelFor('contests.contest')
    const content = this.modelFor('contests.contest.attempt.content')
    const project = content.get('project')

    return hash({
      contest,
      content,
      project
    })
  }
  setupController(controller, model) {
    controller.set('contest', model.contest);
    controller.set('content', model.content);
    controller.set('project', model.project);
    this.submission.initialize(model.contest, model.content)
  }
};
