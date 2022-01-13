/**
 * TalktobotController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: "Bot Login",

  exits: {
    success: {
      description: "Audiobaze Profile Recognized!",
      status: 200,
    },
    cantFindUser: {
      description: "Username not registered on database",
    },
    invalidMachineId: {
      description:
        "Machine ID doesn't match database entry, your account will now be revoked",
    },
  },

  fn: async function () {
    const { username, machineId } = this.req.params;
    sails.log.info(username, machineId);

    const usernameTest = await User.findOne({
      username: username,
    });

    if (!usernameTest) {
      return this.res.json({
        message: "Please confirm username and try again",
      });
    } else {
      const userRecord = await User.findOne({ machineID: machineId });

      if (!userRecord) {
        await User.updateOne({ username }).set({ activationStatus: "revoked" });
        return this.res
          .json({
            message:
              "Machine ID doesn't match database, your account will now be revoked",
          })
          .status(400);
      } else {
        const { licenseData, activationStatus, username } = userRecord;
        const data = JSON.stringify(licenseData);

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
          return this.res.json({
            username: username,
            status: "Account Activated",
            message: "Activated Account, Authentication Successful",
            expiryDate: data.expiryDate(),
          });
        }
      }
    }
  },
};
