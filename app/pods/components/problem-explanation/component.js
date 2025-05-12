import Component from '@ember/component';

export default Component.extend({
  init(){
    this._super(...arguments);
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

