module.exports = {
  fn: async function ({}) {
    const req = this.req;
    const res = this.res;

    const { id, limit } = req.params;

    const maxDevices = parseInt(limit);

    const userRecord = await User.findOne({ id });

    if (!userRecord) {
      return res.status(500).redirect("/list-audiobaze-normalusers");
    } else {
      await User.updateOne({ id }).set({
        machineIdLimit: maxDevices,
      });
      return res.status(500).redirect("/list-audiobaze-normalusers");
    }
  },
};
