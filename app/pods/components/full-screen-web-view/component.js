import Component from '@ember/component';
import { action } from '@ember/object';

export default class FullScreenWebViewComponent extends Component {
  currentTab = 'problem'

  html = '<h1>Hello World</h1>'
  css = '/* css goes here */'
  js = '//'
  

  @action
  handleTextChange(event) {
    this.set(event.type, event.content)
  }

}