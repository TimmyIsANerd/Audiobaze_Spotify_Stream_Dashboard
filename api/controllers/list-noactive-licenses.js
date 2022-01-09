module.exports = {
    friendlyName: "Number of Activated Licenses",
  
    description: 'Display "Number of activated licenses" on the dashboard page.',
  
    exits: {
      success: {
        description: "License Keys Listed on front end",
      },
    },
  
    fn: async function () {
      const licenseKeys = await License.find({
        keyStatus:'activated'
      });
  
      return this.res.json({
        message:
          "Hello Admin! Here's the list of Activated License keys on the Audiobaze Platform.",
        licenseKeys: licenseKeys,
      });
    },
  };
  