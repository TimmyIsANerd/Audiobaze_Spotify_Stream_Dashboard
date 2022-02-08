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
        status: 0,
        status: "Username/Password doesn't exist on database",
      });
    } else {
      // If the password doesn't match, then also exit thru "badCombo".
      await sails.helpers.passwords
        .checkPassword(password, userRecord.password)
        .intercept("incorrect", "badCombo");
      if (userRecord.machineID === "") {
        await User.updateOne({ username }).set({
          machineID: machineId,
        });
      }
      // } else {
      //   return res
      //     .json({
      //       status: 0,
      //       message: "User & Machine ID already registered",
      //     })
      //     .status(409);
      // }
        
      const { licenseData, emailAddress, activationStatus } = userRecord;
      const data = JSON.parse(licenseData);
      if(data.expiryDate === undefined){
        return this.res.json({
          status:0,
          message:"This account is unactivated, Please create an account on https://audiobaze.net and activate it with a license key"
        })
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

        // Check Expiry Date
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
          status: 0,
          daysLeft: 0,
        });
      } else {
        if (activationStatus === "unactivated") {
          return this.res.json({
            username: username,
            status: 0,
            message:
              "Unactivated User, Please Purchase a license before trying to use the bot",
              daysLeft: 0
          });
        }

        if (activationStatus === "revoked") {
          return this.res.json({
            username: username,
            status: 0,
            message:
              "Account Access revoked, user attempted to login to platform using a new device",
            daysLeft:0
          });
        }

        if (activationStatus === "activated") {
          return res.json({
            username: username,
            emailAddress: emailAddress,
            status: 1,
            message: "Activated User",
            expiryDate: data.expiryDate,
            activationStatus: activationStatus,
            daysLeft: diffDays
          });
        }
      }
    }
  },
};
