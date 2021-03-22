import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contests/contest/attempt/content/project', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:contests/contest/attempt/content/project');
    assert.ok(route);
  });
});
