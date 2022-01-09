/**
 * Check Expiry Date Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
    friendlyName: "Check if service has expired",

    description: "Validate that service has expired",
    
    exits: {
        success: {
          description: "Check for Expiry Date",
        },
        unactivated:{
            description: "This user is unactivated",
        },
    },
    // Check Expiry Date
    fn:async function(){
        // Check User Record
      const userRecord = await User.findOne({id:this.req.me.id});
      if(!userRecord.licenseData){
          throw "unactivated";
      } else {
        const {licenseData} = await User.findOne({id:this.req.me.id})
        
        const data = JSON.parse(licenseData);

        // Check Today's Date
        const today = new Date();
        const todayString = today.toLocaleDateString();
        // If Today is the Expiry Date, Set User to Unactivated and set License Key to Expired
        if(data.expiryDate === todayString){
            await License.updateOne({currentKeyUser:this.req.me.emailAddress}).set({
                keyStatus:"expired",
            })
            await User.updateOne({
                activationStatus:"unactivated"
            })

            return res.json({
                message:'Services Expired'
            })
        }
      }
    }
};
  
  