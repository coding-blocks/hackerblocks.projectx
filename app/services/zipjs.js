import Service from '@ember/service';
import env from 'hackerblocks/config/environment';

export default Service.extend({
  isInitiated: false,
  initiate() {
    const tag = document.createElement('script')
    tag.setAttribute('src', env.rootURL + '/zipjs/zip.js')
    document.body.appendChild(tag)
    this.set('isInitiated', true)
    return new Promise((resolve, reject) => {
      tag.addEventListener('load',resolve)      
      tag.addEventListener('error',reject)      
    })    
  },

  async zip(files) {
    if (!this.get('isInitiated')) {
      await this.initiate()
    }
    zip.workerScriptsPath = env.rootURL + "/zipjs/";
    const writer = await new Promise((resolve, reject) => {
      zip.createWriter(new zip.BlobWriter(), resolve, reject)
    })
    for(let i = 0; i < files.length; i++) {
      const file = files[i]
      writer.add(file.webkitRelativePath, new zip.BlobReader(file))
    }
    return new Promise((resolve, reject) => {
      writer.close(resolve)
    })
  }
});
