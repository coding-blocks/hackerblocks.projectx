import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed'

export default class ProblemDiscussViewComponent extends Component {

  @service api
 
  currentIndex = 0
  size = 5
  posts = []
  loaded = false

  @alias('fetchTopic.last.value')
  topic


  // get Topic for this problem in this contest
  @restartableTask() fetchTopic = function *() {
    const { topic } = yield this.api.request(`/contents/${this.content.id}/topic`, {
      data: { contest_id: this.contest.id }
    })
    this.set('currentIndex', 0)
    if(topic)
      yield this.fetchPosts.perform(topic)

    this.set('loaded', true)
    return topic
  }

  @restartableTask() fetchPosts = function *(topic) {
    const stream = topic.post_stream.stream
    const ids = stream.slice(stream.length-this.currentIndex-this.size, stream.length-this.currentIndex)
    const { posts: newPosts} = yield this.api.request(`/discuss/topic/${topic.id}/posts`, {
      data: { ids }
    })

    this.posts.pushObjects(newPosts.filter(p => p.cooked))
    this.incrementProperty('currentIndex', this.size)
  }

  @restartableTask() createTopic = function *() {
    const { topicId } = yield this.api.request('/discuss/topic', {
      method: 'POST',
      data: {
        contest_id: this.contest.id,
        problem_id: this.problem.id
      }
    })

    window.open(`https://discuss.codingblocks.com/t/${topicId}`, '_blank')

    return this.fetchTopic.perform()
  }

  didReceiveAttrs () {
    this.fetchTopic.perform()
  }
}
