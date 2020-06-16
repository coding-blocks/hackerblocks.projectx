import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';

export default class ProjectViewComponent extends Component {
  @service store;
  @service api;
  @service submission;

  source_url = null;
  uploading = false;
  uploadTrigger = false;
  uploadPercentage = 0;
  selectedTab = 'problem';

  @alias('submitProjectTask.lastSuccessful.value.judge_result') lastResult
  
  @action triggerUpload() {
    this.set('uploading', true)
    this.set('uploadTrigger', true);
  }
  @action onProgress(e) {
    this.set('uploadPercentage', e.percent);
  }
  @action didSignUpload(e) {
    this.set('uploading', false)
    this.set('source_url', e.url);
  }
  @action didError() {
    this.set('uploading', false)
    this.set('uploadTrigger', false)
  }

  @dropTask submitProjectTask = function* () {
    const result = yield this.submission.submitProjectTask.perform(this.source_url);
    this.set('source_url', null)
    return result
  };
}
