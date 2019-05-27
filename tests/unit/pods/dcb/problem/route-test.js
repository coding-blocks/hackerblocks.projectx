import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dcb/problem', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:dcb/problem');
    assert.ok(route);
  });
});
