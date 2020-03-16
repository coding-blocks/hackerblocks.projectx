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
      include: 'problem,quiz'
    })

    return content
  }

  async afterModel(model) {
    let progress = model.problem.get('progress')
    if(!progress.get('id')){
      progress = await this.store.createRecord('progress', {
        status: 'viewed', 
        problem: model.problem,
        contestAttempt: model.contest.get('currentAttempt')
      })
      progress.save()
    }
  }

  afterModel(model) {
    switch(model.type) {
      case 'problem': this.transitionTo('contests.contest.attempt.content.problem'); break
      case 'quiz': this.transitionTo('contests.contest.attempt.content.quiz'); break
    }
  }
}
