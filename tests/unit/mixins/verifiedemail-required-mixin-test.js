import EmberObject from '@ember/object';
import VerifiedemailRequiredMixinMixin from 'hackerblocks/mixins/verifiedemail-required-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | verifiedemail-required-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let VerifiedemailRequiredMixinObject = EmberObject.extend(VerifiedemailRequiredMixinMixin);
    let subject = VerifiedemailRequiredMixinObject.create();
    assert.ok(subject);
  });
});
