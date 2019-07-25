import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | competitions/id/contest/attempt/problem', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:competitions/id/contest/attempt/problem');
    assert.ok(route);
  });
});
