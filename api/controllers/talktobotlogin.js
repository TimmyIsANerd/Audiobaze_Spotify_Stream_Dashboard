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
        status: 0,
        message: "Please confirm username and try again",
      });
    } else {
      // If Machine ID record wasn't saved
      if (usernameTest.machineID === "") {
        return this.res.json({
          status: 0,
          message: "Machine ID not found on Database, ",
        });
      }
      const userRecord = await User.findOne({ machineID: machineId });

      if (!userRecord) {
        await User.updateOne({ username }).set({ activationStatus: "revoked" });
        return this.res
          .json({
            status: 0,
            message:
              "Machine ID doesn't match database, your account will now be revoked",
          })
          .status(400);
      } else {
        const { licenseData, activationStatus, username, emailAddress } =
          userRecord;
        const data = JSON.parse(licenseData);
        sails.log.info(data);
        if (data.expiryDate === undefined) {
          return this.res.json({
            status: 0,
            message:
              "This account is unactivated, Please create an account on https://audiobaze.net",
          });
        }

        // First Check Expiry Date
        const today = new Date();
        const todayString = today.toLocaleDateString();
        // Convert dates to mm dd yyyy format
        var todaydatearr = todayString.split("/");
        var newTodayFormat =
          todaydatearr[1] + "/" + todaydatearr[0] + "/" + todaydatearr[2];

        // Calculating Days Left
        // Convert Expiry Date to mm dd yyyy format
        var expdate = data.expiryDate;
        var expdatearr = expdate.split("/");
        var newexpdate =
          expdatearr[1] + "/" + expdatearr[0] + "/" + expdatearr[2];

        const activationDate = new Date(newTodayFormat);
        const expiryDate = new Date(newexpdate);
        const diffTime = Math.abs(expiryDate - activationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
            status: 0,
            message: "User license expired and access is denied",
            expiryDate: data.expiryDate,
            daysLeft: 0,
          });
        } else {
          if (activationStatus === "unactivated") {
            return this.res.json({
              username: username,
              status: 0,
              message:
                "Unactivated User, Please Purchase a license before trying to use the bot",
              daysLeft: 0,
            });
          }

          if (activationStatus === "revoked") {
            return this.res.json({
              username: username,
              status: 0,
              message:
                "Account Access revoked, user attempted to login to platform using a new device",
              daysLeft: 0,
            });
          }

          if (activationStatus === "activated") {
            return this.res.json({
              emailAddress: emailAddress,
              username: username,
              status: 1,
              message: "Activated Account, Authentication Successful",
              expiryDate: data.expiryDate,
              daysLeft: diffDays,
            });
          }
        }
      }
    }
  },
};
