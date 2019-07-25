import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this.set('contest', this.get('collegeContest').get('contest'))
  }
});
