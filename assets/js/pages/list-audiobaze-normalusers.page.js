parasails.registerPage("list-audiobaze-normalusers", {
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
        listOfUsers.map((user) => {
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
                    <div data-id='${user.id}' id="id_trigger" style="cursor:pointer;">
                      <h6 class="mb-0 text-sm">${user.fullName}</h6>
                    </div>
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
            </tr>
          `;
          // Change Row Attribute
          cloneTableRow.setAttribute("id", `${user.id}`);

          // Attach to Table Body
          tableBody.appendChild(cloneTableRow);
          console.log(cloneTableRow);
        });
      }
    }

    fetchUserData("/list-users", document.querySelector("table"));

    // Create Modal Component
    const modal = document.createElement("div");
    
    // Modal Container
    const modalContainer = document.getElementById("modal_container");
    async function displayUserInfo(id) {
      const res = await fetch(`/find-user/${id}`);
      const data = await res.json();
      console.log(data);

      if (!data) {
        alert("Audiobaze User Not Found In Database");
      } else {
        // Pass in Data to Modal Component
        modal.innerHTML = `
          <div class="modal" tabindex="-1" id="userModal" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Audiobaze User Account</h5>
                  <button type="button" style="border:none; background:none;" data-dismiss="modal" aria-label="Close" class="closeBtn">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h3>User Information</h3>
                  <p>Email : ${data.user.emailAddress}</p>
                  <p>Full Name : ${data.user.fullName}</p>
                  <p>Activation Status : ${data.user.activationStatus.charAt(0).toUpperCase() + data.user.activationStatus.slice(1)}</p>
                  <p>Maximum Number of Devices : ${data.user.machineIdLimit}</p>
                  <p>Account Creation Date : ${data.user.accountCreationDate}</p>
                  <hr />
                  <h3>Limit Account Access</h3>
                  <div>
                    <a class="btn btn-secondary mx-1"
                        href="/revoke/user/${data.user.id}"
                    >Revoke User Access</a>
                    <a class="btn btn-primary mx-1"
                        href="/delete/user/${data.user.id}"
                    >Delete User</a>
                  </div>
                  <hr />
                  <h4>Account Activation : No Of Days</h4>
                  <div>
                    <form id="temporary_activation">
                      <div class="input-group input-group-outline">
                        <label for="NoOfDays" class="form-label"></label>
                        <input type="number" class="form-control"
                        id="NoOfDays" name="NoOfDays"
                        placeholder="Activation Period"
                        value="7"
                        required
                        />                        
                        <p id="tempActMsg"></p>                       
                        <button type="submit" class="btn btn-primary" id="temporary_activation_button">Save changes</button>
                      </div>
                    </form>
                  </div>
                  <h4>Change Machine Limit</h4>
                  <div>
                    <form id="machine_id_limit">
                      <div class="input-group input-group-outline">
                        <label for="idLimit" class="form-label"></label>
                        <input type="number" class="form-control"
                        id="idLimit"
                        max="10"
                        min="1"
                        value="4"
                        placeholder="Machine ID Limit"
                        required
                        />
                        <p></p>                       
                        <button type="submit" class="btn btn-secondary" id="machine_id_limit_save">Save changes</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary closeBtn" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        `;


        modalContainer.appendChild(modal);
        $("#userModal").modal("show");

        
        const close = $('.closeBtn');
        close.click(() =>{
          $('#userModal').modal('hide');
          clearModal(modal);
        })
        
        // Temporary Activation Form
        const temporaryActivationForm = document.getElementById('temporary_activation');
        const NoOfDays = document.getElementById('NoOfDays');
        temporaryActivationForm.addEventListener('submit',(e)=>{
          e.preventDefault();
          const activateLink = document.createElement('a');
          activateLink.setAttribute('href',`/activate-user/${data.user.id}/${NoOfDays.value}`);
          activateLink.click();
        })

        // Machine ID Limit Form
        const machine_id_limit = document.getElementById('machine_id_limit');
        const limit = document.getElementById('idLimit');

        machine_id_limit.addEventListener('submit',(e)=>{
          e.preventDefault();
          const limitLink = document.createElement('a');
          limitLink.setAttribute('href',`/machine/limit/${data.user.id}/${limit.value}`)
          limitLink.click();
        })


      }
    }


    function clearModal(modal) {
      modal.parentNode.removeChild(modal);
    }
    setTimeout(() => {
      const id_trigger = document.querySelectorAll("#id_trigger");
      id_trigger.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          displayUserInfo(trigger.dataset.id);
        });
      });
    }, 1000);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  },
});
