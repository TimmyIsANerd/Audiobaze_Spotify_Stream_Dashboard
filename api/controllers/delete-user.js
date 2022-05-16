/**
 * Delete User Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { id } = this.req.params;

    const res = this.res;

    const deleteUser = await User.destroyOne({ id })
    if(!deleteUser){
      return res.status(500).redirect("/list-audiobaze-normalusers");
    } else {
      return res.status(200).redirect("/list-audiobaze-normalusers");
    }
  },
};
