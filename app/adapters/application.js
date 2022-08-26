/* eslint-disable no-case-declarations */

import DS from 'ember-data';
import env from 'hackerblocks/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';


export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: service(),
  host: env.apiHost,
  namespace: 'api/v2',
  ajax(url, method, hash = {}) {
    hash.xhrFields = { 
      withCredentials: true 
    }
    return this._super(url, method, hash);
  },
  authorize(xhr) {
    const jwt = this.get('session.data.token');
    if (isPresent(jwt)) {
      xhr.setRequestHeader('Authorization', `JWT ${jwt}`);
    }
  },
  urlForQueryRecord(query) {
    if(query.custom) {
      switch (query.custom.ext){
        case 'url': {
          let url =  query.custom.url;
          delete query.custom;
          return `${this._super(...arguments)}/${url}`;
        }
      }
    } else  {
      return this._super(...arguments);
    }

  },
  urlForQuery(query) {
    if(query.custom) {
      switch (query.custom.ext) {
        case 'url': {
          let url =  query.custom.url;
          delete query.custom;
          return `${this._super(...arguments)}/${url}`;
        }
      }
    } else  {
      return this._super(...arguments);
    }
  }
});
