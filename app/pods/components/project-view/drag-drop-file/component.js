import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class DragDropFile extends Component {
  @service zipjs;
  @service uploader;

  hovering = false;
  allowedPatterns = ['src/']

  @computed('hovering', 'fileZipTask.isRunning')
  get labelText() {
    if (this.fileZipTask.isRunning) {
      return "Setting up you project submission..."
    }

    return "Drop your project folder here "
  }
  
  @dropTask fileZipTask = function*(event) {
    this.set('hovering', false)

    let fileList = [...event.target.files]
    fileList = fileList.reduce((acc, curr) => {
      const name = curr.webkitRelativePath.split('/').slice(1).join('/')
      if (this.allowedPatterns.some(folder => name.startsWith(folder))) {
        acc.push(curr)
      }
      return acc
    }, [])

    const zip = new JSZip()
    fileList.map(file => {
      zip.file(file.webkitRelativePath.split('/').slice(1).join('/'), file)
    })
    const blob = yield zip.generateAsync({ type: 'blob' })
    blob.name = 'solution.zip'

    const result = yield this.uploader.upload(blob)
    const url = result.url

    this.onAfterUpload(url)
  }
}
