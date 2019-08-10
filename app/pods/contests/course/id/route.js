import Route from '@ember/routing/route';

export default class CourseIdRoute extends Route {
  model() {
    return this.modelFor('contests.course')
  }

  setupController(controller, model) {
    controller.set('course', model.findBy('id', this.paramsFor('contests.course.id').course_id))
  }
}
