import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | competitions/id/contest-archive/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:competitions/id/contest-archive/index');
    assert.ok(route);
  });
});
