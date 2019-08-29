import Component from '@ember/component';
import Jotted from 'jotted';

export default class JottedEditorComponent extends Component{
  html = '<h1>Hello World</h1>'
  css = ''
  js = ''

  didInsertElement() {
    this.jotted = new Jotted(this.element, {
      files: [{
        type: 'html',
        content: this.html
      }, {
        type: 'css',
        content: this.css
      }, {
        type: 'js',
        content: this.js
      }]
    })

    if (typeof this.onReady == 'function') {
      this.onReady(this.jotted)
    }

    this.jotted.on('change', (params, done) => {
      this.onChange(params)
      done(null, params)
    })
  }
}
