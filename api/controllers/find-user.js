module.exports = {
  friendlyName: "Sends User Information to the Front End",
  description: "Sends Single User Information to the Front End",
  fn: async function () {
    const req = this.req;
    const res = this.res;

    const { profileId } = req.params;

    const userRecord = await User.findOne({ id: profileId });

    if (!userRecord) {
      res.status(500).json({
        status: 0,
        message: "Failed to Find User",
      });
    } else {
      res.status(200).json({
        status: 0,
        user: userRecord,
      });
    }
  },
};
