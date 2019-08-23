import Route from '@ember/routing/route';

export default class ErrorRoute extends Route {
  queryParams = {
    errorCode: {
        refreshModel: true
    }
  }
}
