import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | practice/contest/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:practice/contest/index');
    assert.ok(route);
  });
});
