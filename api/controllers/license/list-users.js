
module.exports = {


    friendlyName: 'View List of Audiobaze Users on Admin Dashboard',
  
  
    description: 'Display "List audiobaze normalusers" page.',
  
  
    exits: {
  
      success: {
        description: 'List of Users successfully listed'
      }
  
    },
  
  
    fn: async function () {
        const listOfUsers = await User.find({isSuperAdmin: false});
        
        return this.res.json({
            message:"Hello Admin! Here's the list of Users on the Audiobaze Platform.",
            listOfUsers:listOfUsers
        })
    }
  
  
  };
  