parasails.registerPage("welcome", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: "",
    pageLoadedAt: Date.now(),

    // Form data
    formData: { /* … */ },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    formRules: {
      licenseKey: { required: true },
    },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //…
  },
  mounted: async function () {
    const adminDash = document.querySelector('#adminDashboard');
    
    if (adminDash) {
      async function gettingNumberOfValidKeys(url, el) {
        el.innerHTML = "...";
        const res = await fetch(url);
        const data = await res.json();
        if (data) {
          const validkeys = data.licenseKeys.length;
          console.log(
            `You have a total of ${validkeys} valid license keys left`
          );
          el.innerHTML = `${validkeys}`;
        }
      }

      async function getNoOfActiveLicenses(url, el) {
        el.innerHTML = "...";
        const res = await fetch(url);
        const data = await res.json();
        if (data) {
          const noOfActivatedLicenses = data.licenseKeys.length;
          console.log(
            `There are currently ${noOfActivatedLicenses} activated licenses on the platform`
          );
          el.innerHTML = `${noOfActivatedLicenses}`;
        }
      }

      //…
      async function getNoOfUsers(url, el) {
        el.innerHTML = "...";
        const res = await fetch(url);
        const data = await res.json();
        if (data) {
          const noOfUsers = data.listOfUsers.length;
          console.log(
            `There are currently ${noOfUsers} Users on the Audiobaze Platform`
          );
          el.innerHTML = `${noOfUsers}`;
        }
      }

      async function getNoOfUnactivatedUsers(url, el) {
        el.innerText = "...";
        const res = await fetch(url);
        const data = await res.json();
        if (data) {
          const NoOfUnactivatedUsers = data.listOfUsers.length;
          console.log(
            `There are currently ${NoOfUnactivatedUsers} unactivated users on the platform`
          );
          el.innerText = `${NoOfUnactivatedUsers}`;
        }
      }

      getNoOfUnactivatedUsers(
        "/view-keys/unactivated-users",
        document.getElementById("unactivatedUsers")
      );
      gettingNumberOfValidKeys(
        "/view-keys/valid",
        document.getElementById("licenseKeysLeft")
      );
      getNoOfUsers("/list-users", document.getElementById("totalUsers"));
      getNoOfActiveLicenses(
        "/view-keys/activated",
        document.getElementById("activatedLicenses")
      );
    }

    const expiryDate = document.querySelector('#serviceExpiry');

    if(expiryDate){
      async function checkExpiry(url,el){
        const res = await fetch(url);
        const data = await res.json();
        if(data){
          el.innerHTML = data.message;
        } else {
          el.innerHTML = "..."
        }
      }

      checkExpiry('/check/expiry',expiryDate);
    }
  },

  //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
  //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
  // Configure deep-linking (aka client-side routing)
  virtualPagesRegExp: /^\/welcome\/?([^\/]+)?\/?/,
  afterNavigate: async function (virtualPageSlug) {
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
    switch (virtualPageSlug) {
      case "hello":
        this.modal = "example";
        break;
      default:
        this.modal = "";
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    clickOpenExampleModalButton: async function () {
      this.goto("/welcome/hello");
      // Or, without deep links, instead do:
      // ```
      // this.modal = 'example';
      // ```
    },

    closeExampleModal: async function () {
      this.goto("/welcome");
      // Or, without deep links, instead do:
      // ```
      // this.modal = '';
      // ```
    },
  },
});
