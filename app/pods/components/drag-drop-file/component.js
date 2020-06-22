import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service'
import * as minimatch from 'minimatch';
import uploader from '../../../services/uploader';

export default class DragDropFile extends Component {
  @service zipjs;
  @service uploader;

  hovering = false;
  allowedPatterns = ['*/src/*.js']

  @dropTask fileZipTask = function*(event) {
    let fileList = [...event.target.files]
    debugger
    fileList = fileList.filter(file => {
      return this.allowedPatterns.some(pattern => {
        return minimatch(file.webkitRelativePath, pattern)
      })
    })
    // console.log(fileList,'mkc')
    const blob = yield this.zipjs.zip(fileList)
    const result = yield this.uploader.upload(blob)
    console.log(result,'mother phucers')
  }
}
