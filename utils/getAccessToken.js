import sdk from 'matrix-js-sdk';

const client = sdk.createClient('https://matrix.org');

function GetAccessToken(userId, password) {
  client
    .login('m.login.password', { user: userId, password: password })
    .then((response) => {
      console.log(response.access_token);
      return response.access_token;
    });
}
module.exports = GetAccessToken;
