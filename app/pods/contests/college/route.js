import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'hackerblocks/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  breadCrumb: {
    title: 'College Contests'
  }
});
