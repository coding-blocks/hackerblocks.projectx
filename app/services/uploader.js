import Service from '@ember/service';
import Uploader from 'hackerblocks/util/blobEmberUploader';
import config from 'hackerblocks/config/environment';
import { inject as service } from '@ember/service'

export default Service.extend({
  uploader: null,
  signingUrl: config.apiHost + '/api/v2/aws/pre_signed_post',
  currentUser: service('current-user'),
  session: service('session'),

  initiate() {
      const jwt = this.get('session.data.authenticated.jwt')
      const uploader = Uploader.create({
          signingUrl: this.get('signingUrl'),
          signingAjaxSettings: {
            headers: {
              'Authorization': jwt
            }
          },
          didSign(response) {
              this.trigger('didSign', response)
              return response.preSignedUrl
          }
      })
      this.set('uploader', uploader)
  },

  upload(file) {
      if (!this.get('uploader')) {
          this.initiate()
      }
      return new Promise((resolve, reject) => {
          const uploader = this.get('uploader')
          // apply on didSign hook
          uploader.on('didSign', resolve);
          uploader.on('didError', reject);
          uploader.upload(file)
      })
  }
});
