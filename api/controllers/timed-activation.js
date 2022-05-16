module.exports = {
  friendlyName: "Set Timed User Activity",
  description: "Set Timed User Activity",
  exits: {
    success: {
      description: "User Activity Enabled for Time Period",
    },
    failed: {
      description: "Could not find User with that ID",
    },
  },
  fn: async function () {
    const res = this.res;
    const req = this.req;

    const { userId, NoOfDays } = req.params;

    const days = parseInt(NoOfDays);

    // License Activation & Expiry Date
    const activationDate = new Date();
    const activationDateString = activationDate.toLocaleDateString();
    // Add No of days : Generate Expiry Date
    const expiryDate = new Date();
    expiryDate.setDate(activationDate.getDate() + days);
    const expiryDateString = expiryDate.toLocaleDateString();

    const userRecord = await User.findOne({ id: userId });

    if (!userRecord) {
      return res.status(500).json({
        status: 0,
        message: "Failed to Find User",
      });
    } else {
      const { licenseData } = userRecord;
      if (licenseData) {
        const cloneData = JSON.parse(licenseData);
        sails.log(cloneData);
        cloneData.activationDate = activationDateString;
        cloneData.expiryDate = expiryDateString;
        cloneData.daysLeft = days;

        const newDBEntry = JSON.stringify(cloneData);

        await User.updateOne({ id: userId }).set({
          activationStatus: "activated",
          licenseData: newDBEntry,
          daysLeft: days,
          machineId: [],
        });
      } else {
        // Machine ID Slot
        const machineId = [];

        const dbEntry = {
          activationDate: activationDateString,
          expiryDate: expiryDateString,
          machineId: machineId,
          daysLeft: days
        };

        const data = JSON.stringify(dbEntry);
        await User.updateOne({ id: userId }).set({
          activationStatus: "activated",
          licenseData: data,
          daysLeft: days,
          machineId: [],
        });
      }
      return res.status(200).redirect("/list-audiobaze-normalusers");
    }
  },
};
