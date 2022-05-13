module.exports = {
    fn:async function({}){
        const req = this.req;
        const res = this.res;
        const {profileId} = req.params;

        const userRecord = await User.findOne({id:profileId});

        if(!userRecord){
            res.status(500).view('pages/edit-user-profile', {user:userRecord,pageTitle:"Edit User Account Profile"})
        }{
            res.status(200).view('pages/edit-user-profile', {user:userRecord,pageTitle:"Edit User Account Profile"})
        }
    }
}