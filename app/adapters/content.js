import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    console.log(snapshot)
    return this._super(...arguments)
    // let baseUrl = 
  }
});
