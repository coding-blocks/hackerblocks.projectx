import Mixin from '@ember/object/mixin';

function getCookie(name, defaultValue = window.btoa('{}')){
  var pattern = RegExp(name + "=.[^;]*")
  var matched = document.cookie.match(pattern)
  if(matched){
      var cookie = matched[0].split('=')
      return cookie[1]
  }
  return defaultValue
}

export default Mixin.create({
  queryParams: {
    utm_campaign: {
      replace: true
    }, 
    utm_source: {
      replace: true
    }, 
    utm_medium: {
      replace: true
    }, 
    utm_term: {
      replace: true
    } , 
    utm_content: {
      replace: true
    }, 
    utm_coupon: {
      replace: true
    }
  },
  beforeModel(transition) {
    // save any qs starting with utm_ into
    // _cbutm cookie
    const queryParams = transition.to.queryParams
    const oldUtmParams = JSON.parse(window.atob((getCookie('_cbutm'))))
    const allowedParams = Object.keys(this.queryParams)
    const utmParams = 
      Object
        .keys(queryParams)
        .filter(param => allowedParams.indexOf(param) !== -1)
        .reduce((acc, curr) => {
          acc[curr] = queryParams[curr]
          return acc
        }, {})
    const _cbutm = window.btoa(JSON.stringify({
      ...oldUtmParams,
      ...utmParams
    }))
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    document.cookie = `_cbutm=${_cbutm}; expires=${expiry.toUTCString()}; path=/; domain=.codingblocks.com`

    this._super(...arguments)
  },
  actions: {
    didTransition() {
      this._super(...arguments)
      this.controller.setProperties({
        utm_campaign: null,
        utm_source: null,
        utm_medium: null,
        utm_term: null,
        utm_content: null,
        utm_coupon: null
      })
    }
  }
});
