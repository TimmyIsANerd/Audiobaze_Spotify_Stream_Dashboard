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
      description: "License Key Successfully Activated",
    },
    failure: {
      description: "License Key Activation Failed",
    },
    invalid: {
      description: "Invalid License Key",
    },
    used: {
      descriptiion: "Used License Key",
    },
    alreadyActivated:{
      description: "License already activated"
    }
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
      daysLeft: 30
    };

    const data = JSON.stringify(BotData);

    const licenseRecord = await License.findOne({
      licenseKey,
      keyStatus: "valid",
    });
    sails.log.info(licenseRecord);
    sails.log.info(this.req.me);
    if (!licenseRecord) {
      throw "invalid";
    } else {
      await License.updateOne({ licenseKey, keyStatus: "valid" }).set({
        keyStatus: "activated",
        currentKeyUser: this.req.me.emailAddress
      });
      await User.updateOne({id:this.req.me.id}).set({
        activationStatus:'activated',
        licenseData:data,
        daysLeft:30,
        machineId:[]
      })
    }
  },
};
