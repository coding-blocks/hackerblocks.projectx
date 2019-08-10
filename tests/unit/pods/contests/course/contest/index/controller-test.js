import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | contests/course/contest/index', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:contests/course/contest/index');
    assert.ok(controller);
  });
});
