import DS from 'ember-data'; 

export default DS.Model.extend({
   source: DS.attr(),
   score: DS.attr(),
   isTopSubmission: DS.attr(),
   content: DS.belongsTo('content'),
   contestAttempt: DS.belongsTo('contest-attempt')
});