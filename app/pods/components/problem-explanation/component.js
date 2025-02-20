import Component from '@ember/component';
import { inject as service } from '@ember/service';
import {jsonToTable} from '../../../util/json-to-table'

export default Component.extend({
  languageSelection: service('language-selection'),

  init() {
    this._super(...arguments);
    let contest = this.get('contest');
  },
  jsonToTable(data) {
    const table = jsonToTable(data);
    return table;
  }
});
