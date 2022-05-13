module.exports = {
    friendlyName: 'Activate User Activity',
    description: 'Activate User Activity',
    exits:{
        success:{
            description: "User Activity Enabled"
        },
        failed:{
            description: "Could not find User with that ID"
        }
    },
    fn:async function(){
        const res = this.res;
        const req = this.req;

        const {id} = req.params;

        const userRecord = await User.findOne({id});
        
        if(!userRecord){
            throw "failed"
        } else {
            await User.updateOne({id}).set({
                activationStatus:'activated'
            });
            return res.redirect('/list-audiobaze-normalusers');
        }
    }
}