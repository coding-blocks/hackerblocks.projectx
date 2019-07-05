import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | practice/contest/problem', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:practice/contest/problem');
    assert.ok(route);
  });
});
