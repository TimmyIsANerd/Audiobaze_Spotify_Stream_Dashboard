/**
 * Talk to Bot Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: "Send JSON Data to BOT",

    description: "Communicate with BOT via JSON data",

    exits: {
        success: {
          description: "JSON Data Sent",
        },
        cantFindUser:{
            description: "Can't Find User",
        },
    },

    fn: async function(){
        // Check for User
        const {emailAddress} = this.req.params;
        const userRecord = await User.findOne({emailAddress});

        if(!userRecord){
            return this.res.json({
                message:"System can't find user record"
            });
        } else {
            
            // If User Exists send data response
            const {licenseData, activationStatus, emailAddress} = userRecord;

            if(!licenseData){
                const botData = {
                    email:emailAddress,
                    activationStatus:activationStatus
                }
                return res.json({
                    data:botData
                });
            } else {
                const data = JSON.parse(licenseData);
                const botData = {
                    activationStatus:activationStatus,
                    expiryDate:data.expiryDate,
                    machineId:data.machineId,
                }
                return res.json({
                    data:botData
                });
            }

        }


    }
}