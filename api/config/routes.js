/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  "GET /": {
    action: "view-homepage-or-redirect",
    locals: {
      pageTitle: "Home Page",
    },
  },
  "GET /welcome/:unused?": {
    action: "dashboard/view-welcome",
    locals: {
      pageTitle: "Dashboard",
    },
  },
  "GET /activatelicense": {
    action: "view-activatelicense",
    locals: {
      pageTitle: "Activate License",
    },
  },
  "GET /activate/:licenseKey": { action: "license/check-if-key-is-valid" },
  "GET /faq": {
    action: "view-faq",
    locals: {
      pageTitle: "FAQ",
    },
  },
  "GET /legal/terms": {
    action: "legal/view-terms",
    locals: {
      pageTitle: "Terms & Conditions",
    },
  },
  "GET /legal/privacy": {
    action: "legal/view-privacy",
    locals: {
      pageTitle: "Privacy Policy",
    },
  },
  "GET /contact": {
    action: "view-contact",
    locals: {
      pageTitle: "Contact Us",
    },
  },
  "GET /services": {
    action: "view-services",
    locals: {
      pageTitle: "Our Services",
    },
  },
  "GET /bot/login/:username/:machineId": { action: "talktobotlogin" },
  "GET /bot/signup/:username/:password/:machineId": {
    action: "talktobotsignup",
  },
  "GET /revoke/user/:id": { action: "revoke-user-access" },

  "GET /signup": {
    action: "entrance/view-signup",
    locals: {
      pageTitle: "Sign Up",
    },
  },
  "GET /email/confirm": {
    action: "entrance/confirm-email",
    locals: {
      pageTitle: "Confirm Email",
    },
  },
  "GET /email/confirmed": {
    action: "entrance/view-confirmed-email",
    locals: {
      pageTitle: "Email Confirmed",
    },
  },

  "GET /login": {
    action: "entrance/view-login",
    locals: {
      pageTitle: "Login",
    },
  },
  "GET /delete/user/:id": { action: "delete-user" },
  "GET /password/forgot": {
    action: "entrance/view-forgot-password",
    locals: {
      pageTitle: "Forgot Password",
    },
  },
  "GET /password/new": {
    action: "entrance/view-new-password",
    locals: {
      pageTitle: "Set New Password",
    },
  },

  "GET /account": {
    action: "account/view-account-overview",
    locals: {
      pageTitle: "Account Overview",
    },
  },
  "GET /account/password": {
    action: "account/view-edit-password",
    locals: {
      pageTitle: "Change Password",
    },
  },
  "GET /check/expiry": { action: "check-expiry" },
  "GET /account/profile": {
    action: "account/view-edit-profile",
    locals: {
      pageTitle: "Edit Profile",
    },
  },
  "GET /list-audiobaze-normalusers": {
    action: "view-list-audiobaze-normalusers",
    locals: {
      pageTitle: "Audiobaze Users",
    },
  },
  "GET /list-users": { action: "license/list-users" },
  "POST /activate/licensekey": { action: "license/activate-license" },
  "GET /list-keys": {
    action: "view-list-keys",
    locals: {
      pageTitle: "List Valid License Keys",
    },
  },
  "GET /view-keys/valid": { action: "send-list-keys-valid" },
  "GET /view-keys/activated": { action: "list-noactive-licenses" },
  "GET /view-keys/unactivated-users": { action: "list-unactivated-users" },
  "GET /generate-keys": { action: "generate-keys" },
  "GET /blog": { action: "view-blog" },
  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  "/terms": "/legal/terms",
  "/logout": "/api/v1/account/logout",

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  "/api/v1/account/logout": { action: "account/logout" },
  "PUT   /api/v1/account/update-password": {
    action: "account/update-password",
  },
  "PUT   /api/v1/account/update-profile": { action: "account/update-profile" },
  "PUT   /api/v1/account/update-billing-card": {
    action: "account/update-billing-card",
  },
  "PUT   /api/v1/entrance/login": { action: "entrance/login" },
  "POST  /api/v1/entrance/signup": { action: "entrance/signup" },
  "POST  /api/v1/entrance/send-password-recovery-email": {
    action: "entrance/send-password-recovery-email",
  },
  "POST  /api/v1/entrance/update-password-and-login": {
    action: "entrance/update-password-and-login",
  },
  "POST  /api/v1/deliver-contact-form-message": {
    action: "deliver-contact-form-message",
  },
  "POST  /api/v1/observe-my-session": {
    action: "observe-my-session",
    hasSocketFeatures: true,
  },
  "GET /find-user/:profileId": {
    action: "find-user",
  },
  "GET /activate-user/:userId/:NoOfDays": {
    action: "timed-activation",
  },
  "GET /machine/limit/:id/:limit": {
    action: "set-machine-limit",
  },

  // Store Management
  "GET /add-product": {
    action: "view-add-product",
    locals: {
      pageTitle: "Add New Product",
    },
  },
  "POST /add/product":{
    action: 'dashboard/add-product'
  }
};
