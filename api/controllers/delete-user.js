/**
 * Delete User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
  fn:async function(){
    const {id} = this.req.params;

    const res = this.res;

    const deleteUser = await User.destroyOne({id}).then(res =>{
      res.redirect('list-audiobaze-normalusers');
    }).catch(error =>{
      return res.json({
        message:'failed to delete user'
      })
    })
  }
};

