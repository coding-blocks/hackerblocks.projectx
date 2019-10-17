import Component from '@ember/component';
import { action } from '@ember/object';

export default class FormView extends Component {
  didReceiveAttrs() {
    const formEntry = {}
    this.get('form.fields').map(field => {
      formEntry[field.name] = field.type === 'checkbox' ? [] : ''
    })
    this.set('formEntry', formEntry)
  }

  @action
  onUpdate(key, value) {
    this.set(`formEntry.${key}`, value)
  }
}
