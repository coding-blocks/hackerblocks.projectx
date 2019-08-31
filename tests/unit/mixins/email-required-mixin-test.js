import EmberObject from '@ember/object';
import EmailRequiredMixinMixin from 'hackerblocks/mixins/email-required-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | email-required-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let EmailRequiredMixinObject = EmberObject.extend(EmailRequiredMixinMixin);
    let subject = EmailRequiredMixinObject.create();
    assert.ok(subject);
  });
});
