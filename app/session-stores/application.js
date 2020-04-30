import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default CookieStore.extend({
  cookieName: "hack_auth_session",
  sameSite: "lax",
  _secureCookies() {
    return false
  }
});