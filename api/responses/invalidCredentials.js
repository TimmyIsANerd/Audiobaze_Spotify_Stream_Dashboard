/**
 * invalidCredentials.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • log out the current user and redirect them to the login page
 *  • or send back 401 (Unauthorized) with no response body.
 *
 * Example usage:
 * ```
 *     return res.invalidCredentials();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       badCombo: {
 *         description: 'That email address and password combination is not recognized.',
 *         responseType: 'invalidCredentials'
 *       }
 *     }
 * ```
 */
module.exports = function invalidCredentials() {
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.invalidCredentials()");

  return res.json({
    status: "Username/Password doesn't exist on database",
  });
};
