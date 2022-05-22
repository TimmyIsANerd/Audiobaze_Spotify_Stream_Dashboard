/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"checkIfKeyIsValid":{"verb":"GET","url":"/activate/:licenseKey","args":["licenseKey","keyStatus","currentKeyUser"]},"talktobotlogin":{"verb":"GET","url":"/bot/login/:username/:machineId","args":[]},"talktobotsignup":{"verb":"GET","url":"/bot/signup/:username/:password/:machineId","args":[]},"revokeUserAccess":{"verb":"GET","url":"/revoke/user/:id","args":[]},"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"deleteUser":{"verb":"GET","url":"/delete/user/:id","args":[]},"checkExpiry":{"verb":"GET","url":"/check/expiry","args":[]},"listUsers":{"verb":"GET","url":"/list-users","args":[]},"activateLicense":{"verb":"POST","url":"/activate/licensekey","args":["currentKeyUser","licenseKey"]},"sendListKeysValid":{"verb":"GET","url":"/view-keys/valid","args":[]},"listNoactiveLicenses":{"verb":"GET","url":"/view-keys/activated","args":[]},"listUnactivatedUsers":{"verb":"GET","url":"/view-keys/unactivated-users","args":[]},"generateKeys":{"verb":"GET","url":"/generate-keys","args":[]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName","username"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"observeMySession":{"verb":"POST","url":"/api/v1/observe-my-session","args":[],"protocol":"io.socket"},"findUser":{"verb":"GET","url":"/find-user/:profileId","args":[]},"timedActivation":{"verb":"GET","url":"/activate-user/:userId/:NoOfDays","args":[]},"setMachineLimit":{"verb":"GET","url":"/machine/limit/:id/:limit","args":[]}}
  /* eslint-enable */

});
