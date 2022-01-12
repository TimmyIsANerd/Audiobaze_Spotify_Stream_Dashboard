module.exports = {


  friendlyName: 'View services',


  description: 'Display "Services" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/services'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
