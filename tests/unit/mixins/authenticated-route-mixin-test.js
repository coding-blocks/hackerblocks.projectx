import EmberObject from '@ember/object';
import AuthenticatedRouteMixinMixin from 'hackerblocks/mixins/authenticated-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | authenticated-route-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let AuthenticatedRouteMixinObject = EmberObject.extend(AuthenticatedRouteMixinMixin);
    let subject = AuthenticatedRouteMixinObject.create();
    assert.ok(subject);
  });
});
