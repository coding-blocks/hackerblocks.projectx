import Component from '@ember/component';
import { inject as service } from '@ember/service';
import {jsonToTable} from '../../../util/json-to-table'

export default Component.extend({
  languageSelection: service('language-selection'),

  init() {
    this._super(...arguments);
    let contest = this.get('contest');
    // if (contest) {
    
    //   if (contest.allowedLanguages) {
    //     console.log('Allowed languages:', contest.allowedLanguages);
    //   } else {
    //     console.log('No allowed languages found for the contest');
    //   }
    // } else {
    //   console.log('Contest object is undefined');
    // }
  },

  jsonToTable(data) {
    const table = jsonToTable(data);
    // console.log('jsonToTable output:', table);
    return table;
  }
});
