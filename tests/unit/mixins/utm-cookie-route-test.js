import EmberObject from '@ember/object';
import UtmCookieRouteMixin from 'hackerblocks/mixins/utm-cookie-route';
import { module, test } from 'qunit';

module('Unit | Mixin | utm-cookie-route', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let UtmCookieRouteObject = EmberObject.extend(UtmCookieRouteMixin);
    let subject = UtmCookieRouteObject.create();
    assert.ok(subject);
  });
});
