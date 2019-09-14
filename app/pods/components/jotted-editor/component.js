import Component from '@ember/component';
import Jotted from 'jotted';

export default class JottedEditorComponent extends Component{
  didReceiveAttrs () {
    if (window.sessionStorage.getItem(this.key)) {
      const { html, css, js} = JSON.parse(window.sessionStorage.getItem(this.key))  
      this.setProperties({html, css, js})
    } else {
      this.setProperties({
        html: '<h1> Hello World</h1>',
        css: '/* css goes here */',
        js: '// console.log("hello World")'
      })
    }

    if (this.jotted) {
      this.jotted.trigger("change", {
        type: "html",
        content: this.html,
      })
      this.jotted.trigger("change", {
        type: "css",
        content: this.css,
      })
      this.jotted.trigger("change", {
        type: "js",
        content: this.js,
      })
    }
    this._super(...arguments)
  }

  async didInsertElement() {
    this.element.querySelector('script').onload = () => {
      const jotted = new Jotted(this.element, {
        files: [{
          type: 'html',
          content: this.html
        }, {
          type: 'css',
          content: this.css
        }, {
          type: 'js',
          content: this.js
        }],
        showBlank: true,
        plugins: [
          'ace',
          'console',
          'play'
        ]
      })

      this.set('jotted', jotted)
      this.jotted.getContent = () => ({
        html: this._html || this.html,
        css: this._css || this.css,
        js: this._js || this.js
      })

      if (typeof this.onReady == 'function') {
        this.onReady(this.jotted)
      }

      // don't allow paste
      const blockPaste = (e) => e.onPaste = () => ""
      Object.values(this.jotted._get('plugins').ace.editor).forEach(blockPaste)

      this.jotted.on('change', (params, done) => {
        this.set('_' + params.type, params.aceEditor.getSession().getValue())

        window.sessionStorage.setItem(this.key, JSON.stringify(this.jotted.getContent()))
        done(null, params)
      })

    }
    this._super(...arguments)
  }
}
