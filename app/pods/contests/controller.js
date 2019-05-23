import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class ContestsController extends Controller {
    a = 10

    @computed('a')
    get yo() {
        return this.a
    }
}
