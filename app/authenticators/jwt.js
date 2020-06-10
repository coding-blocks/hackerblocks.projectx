import Base from 'ember-simple-auth-token/authenticators/jwt';
import { isEmpty } from '@ember/utils'
import { assign } from '@ember/polyfills'

export default Base.extend({
  handleAuthResponse(response) {
    const token = response[this.tokenPropertyName]

    if (isEmpty(token)) {
      throw new Error('Token is empty. Please check your backend response.');
    }

    const tokenData = this.getTokenData(token);
    const expiresAt = tokenData[this.tokenExpireName]
    const tokenExpireData = {};

    tokenExpireData[this.tokenExpireName] = expiresAt;

    if (this.tokenExpirationInvalidateSession) {
      this.scheduleAccessTokenExpiration(expiresAt);
    }

    if (this.refreshAccessTokens) {
      const refreshToken = response[this.refreshTokenPropertyName]

      if (isEmpty(refreshToken)) {
        throw new Error('Refresh token is empty. Please check your backend response.');
      }

      this.scheduleAccessTokenRefresh(expiresAt, refreshToken);
    }

    return assign(response, tokenExpireData);
  },
});
