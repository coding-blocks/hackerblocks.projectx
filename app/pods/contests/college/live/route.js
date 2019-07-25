import Route from '@ember/routing/route';

export default class LiveContest extends Route{  
  model(){
    return this.store.query('college_contest', {
      custom: {
        ext: 'url', url:'live'
      }
    })
  }

  setupController(controller, model){
    controller.set('contests', model)
  }
}
