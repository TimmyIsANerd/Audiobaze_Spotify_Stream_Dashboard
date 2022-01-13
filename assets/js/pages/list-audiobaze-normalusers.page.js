parasails.registerPage('list-audiobaze-normalusers', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    async function fetchUserData(endpoint, table) {
      // const tableHead = table.querySelector('thead');
      const tableBody = table.querySelector("tbody");
      const tableRow = table.querySelector("tr#users");
  
      // const cloneTableRow = tableRow.cloneNode(true);
      // cloneTableRow.setAttribute("id", "newUser");
      // tableBody.appendChild(cloneTableRow);
      // console.log(cloneTableRow);
      // Clear Out Table
      const res = await fetch(endpoint);
  
      const data = await res.json();
  
      if (!data) {
        console.log("Unable to access data");
      } else {
        console.log(data);
        const listOfUsers = data.listOfUsers;
        console.log(listOfUsers);
        listOfUsers.map(user =>{
          // Clone Table Row
          const cloneTableRow = tableRow.cloneNode(true);
          // Change Row Content Row
          cloneTableRow.innerHTML = `
            <tr id="users">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="./audiobaze.png" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">${user.fullName}</h6>
                    <p class="text-xs text-secondary mb-0">${user.emailAddress}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Audiobaze</p>
                <p class="text-xs text-secondary mb-0">Normal User</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-primary">${user.activationStatus}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">${user.accountCreationDate}</span>
              </td>
              <td class="align-middle">
                <a
                  href="/revoke/user/${user.id}"
                  class="text-secondary font-weight-bold text-xs"
                >
                  Revoke
                </a>
              </td>
              <td class="align-middle">
                <a href="/delete/user/${user.id}" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete User">
                  Delete
                </a>
              </td>
            </tr>
          `;
          // Change Row Attribute
          cloneTableRow.setAttribute("id", `${user.id}`);
  
          // Attach to Table Body
          tableBody.appendChild(cloneTableRow);
          console.log(cloneTableRow)
        })
      }
    }
  
    fetchUserData("/list-users", document.querySelector("table"));
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  }
});
