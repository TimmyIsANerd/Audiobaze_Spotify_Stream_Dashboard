/**
 * GeneratekeysController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {

    // Key Generation Date
    var today = new Date();
    var today = today.toLocaleDateString();

    // Key Generator for License
    const keyGen = async () => {
      var text = "";

      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 35; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

      return text;
    };

    // Mass Create License Keys
    const sendKeysToDB = async () => {
      for (var i = 0; i < 100; i++) {
        await License.createEach([
          {
            licenseKey: await keyGen(),
            keyStatus: "valid",
            currentKeyUser: "",
          },
        ]);
      }
    };

    // Call Mass Creation
    await sendKeysToDB();

    return this.res.redirect('/list-keys');
  },
};
