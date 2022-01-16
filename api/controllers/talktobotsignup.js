/**
 * Talk to Bot Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: "Bot First Access",

  description: "Bot First Access",

  exits: {
    success: {
      description: "First Bot Login Successful",
    },
    cantFindUser: {
      description: "Can't Find User",
    },
    badCombo: {
      description: `The provided username and password combination does not
      match any user in the database.`,
      responseType: "invalidCredentials",
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    },
  },

  fn: async function () {
    const { username, password, machineId } = this.req.params;

    sails.log.info(username, password, machineId);
    const req = this.req;
    const res = this.res;

    const userRecord = await User.findOne({
      username,
    });

    if (!userRecord) {
      return this.res.json({
        status: "Username/Password doesn't exist on database",
      });
    }

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(password, userRecord.password)
      .intercept("incorrect", "badCombo");

    await User.updateOne({ username }).set({
      machineID: machineId,
    });
    const { licenseData, emailAddress, activationStatus } = userRecord;
    const data = JSON.stringify(licenseData);

    // First Check Expiry Date
    const today = new Date();
    const todayString = today.toLocaleDateString();

    // If Today is the Expiry Date, Set User to Unactivated and set License Key to Expired
    if (data.expiryDate === todayString) {
      await License.updateOne({ username }).set({
        keyStatus: "expired",
      });
      await User.updateOne({
        username,
      }).set({
        activationStatus: "expired",
      });

      return res.json({
        username: username,
        status: "License Expired",
        message: "User license expired and access is denied",
        expiryDate: data.expiryDate,
      });
    } else {
      if (activationStatus === "unactivated") {
        return this.res.json({
          username: username,
          status: "Account Unactivated",
          message:
            "Unactivated User, Please Purchase a license before trying to use the bot",
        });
      }

      if (activationStatus === "revoked") {
        return this.res.json({
          username: username,
          status: "Account Access Revoked",
          message:
            "Account Access revoked, user attempted to login to platform using a new device",
        });
      }

      if (activationStatus === "activated") {
        return res.json({
          username: username,
          emailAddress: emailAddress,
          status: "Account Authenticated",
          message: "Activated User",
          expiryDate: data.expiryDate(),
          activationStatus: activationStatus,
        });
      }
    }
  },
};
