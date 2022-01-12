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
  },

  fn: async function () {
    const { username, password, machineId } = this.req.body;

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

    const passwordState = await sails.helpers.passwords.checkPassword(
      password,
      userRecord.password
    );

    if (!passwordState) {
      return this.res.json({
        status: "Username/Password doesn't exist on database",
      });
    } else {
      await User.updateOne({ username }).set({
        machineID: machineId,
      });
      const { licenseData, emailAddress, username,activationStatus } = userRecord;
      const data = JSON.stringify(licenseData);
      if (activationStatus === "unactivated") {
        return this.res.json({
          username: username,
          status: "Account Unactivated",
          message:
            "Unactivated User, Please Purchase a license before trying to use the bot",
        });
      }
      if (activationStatus === "activated") {
        return res.json({
          username: username,
          emailAddress: emailAddress,
          status: "Account Authenticated",
          message:"Activated User",
          expiryDate: data.expiryDate(),
          activationStatus:activationStatus
        });
      }
    }
  },
};
