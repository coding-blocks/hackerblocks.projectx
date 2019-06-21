import Component from '@ember/component';
import { computed, action } from '@ember/object';

export default class CodeEditorComponent extends Component {
  code = ''
  isLanguageSelectOpen = false
  
  languageSpecs = {
    cpp: {
      name: "C++",
      code: "cpp",
      mode: "cpp",
      source: ""
    },
    c: {
      name: "C",
      code: "c",
      mode: "c",
      source: ""
    },
    py2: {
      name: "Python 2.7",
      code: "py2",
      mode: "python",
      source: ""
    },
    py3: {
      name: "Python 3",
      code: "py3",
      mode: "python",
      source: ""
    },
    js: {
      name: "Node",
      code: "js",
      mode: "javascript",
      source: ""
    },
    java: {
      name: "Java 8",
      code: "java",
      mode: "java",
      source: ""
    },
    csharp: {
      name: "C#",
      code: "csharp",
      mode: "csharp",
      source: ""
    }
  }

  didReceiveAttrs() {
    this._super(...arguments)
    const languages = this.get('allowedLanguages') || ['c', 'cpp', 'python2', 'python3', 'java', 'node', 'csharp']
    this.set('languages', languages)
    this.selectLanguage(languages[1])
  }

  @action
  selectLanguage(languageCode) {
    this.set('selectedLanguage', this.languageSpecs[languageCode])
  }

  @action
  toggleLanguageSelectOpen() {
    this.toggleProperty('isLanguageSelectOpen')
  }

}
