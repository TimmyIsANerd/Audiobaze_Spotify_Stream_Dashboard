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
      isIn:['valid', 'expired','activated','revoke'],
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

    await License.findOne({ licenseKey })
      .then((data) => {
        if (!data || data === undefined) {
          sails.log.info("License Key Invalid");
          return res.json({
            status: "License Key Invalid",
            message: "License Key Invalid",
          });
        } else if (data.keyStatus === "valid") {
          sails.log.info("License Key Confirmed Valid");
          return res.json({
            status: "License Key Valid",
            message: "License Key Valid",
          });
        } else if (data.keyStatus === "expired") {
          sails.log.info("License Key Expired");
          return res.json({
            status: "License Key Expired",
            message: "License Key Expired",
          });
        } else if (data.currentKeyUser.length > 0) {
          sails.log.info("License Key Activated");
          return res.json({
            status: "License Key Activated",
            message: "License Key Activated",
            user: data.currentKeyUser
          });
        }
      })
      .catch((err) => console.log(err));
  },
};
