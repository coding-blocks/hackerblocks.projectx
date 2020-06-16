import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { dropTask } from "ember-concurrency-decorators";
import { alias } from "@ember/object/computed";
import { action } from "@ember/object";

export default class ProjectViewComponent extends Component {
  @service store;
  @service api;

  @service submission;

  source_url = null;
  uploading = false;
  uploadError = false;
  doneUploading = false;
  Trigger = false;
  ProgressPercentage = 0;
  new_expected_output = "Loading...";
  selectedTab = "problem";

  @alias('submitProjectTask.lastSuccessful.value.judge_result') lastResult
  
  @action triggerUpload() {
    this.set("uploadError", false);
    this.set("doneUploading", false);
    this.set("Trigger", true);
  }

  @action Progress(e) {
    this.set("ProgressPercentage", e.percent);
  }

  @action didSignUpload(e) {
    this.set("source_url", e.url);
  }

  @action didUploadFile() {
    this.set("new_expected_output", null);
    this.set("doneUploading", true);
  }

  @action didError() {
    this.set("uploading", false);
    this.set("Trigger", false);
  }

  @dropTask submitProjectTask = function* () {
    return this.submission.submitProjectTask.perform(this.source_url);
  };
}
