import Ember from 'ember';
import S3Uploader from 'ember-uploader/uploaders/s3';
import FileField from 'ember-uploader/components/file-field';
import config from '../../../config/environment';

export default FileField.extend({  
  signingUrl: config.apiHost + '/api/v2/aws/pre_signed_post',
  currentUser: Ember.inject.service('current-user'),
  isFileInput: Ember.computed('files', function () {
    const files = this.get('files')
    return files.constructor === FileList
  }),

  didUpdateAttrs() {
    if (this.get('startUpload') && !Ember.isEmpty(this.get('files'))) {
      if (this.get('isFileInput')) {
        this.get('uploader').upload(this.get('files')[0])
      }
      else {
        this.get('uploader').upload(this.get('files'))
      }
    }
  },

  filesDidChange(files) {
    Ember.run.later(() => {
      this.set('startUpload', false)
    }, 0)

    // const jwt = this.get('currentUser').getAuthHeaders().Authorization

    const uploader = S3Uploader.create({
      signingUrl: this.get('signingUrl'),
      signingAjaxSettings: {
        // headers: {
        //   'X-Application-Name': 'Uploader Test'
        // }
      },
      didSign(response) {
        this.trigger('didSign', response)
        return response.preSignedUrl
      }
    });

    uploader.on('progress', e => {
      this.progress(e)
    });

    uploader.on('didUpload', e => {
      this.set('startUpload', false)
      if (this.didUpload) {
        this.didUpload(e)
      }
    });

    uploader.on('didSign', e => {
      if(this.didSign) {
        this.didSign(e)
      }
    });

    uploader.on('didError', e => {
      if(this.didError) {
        this.didError(e)
      }
    })

    this.set('uploader', uploader)
    this.set('files', files)
  }
});
