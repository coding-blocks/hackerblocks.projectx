import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Service.extend({
    api: service(),
    store: service(),
    user: {},
    async load () {
        const currentUser = this.user
        if (currentUser && currentUser.id) {
            return Promise.resolve(currentUser)
        }
        const user = await this.store.queryRecord('user', { custom: {ext: 'url', url: 'me' }})
        this.set('user', user)
        return user
    }
});
