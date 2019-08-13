import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.modelFor('contests.college.contest')
  },
  afterModel (model) {
    this.set('breadCrumb', {
      title: model.contest.name
    })
  }
});
