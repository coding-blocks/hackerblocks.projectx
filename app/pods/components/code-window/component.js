import Component from '@ember/component';
import { action } from '@ember/object';

export default class CodeWindowComponent extends Component {
  code = ''
  isLanguageSelectOpen = false
  customInputOpen = true
  
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
    const languages = this.get('allowedLanguages') || ['c', 'cpp', 'python2', 'python3', 'java', 'node', 'csharp']
    this.set('languages', languages)
    if (this.codeStubs.toArray().length) {
      this.selectLanguage(this.codeStubs.toArray()[0].language)
    } else {
      this.selectLanguage('cpp')
    }
  }

  @action
  selectLanguage(languageCode) {
    this.set('selectedLanguage', this.languageSpecs.find(spec => spec.code === languageCode))
    const codeStub = this.codeStubs.find(stub => stub.language === this.selectedLanguage.code)
    this.set('code', codeStub ? codeStub.body : '')
  }

  @action
  toggleLanguageSelectOpen() {
    this.toggleProperty('isLanguageSelectOpen')
  }

  @action
  toggleCustomInputOpen() {
    this.toggleProperty('customInputOpen')
  }
}
