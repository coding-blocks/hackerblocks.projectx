import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(){
    return this.store.findAll('course', {
      include: 'course_contest'
    })
  }
});
