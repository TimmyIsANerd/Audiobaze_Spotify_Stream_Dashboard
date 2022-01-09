
module.exports = {


    friendlyName: 'View List of Unactivated Audiobaze Users on Admin Dashboard',
  
  
    description: 'Displays "List of Audiobaze Users that are not using the streaming service on the dashboard" page.',
  
  
    exits: {
  
      success: {
        description: 'List of Users successfully listed'
      }
  
    },
  
  
    fn: async function () {
        const listOfUsers = await User.find({licenseData: null, isSuperAdmin:false});
        
        return this.res.json({
            message:"Hello Admin! Here's the list of Unactivated Users on the Audiobaze Platform.",
            listOfUsers:listOfUsers
        })
    }
  
  
  };
  