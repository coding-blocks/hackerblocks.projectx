import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return this.store.findAll('course', {
      include: 'course_contests'
    })
  }
});
