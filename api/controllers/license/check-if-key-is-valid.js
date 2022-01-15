module.exports = {
  friendlyName: "Check if Key is Valid",

  description: "Check if key stored on database is still valid",

  inputs: {
    licenseKey: {
      type: "string",
      required: true,
      unique: true,
      description: "License Key for activating Audiobaze service for 30 days",
      example: "2$28a8eabna301089103-13948134nad",
    },

    keyStatus: {
      type: "string",
      isIn: ["valid", "expired", "activated", "revoke"],
      defaultsTo: "valid",
      description: "Key Status",
    },

    currentKeyUser: {
      type: "string",
      isEmail: true,
      description: "Current Key User On Audiobaze Platform",
    },
  },

  exits: {
    success: {
      description: "Key is valid",
    },

    expired: {
      description: "Key is expired",
    },

    invalid: {
      description: "Key is activated",
    },
  },

  fn: async function () {
    const { licenseKey } = this.req.params;
    const res = this.res;

    const licenseSearch = await License.findOne({ licenseKey });
    if (!licenseSearch) {
      sails.log.info("License Key Invalid");
      return res
        .json({
          message: "License Key Invalid",
        })
        .status(409);
    } else {
      sails.log.info("License Key Valid");
      return res
        .json({
          message: "License Key Valid",
          keystatus:licenseSearch.keyStatus,
          currentKeyUser: licenseSearch.currentKeyUser,
        })
        .status(200);
    }
  },
};
