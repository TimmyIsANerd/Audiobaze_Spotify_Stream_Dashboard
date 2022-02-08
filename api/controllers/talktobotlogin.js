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
        if (data.expiryDate === undefined) {
          return this.res.json({
            status: 0,
            message:
              "This account is unactivated, Please create an account on https://audiobaze.net",
          });
        }

        function calculateDaysLeft(date1, date2) {
          const date1utc = Date.UTC(
            date1.getFullYear(),
            date1.getMonth(),
            date1.getDate()
          );
          const date2utc = Date.UTC(
            date2.getFullYear(),
            date2.getMonth(),
            date2.getDate()
          );
          day = 1000 * 60 * 60 * 24;
          return (date2utc - date1utc) / day;
        }

        //Check Expiry date using today's date
        const today = new Date();
        const todayString = today.toLocaleDateString();
        // Convert dates to yyyy-mm-dd format
        var todaydatearr = data.activationDate.split("/");
        var newTodayFormat = todaydatearr[2] + "/" + todaydatearr[1] + "/" + todaydatearr[0];
        var re = "/";
        var newTodayFormat = newTodayFormat.replace(re,'-');

        // Convert Expiry Date to yyyy-mm-dd format
        var expdate = data.expiryDate;
        var expdatearr = expdate.split("/");
        var newexpdate = expdatearr[2] + "/" + expdatearr[1] + "/" + expdatearr[0];
        var newexpdate = newexpdate.replace(re,'-');

        var date1 = new Date(newTodayFormat);
        var date2 = new Date(newexpdate);
        const diffDays = calculateDaysLeft(date1,date2);
        sails.log.info(diffDays)

        if (diffDays === 0) {
          return this.res.json({
            username: username,
            status: 0,
            message: "User license expired and access is denied",
            expiryDate: data.expiryDate,
            daysLeft: 0,
          });
        }

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
