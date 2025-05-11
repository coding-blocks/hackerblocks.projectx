import Component from '@ember/component';
import { inject as service } from '@ember/service';
import jsonToTable from '../../../helpers/json-to-table';

export default Component.extend({
  
  languageSelection: service('language-selection'),
  init(){
    this._super(...arguments);
      let contest = this.get('contest').data;
    console.log(contest);
      document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      });
      document.addEventListener('keydown', function (event) {
        if (
          event.key === 'F12' || 
          (event.ctrlKey && event.shiftKey && event.key === 'I') || 
          (event.ctrlKey && event.shiftKey && event.key === 'C') || 
          (event.ctrlKey && event.shiftKey && event.key === 'J') || 
          (event.ctrlKey && event.key === 'U') 
        ) {
          event.preventDefault();
        }
      });
      
  },
  jsonToTable(data) {

    const table = jsonToTable(data);
    return table;
  }

});