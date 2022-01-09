parasails.registerPage("list-keys", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //…
  },
  mounted: async function () {
    async function fetchUserData(endpoint, table) {
      // const tableHead = table.querySelector('thead');
      const tableBody = table.querySelector("tbody");
      const tableRow = table.querySelector("tr#licenses");
      const res = await fetch(endpoint);
      const data = await res.json();

      if (!data) {
        console.log("Unable to access license data");
      } else {
        console.log(data);
        const listOfLicenses = data.licenseKeys;
        console.log(listOfLicenses);
        listOfLicenses.map(license => {
          // Clone Table Row
          const cloneTableRow = tableRow.cloneNode(true);
          // Change Row Content
          cloneTableRow.innerHTML = `
            <tr id="licenses">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="./audiobaze.png" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <p class="text-xs text-secondary mb-0">${license.currentKeyUser}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs text-secondary mb-0">${license.licenseKey}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-info">${license.keyStatus}</span>
              </td>
            </tr>
          `;

          // Change Row Attribute
          cloneTableRow.setAttribute("id", `${license.id}`);

          // Attach to Table Body
          tableBody.appendChild(cloneTableRow);
        });
      }
    }

    fetchUserData("/view-keys/valid", document.querySelector("table"));
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  },
});
