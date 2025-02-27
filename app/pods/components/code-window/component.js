import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CodeWindowComponent extends Component {
  @service('language-selection') languageSelection;

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
      name: "Node 10",
      code: "nodejs10",
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
    },
    {
      name: "MySQL 10",
      code: "mysql",
      mode: "mysql",
      source: ""
    }
  ]
 
  setSubmission = () => {
    this.set('selectedLanguage', this.languageSpecs.find(spec => spec.code === this.submission.language))
    this.set('selectedLanguage.source', window.atob(this.submission.solution.source))
  }

  @computed('allowedLanguages')
  get languages() {
    if (this.allowedLanguages) {
      return this.languageSpecs.filter(lang => this.allowedLanguages.includes(lang.code))
    }
    return this.languageSpecs
  }

  didReceiveAttrs() {
    this._super(...arguments)    
    this.selectLanguage(this.languages[0].code)
    this.set('customInput', this.input)
    if(this.submission){
      this.setSubmission()
    } else {
      this.languageSpecs.map((spec, i) => {
        const codeStub = this.codeStubs.find(stub => stub.language === spec.code)
        this.set(`languageSpecs.${i}.source`, codeStub ? codeStub.body : '')
      })
    }
  }

  @action
  selectLanguage(languageCode) {
    let selectedLanguage = this.languageSpecs.find((spec) => spec.code === languageCode);
    this.set('selectedLanguage', selectedLanguage);
    this.languageSelection.set('selectedLanguage', selectedLanguage);
    this.trigger("restoreCodeFromStorage");
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
    if (!this.allowPaste) {
      /* TODO */
      editor.onKeyDown((event)=>{
        const {keyCode, ctrlKey, metaKey} = event;
        if((keyCode === 33 || 52) && (metaKey || ctrlKey)){
          event.preventDefault();
        }
      });

      //stop user to perform copy/paste and right click in find and replace 
      const editorDoc = editor._domElement;
      const findWidgetParent = editorDoc.querySelector('.monaco-editor .overflow-guard .overlayWidgets');

      findWidgetParent.addEventListener('contextmenu', event => event.preventDefault());
      findWidgetParent.addEventListener('keydown',(event)=>{
        const { keyCode, ctrlKey, metaKey } = event;
        if ((keyCode === 33 || 52) && (metaKey || ctrlKey)) {
          event.preventDefault();
        }
      });
    }
    // this.set('editor', editor)
    this.trigger("restoreCodeFromStorage")
  }

  @action 
  onChange (val) {
    this.set('selectedLanguage.source', val)
    // we should always have this here
    const editorCode = JSON.parse(window.localStorage.getItem(this.storageKey))
    
    editorCode[this.selectedLanguage.code] = val
    window.localStorage.setItem(this.storageKey, JSON.stringify(editorCode))
  }

  @action
  restoreCodeFromStorage () {
    if (!this.storageKey) {
      return ;
    }

    let editorCode = window.localStorage.getItem(this.storageKey)

    try {
      JSON.parse(editorCode)
    } catch (err) {
      // handle corruption
      window.localStorage.setItem(this.storageKey, "{}")
      editorCode = `{}`
    }

    if (!editorCode) {
      window.localStorage.setItem(this.storageKey, JSON.stringify({}))
    } else if (
      JSON.parse(editorCode)[this.get('selectedLanguage.code')]) {
      // set this as default when editor loads if we have some for this language
      // editor.setValue(JSON.parse(editorCode)[this.selectedLanguage.code])
      this.set('selectedLanguage.source', JSON.parse(editorCode)[this.selectedLanguage.code])
    }
  }
}
