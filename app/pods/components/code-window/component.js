import Component from '@ember/component';
import { action, computed } from '@ember/object';

export default class CodeWindowComponent extends Component {
  isLanguageSelectOpen = false
  customInputOpen = true
  customInput = ''
  
  languageSpecs = [
    {
      name: "C++",
      code: "cpp",
      mode: "cpp",
      source: ""
    },
    {
      name: "C",
      code: "c",
      mode: "c",
      source: ""
    },
    {
      name: "Python 2.7",
      code: "py2",
      mode: "python",
      source: ""
    },
    {
      name: "Python 3",
      code: "py3",
      mode: "python",
      source: ""
    },
    {
      name: "Node",
      code: "js",
      mode: "javascript",
      source: ""
    },
    {
      name: "Java 8",
      code: "java",
      mode: "java",
      source: ""
    },
    {
      name: "C#",
      code: "csharp",
      mode: "csharp",
      source: ""
    }
  ]

  didReceiveAttrs() {
    this._super(...arguments)
    this.selectLanguage(this.languages[0].code)
    this.set('customInput', this.input)
    this.languageSpecs.map(spec => {
      const codeStub = this.codeStubs.find(stub => stub.language === spec.code)
      spec.source = codeStub ? codeStub.body : ''
    })
  }

  @computed('allowedLanguages')
  get languages() {
    if (this.allowedLanguages) {
      return this.languageSpecs.filter(lang => this.allowedLanguages.includes(lang.code))
    }
    return this.languageSpecs
  }

  @action
  selectLanguage(languageCode) {
    this.set('selectedLanguage', this.languageSpecs.find(spec => spec.code === languageCode))
  }

  @action
  toggleLanguageSelectOpen() {
    this.toggleProperty('isLanguageSelectOpen')
  }

  @action
  toggleCustomInputOpen() {
    this.toggleProperty('customInputOpen')
  }

  @action
  editorOnReady(editor) {
    editor.onKeyDown((event)=>{
      const {keyCode, ctrlKey, metaKey} = event;
      if((keyCode === 33 || 52) && (metaKey || ctrlKey)){
        event.preventDefault();
      }
    });
  }
}
