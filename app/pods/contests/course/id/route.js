import Route from '@ember/routing/route';

export default class CourseIdRoute extends Route {
  model(params) {
    return this.store.findRecord('course', params.course_id)
  }

  setupController(controller, model) {
    controller.set('course', model)
  }

  afterModel(model) {
    this.set('breadCrumb', {
      title: model.name
    })
  }
}
