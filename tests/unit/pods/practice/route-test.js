import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | practice', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:practice');
    assert.ok(route);
  });
});
