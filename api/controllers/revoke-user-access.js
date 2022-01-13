module.exports = {
    friendlyName: "Revoke User Activity",
  
    description: 'Revoke User Activity',
  
    exits: {
      success: {
        description: "User Activity Disabled",
      },
      failed:{
        description: "Couldn't find User with that Id"
      }
    },
  
    fn: async function () {
      const res = this.res;
      const req = this.req;

      const {id} = req.params;

      const userRecord = await User.findOne({id});

      if(!userRecord){
        throw "failed"
      } else {
        await User.updateOne({id}).set({
            activationStatus:'revoked'
        })
        return res.redirect('/list-audiobaze-normalusers');
      }
    },
  };
  