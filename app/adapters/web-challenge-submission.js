import ApplicationAdapter from './application'

export default ApplicationAdapter.extend({
  urlForCreateRecord(modelName, snapshot) {
    const contest_id = snapshot.adapterOptions.contest_id
    if (contest_id) {
      return this._super(...arguments) + `?contest_id=${contest_id}`
    }
    return this._super(...arguments)
  }
})