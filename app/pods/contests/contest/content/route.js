import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    const {contest_id} = this.paramsFor('contests.contest')
    return this.store.queryRecord('content', {      
      custom: {
        ext: 'url',
        url: `${params.content_id}`
      },
      contest_id,
      include: 'problem,quiz'
    })    
  },

  setupController(controller, model) {
    this._super(controller, model)
    controller.set('content', model)
  }
});