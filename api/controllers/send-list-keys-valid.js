module.exports = {
  friendlyName: "View list keys",

  description: 'Display "List keys" page.',

  exits: {
    success: {
      description: "License Keys Listed on front end",
    },
  },

  fn: async function () {
    const licenseKeys = await License.find({
      keyStatus:'valid'
    });

    return this.res.json({
      message:
        "Hello Admin! Here's the list of License keys on the Audiobaze Platform.",
      licenseKeys: licenseKeys,
    });
  },
};
