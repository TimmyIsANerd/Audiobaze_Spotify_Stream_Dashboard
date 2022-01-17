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
        status:0,
        message: "Please confirm username and try again",
      });
    } else {
      const userRecord = await User.findOne({ machineID: machineId });

      if (!userRecord) {
        await User.updateOne({ username }).set({ activationStatus: "revoked" });
        return this.res
          .json({
            status:0,
            message:
              "Machine ID doesn't match database, your account will now be revoked",
          })
          .status(400);
      } else {
        const { licenseData, activationStatus, username, emailAddress } =
          userRecord;
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
            status:0,
            message: "User license expired and access is denied",
            expiryDate: data.expiryDate,
          });
        } else {
          if (activationStatus === "unactivated") {
            return this.res.json({
              username: username,
              status:0,
              message:
                "Unactivated User, Please Purchase a license before trying to use the bot",
            });
          }

          if (activationStatus === "revoked") {
            return this.res.json({
              username: username,
              status:0,
              message:
                "Account Access revoked, user attempted to login to platform using a new device",
            });
          }

          if (activationStatus === "activated") {
            return this.res.json({
              emailAddress: emailAddress,
              username: username,
              status:1,
              message: "Activated Account, Authentication Successful",
              expiryDate: data.expiryDate(),
            });
          }
        }
      }
    }
  },
};
