import Route from '@ember/routing/route';

export default class CourseIndexRoute extends Route{
  model(){
    return this.modelFor('contests.course')
  }

  setupController(controller, model){
    controller.set('courses', model)
  }
}
