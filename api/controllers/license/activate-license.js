module.exports = {
  friendlyName: "Activate License for One User",

  description: "Activate Audiobaze License to last for 30 days",

  inputs: {
    currentKeyUser: {
      type: "string",
      isEmail: true,
      description: "Current Key User On Audiobaze Platform",
    },
    licenseKey: {
      type: "string",
      required: true,
      unique: true,
      description: "License Key for activating Audiobaze service for 30 days",
      example: "2$28a8eabna301089103-13948134nad",
    },
  },

  exits: {
    success: {
      description: "License Key Activated",
    },
    failure: {
      description: "License Key Deactivated",
    },
  },

  fn: async function ({ licenseKey }) {
    const req = this.req;
    const res = this.res;

    // License Activation & Expiry Date
    const activationDate = new Date();
    const activationDateString = activationDate.toLocaleDateString();
    // Add 30 days : Generate Expiry Date
    const expiryDate = new Date();
    expiryDate.setDate(activationDate.getDate() + 30);
    const expiryDateString = expiryDate.toLocaleDateString();

    // Machine ID Slot
    const machineId = [];

    const BotData = {
      activationDate: activationDateString,
      expiryDate: expiryDateString,
      machineId: machineId,
    };

    const data = JSON.stringify(BotData);

    // Check if License is Valid
    await License.findOne({ licenseKey }).then((data) => {
      if (!data || data === undefined) {
        sails.log.info("License Key Invalid");
        return res
          .json({
            status: "License Key Invalid",
            message: "License Key Invalid",
          })
          .status(500);
      } else if (data.keyStatus === "valid") {
        return res
          .json({
            status: "License Key Valid & Activated",
            message: "License Key Valid & Activated",
          })
          .status(200);
      } else if (data.keyStatus === "expired") {
        sails.log.info("License Key Expired");
        return res
          .json({
            status: "License Key Expired",
            message: "License Key Expired",
          })
          .status(300);
      } else if (data.currentKeyUser.length > 0) {
        sails.log.info("License Key already Activated");
        return res
          .json({
            status: "License Key already Activated",
            message: "License Key already Activated",
            user: data.currentKeyUser,
          })
          .status(500);
      }
    });

    const licenseValidity = await License.findOne({ licenseKey });

    if (licenseValidity.keyStatus === "valid") {
      // Update Record : License Data
      await User.updateOne({
        id: req.me.id,
      }).set({
        licenseData: data,
      });
      // Update Record for License
      await License.updateOne({ licenseKey }).set({
        currentKeyUser: req.me.emailAddress,
        keyStatus: "activated",
      });
    }
  },
};
