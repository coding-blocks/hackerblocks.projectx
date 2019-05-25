import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dcb/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dcb/index');
    assert.ok(route);
  });
});
