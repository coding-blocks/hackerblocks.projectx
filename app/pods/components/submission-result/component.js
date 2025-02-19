import Component from '@ember/component';
import { computed } from '@ember/object';
import { jsonToTable } from '../../../util/json-to-table';
// const data = {
//   "meta": {},
//   "data": {
//     "type": "submissions",
//     "id": "7298192",
//     "attributes": {
//       "id": 7298192,
//       "solution": {
//         "source": "U0VMRUNUIGUubmFtZSBBUyAiRW1wbG95ZWUiIEZST00gRW1wbG95ZWUgYXMgZQpJTk5FUiBKT0lOIEVtcGxveWVlIGFzIG0KT04gZS5tYW5hZ2VySWQgPSBtLmlkCldIRVJFIGUuc2FsYXJ5ID4gbS5zYWxhcnk7"
//       },
//       "submit-at": "2025-02-19T09:00:58.477Z",
//       "language": "mysql",
//       "score": 0,
//       "result": -1,
//       "judge-result": {
//         "id": 116,
//         "code": 0,
//         "time": 1.22,
//         "stderr": "",
//         "stdout": "W3siRW1wbG95ZWUiOiJKb2UifV0K",
//         "scenario": "run"
//       },
//       "explanation": null,
//       "is-top-submission": false,
//       "plagiarism-detected": false,
//       "created-at": "2025-02-19T09:00:58.478Z"
//     },
//     "relationships": {
//       "user": { "data": { "type": "users", "id": "241321" } },
//       "content": { "data": { "type": "contents", "id": "1747" } },
//       "contest": { "data": null },
//       "badge": { "data": null }
//     }
//   }
// };
export default Component.extend({
  // judgeResult: null,
  // allowedLanguages: null,

  didRender() {
    this._super(...arguments); 
    this.element.scrollIntoView({ behavior: "smooth", block: "end" });

    // this.set('judgeResult', data.data.attributes['judge-result']);
    // this.set('allowedLanguages',  this.get('allowedLanguages'));
    // console.log('judgeResult:', this.get('judgeResult'));
    // console.log('Allowed Languages:', this.allowedLanguages);
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
    // console.log('jsonToTable output:', table);
    return table;
  }
});
