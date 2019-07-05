import Component from '@ember/component';
import { computed, action } from '@ember/object';

export default class CodeEditorComponent extends Component {
  code = ''
  isLanguageSelectOpen = false
  customInputOpen = false
  
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
    this.selectLanguage(languages[1])
  }

  @action
  selectLanguage(languageCode) {
    this.set('selectedLanguage', this.languageSpecs.filterBy('code', languageCode)[0])
    const codeStub = this.codeStubs.filterBy('language', this.selectedLanguage.code)[0]
    this.set('code', codeStub.body)
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
