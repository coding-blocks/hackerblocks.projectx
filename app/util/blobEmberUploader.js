import S3Uploader from 'ember-uploader/uploaders/s3';

export default S3Uploader.extend({
  createFormData(files, extra = {}) {
    const formData = new FormData();

    for (const prop in extra) {
      if (extra.hasOwnProperty(prop)) {
        formData.append(this.toNamespacedParam(prop), extra[prop]);
      }
    }
    formData.append('file', files)
    return formData;
  }
})



