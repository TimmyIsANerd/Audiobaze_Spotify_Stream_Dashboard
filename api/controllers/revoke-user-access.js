module.exports = {
  friendlyName: "Revoke User Activity",

  description: "Revoke User Activity",

  exits: {
    success: {
      description: "User Activity Disabled",
    },
    failed: {
      description: "Couldn't find User with that Id",
    },
  },

  fn: async function () {
    const res = this.res;
    const req = this.req;

    const { id } = req.params;

    const userRecord = await User.findOne({ id });

    if (!userRecord) {
      throw "failed";
    } else {
      const { licenseData } = userRecord;

      const cloneData = JSON.parse(licenseData);

      // Change Expiry Date to Todays Date
      var today = new Date();
      var today = today.toLocaleDateString();
      cloneData.expiryDate = today;
      cloneData.daysLeft = 0;

      const newDB = JSON.stringify(cloneData);

      await User.updateOne({ id }).set({
        activationStatus: "revoked",
        daysLeft: 0,
        licenseData:newDB,
      });
      return res.redirect("/list-audiobaze-normalusers");
    }
  },
};
