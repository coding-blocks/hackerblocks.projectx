import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias }  from '@ember/object/computed';

export default Service.extend({
    api: service(),
    store: service(),
    session: service(),
    metrics: service(),
    user: {},
    async load (force = false) {
        if (force) {
            const { refresh_token } = this.session.data.authenticated
            await this.authenticator.refreshAccessToken(refresh_token)
        }
        if (!force) {
            const currentUser = this.user
            if (currentUser && currentUser.id) {
                return Promise.resolve(currentUser)
            }
        }
        const user = await this.store.queryRecord('user', { custom: {ext: 'url', url: 'me' }})
        this.set('user', user)
        this.metrics.identify({
            distinctId: this.user.get('oauth_id')
        })
        return user
    }
});
