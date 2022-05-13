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
      if (usernameTest.machineID.length === 0) {
        return this.res.json({
          status: 0,
          message: "No Machine ID in Database",
        });
      } else {
        let idSlots = usernameTest.machineID;
        for (let i = 0; i < idSlots.length; i++) {
          if (idSlots[i] === machineId) {
            // If Machine ID is in the database, return success
            let userRecord = usernameTest;
            // Collect its Data
            const { licenseData, activationStatus, username, emailAddress,machineIdLimit } = userRecord;

            const data = JSON.parse(licenseData);
            if (data.expiryDate === undefined || data.expiryDate === null) {
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
            var newTodayFormat =
              todaydatearr[2] + "/" + todaydatearr[1] + "/" + todaydatearr[0];
            var re = "/";
            var newTodayFormat = newTodayFormat.replace(re, "-");

            // Convert Expiry Date to yyyy-mm-dd format
            var expdate = data.expiryDate;
            var expdatearr = expdate.split("/");
            var newexpdate =
              expdatearr[2] + "/" + expdatearr[1] + "/" + expdatearr[0];
            var newexpdate = newexpdate.replace(re, "-");

            var date1 = new Date(newTodayFormat);
            var date2 = new Date(newexpdate);
            const diffDays = calculateDaysLeft(date1, date2);
            sails.log.info(diffDays);

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
          } else {
            const limit = machineIdLimit + 1;
            if (idSlots.length < limit) {
              const slotCheck = await User.findOne({
                machineID:[machineId]
              })
              if(!slotCheck){
                // add id to slots
                await User.updateOne({ username }).set({
                  machineID: [...idSlots, machineId],
                });
                return this.res.json({
                  status: 1,
                  message: `Machine ID ${machineId} is a new device`,
                });
              } else {
                return this.res.json({
                  status: 1,
                  message: "Machine ID Exists on Server: Access Granted",
                });
              }
            } else {
              return this.res.json({
                status: 0,
                message:
                  "You tried to login in with more than 4 devices, Access Denied",
              });
            }
          }
        }
      }
    }
  },
};
