import Service from '@ember/service';
import env from 'hackerblocks/config/environment';

export default Service.extend({
  async zip(files, { getFileName = null }) {
    if (!this.get('isInitiated')) {
      await this.initiate()
    }
    zip.workerScriptsPath = env.rootURL + "/zipjs/";
    const writer = await new Promise((resolve, reject) => {
      zip.createWriter(new zip.BlobWriter(), resolve, reject)
    })
    for(let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileName = getFileName ? getFileName(file) : file.webkitRelativePath
      writer.add(fileName, new zip.BlobReader(file))
    }
    return new Promise((resolve, reject) => {
      writer.close(resolve)
    })
  }
});
