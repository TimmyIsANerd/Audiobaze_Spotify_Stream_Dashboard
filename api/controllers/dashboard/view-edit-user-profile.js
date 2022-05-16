module.exports = {


  friendlyName: 'View edit user profile',


  description: 'Display "Edit user profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/edit-user-profile'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
