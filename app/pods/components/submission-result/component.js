import Component from '@ember/component';
import { computed } from '@ember/object';
import { jsonToTable } from '../../../util/json-to-table';

export default Component.extend({

  didRender() {
    this._super(...arguments); 
    this.element.scrollIntoView({ behavior: "smooth", block: "end" });
  },

  isRunning: computed('judgeResult', function() {
    return !this.get('judgeResult');
  }),

  isErrored: computed('judgeResult', function() {
    return !!this.get('judgeResult')?.stderr;
  }),

  isSubmission: computed('judgeResult', function() {
    return !!this.get('judgeResult')?.testcases;
  }),

  errorPayload: computed('isErrored', function() {
    if (this.get('isErrored')) {
      return window.atob(this.get('judgeResult')?.stderr || this.get('judgeResult')?.stdout);
    }
  }),

  output: computed('isSubmission', function() {
    if (!this.get('isSubmission')) {
      const output = window.atob(this.get('judgeResult')?.stdout);

      return output;
    }
  }),

  testcasesPayload: computed('isSubmission', function() {
    if (this.get('isSubmission')) {
      return this.get('judgeResult')?.testcases;
    }
  }),

  jsonToTable(data) {
    const table = jsonToTable(data);
    return table;
  }
});
