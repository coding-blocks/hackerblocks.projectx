import Component from '@ember/component';
import layout from '../templates/components/w-read-more';
import { computed, action } from '@ember/object';

export default class WReadMore extends Component {
  layout = layout
  maxCharacters = 512
  isMarkdown = false
  showFullContent = false

  @computed('content', 'showFullContent')
  get displayContent() {
    if (this.showFullContent) {
      return this.content
    }

    return this.content.slice(0, this.maxCharacters)
  }
  @computed('content', 'showFullContent')
  get toggleText() {
    if (this.content.length <= this.maxCharacters) return ''

    if (this.showFullContent) {
      return 'Read Less'
    }

    return 'Read More'
  }

  @action
  toggleContent() {
    this.toggleProperty('showFullContent')
  }
}
