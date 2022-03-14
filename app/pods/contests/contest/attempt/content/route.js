import Route from '@ember/routing/route';

export default class ContentRoute extends Route {
  async beforeModel() {
    const { contest } = this.modelFor('contests.contest')
    if (! await contest.get('currentAttempt')) {
      this.transitionTo('contests.contest.attempt')
    }
  }

  model(params) {
    const { contest } = this.modelFor('contests.contest')
    const content = this.store.queryRecord('content', {
      custom: {
        ext: 'url',
        url: `${params.content_id}`
      },
      contest_id: contest.id,
      include: 'problem,quiz,project,web_challenge'
    })

    return content
  }

  afterModel(model) {
    let progress = model.get('progress')
    const { contest } = this.modelFor('contests.contest')
    if(!progress.get('id')){
      progress = this.store.createRecord('progress', {
        status: 'viewed', 
        content: model,
        contestAttempt: contest.get('currentAttempt')
      })
      return progress.save()
    }
  }
}
