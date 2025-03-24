document.addEventListener('DOMContentLoaded', function() {

    const card = document.querySelector('.card');
    const idInput = document.getElementById('userId');
    const fName = document.getElementById('fName');
    const lName = document.getElementById('lName');
    const ageInput = document.getElementById('age');
    const address = document.getElementById('address');
    const message = document.querySelector("#message");
  
    const inputs = document.querySelectorAll('input[data-counter]');
    const addressCounter = document.querySelectorAll('textarea[data-counter]');

    // edit button
    const editBtn = document.querySelector(".edit-btn");

    // delete button
    const deleteBtn = document.querySelector(".delete-btn");
    
    function validateInput() {
    
        if (!validateSpaces(fName.value) || !validateSpaces(lName.value) || !validateSpaces(address.value)) {
          message.setAttribute("class", "error");
          message.innerHTML = "Spaces are not allowed before and after the name and address.";
          return false;
        }
    
        if (hasSpecialCharacters(fName.value) || hasSpecialCharacters(lName.value)) {
          message.setAttribute("class", "error");
          message.innerHTML = "Special characters for name is not allowed.";
          return false;
        }
    
        if (address.value.length < 10 || address.value.length > 50) {
          message.setAttribute("class", "error");
          message.innerHTML = "Minimum of 10 and maximum of 150 characters for address.";
          return false;
        }
    
        if (validAddress(address.value)) {
          message.setAttribute("class", "error");
          message.innerHTML = "Only special characters allowed are hyphen, comma, period, and forward slash.";
          return false;
        }
    
        if (!containsNumber(address.value)) {
          message.setAttribute("class", "error");
          message.innerHTML = "Address should contain at least one number.";
          return false;
        }
    
        return true;
      
    }
    
    // space validation for name and address
    function validateSpaces(input) {
      return !input.startsWith(" ") && !input.endsWith(" "); // check lang kung di nagstart or nagend sa space
    }
    
    // special character validation for name
    function hasSpecialCharacters(input) {
      // List of special characters
      const specialCharacters = "0123456789!@#$%^&*()_+{}:\"<>?|[];,./~"; //removed apostrophe , hyphen, and backtick
    
      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        // pag wala sa list, special character
        if (specialCharacters.includes(char)) {
          return true; 
        }
      }
      return false; 
    }
    
    // address validation
    function validAddress(input) {
      const specialCharacters = "!@#$%^&*()_+{}:\"<>?|[];~"; //removed numbers, comma, period, and forward slash
      
      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        // pag wala sa list, special character
        if (specialCharacters.includes(char)) {
          return true; 
        }
      }
      return false; 
    }
  
    // number validation
    function containsNumber(input) {
      for (let i = 0; i < input.length; i++) {
        if (!isNaN(input[i])) { // check current character if it is a number
          return true;
        }
      }
    
      return false;
    }
    
    // id validation
    idInput.addEventListener('input', function() {
      idInput.value = idInput.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
    });

    // age validation
    ageInput.addEventListener('input', function() {
      ageInput.value = ageInput.value.replace(/[^0-9]/g, ''); // remove non-numeric characters

      if (ageInput.value.length > 0) {
        ageInput.classList.add('valid');
      }
    });

  
    // character counter for name
    inputs.forEach(input => {
     input.addEventListener('input', function() {
        const counter = document.querySelector(`#${input.id} + span`);
        // kung nag eexist yung counter
        if(counter) {
          counter.textContent = `${input.value.length}/50`;
        }
  
        input.classList.remove('valid'); // remove all classes
        
        if (input.value.length > 1 && input.value.length <= 50) {
          input.classList.add('valid'); // green (valid)
        }
      });
  
      
      input.addEventListener('keydown', function(e) {
        if (e.key === "Backspace" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Tab" || e.key === "Delete" || e.key === "Ctrl") {
          return; // allow these keys
        }
  
        if (input.value.length >= 50) {
          e.preventDefault();
        }
      });
    });
  
    // character counter for address
    addressCounter.forEach(input => {
      input.addEventListener('input', function() {
        const counter = document.querySelector(`#${input.id} + span`);
        if (counter) {
          counter.textContent = `${input.value.length}/150`;
        }
  
        if (input.value.length < 10) {
          address.style.borderColor = "#ff4545";
        } else {
          address.style.borderColor = "#00ff99";
        }
      });
  
      input.addEventListener('keydown', function(e) {
        if (e.key === "Backspace" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Tab" || e.key === "Delete" || e.key === "Ctrl") {
          return; // allow these keys
        }
  
        if (input.value.length >= 150) { // prevent typing if length is 150
          e.preventDefault();
        }
      });
    });

    function sortId() {
      let tableBody = document.getElementById("userInfos");
      let rows = Array.from(tableBody.rows); // convert to array
  
      rows.sort((a, b) => a.cells[0].innerText - b.cells[0].innerText); // if a - b is negative, a comes first; if positive, b comes first
  
      rows.forEach(row => tableBody.appendChild(row)); // apply the sorted rows
  }

  // function to identify or validate the section (same as the main.php)
  function identifySection(lastName, gender) {
    if (!lastName || !gender) return "Unknown"; // validate if no input

    const surname = lastName.toUpperCase();
    const firstLetter = surname[0];
    const surnameGroup = (firstLetter >= 'A' && firstLetter <= 'M') ? 1 : 2;

    const genderNormalized = gender.trim().toLowerCase() === "male" ? "3" : gender.trim().toLowerCase() === "female" ? "4" : "Unknown";

    let section = "Unknown"; // default

    if (surnameGroup === 1 && genderNormalized === "3") {
        section = "Class A";
    } else if (surnameGroup === 2 && genderNormalized === "4") {
        section = "Class B";
    } else if (surnameGroup === 2 && genderNormalized === "3") {
        section = "Class C";
    } else if (surnameGroup === 1 && genderNormalized === "4") {
        section = "Class D";
    }

    return section;
}
    
// Form submission validation
card.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateInput()) {
    return;
  } else {
    const formData = new FormData(event.target);

    fetch("main.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          let table = document.querySelector("table");
          let tableBody = document.getElementById("userInfos");
          let existingRow = null;

          // Check if the ID already exists in the table
          for (let row of tableBody.rows) {
            if (row.cells[0].innerText === data.summary.id) {
              existingRow = row;
              break;
            }
          }

          if (existingRow) {
            // If ID exists, show Swal options
            Swal.fire({
              title: "ID already exists!",
              text: "Would you like to edit or delete this entry?",
              icon: "warning",
              showCancelButton: true,
              showDenyButton: true,
              confirmButtonText: "Edit",
              denyButtonText: "Delete",
              cancelButtonText: "Cancel",
            }).then((result) => {
              if (result.isConfirmed) {
                // edit option in swal
                Swal.fire({
                  title: "Edit Information",
                  html: `
                  <div style="display: flex; flex-direction: column; text-align: center;">
                    <label for="swal-fName">First Name</label>
                    <input id="swal-fName" class="swal2-input" placeholder="First Name" value="${existingRow.cells[1].innerText.split(" ")[0]}"> <!--split the first half (first name)-->

                    <label for="swal-lName">Last Name</label>
                    <input id="swal-lName" class="swal2-input" placeholder="Last Name" value="${existingRow.cells[1].innerText.split(" ")[1]}"> <!--split the second half (last name)-->
                    
                    <label for="swal-gender">Gender</label>
                    <input id="swal-gender" class="swal2-input" placeholder="Gender (Male/Female)" value="${existingRow.cells[2].innerText}">

                    <label for="swal-age">Age</label>
                    <input id="swal-age" class="swal2-input" placeholder="Age" value="${existingRow.cells[3].innerText}">

                    <label for="swal-address">Address</label>
                    <input id="swal-address" class="swal2-input" placeholder="Address" value="${existingRow.cells[4].innerText}">
                  </div>
                  `,
                  showCancelButton: true,
                  confirmButtonText: "Save",
                  allowOutsideClick: false, // prevent closing the modal
                  preConfirm: () => {
                    const fNameInput = document.getElementById("swal-fName").value.trim();
                    const lNameInput = document.getElementById("swal-lName").value.trim();
                    const genderInput = document.getElementById("swal-gender").value.trim().toLowerCase();
                    const ageInput = document.getElementById("swal-age").value.trim();
                    const addressInput = document.getElementById("swal-address").value.trim();

                    // check if first and last name contains numbers
                    const hasNumber = /\d/.test(fNameInput) || /\d/.test(lNameInput);
                    if (hasNumber) {
                      Swal.showValidationMessage("First and last name must not contain numbers!");
                      return false;
                    }

                    // check if all fields are filled
                    if (!fNameInput || !lNameInput || !genderInput || !ageInput || !addressInput) {
                      Swal.showValidationMessage("All fields are required!");
                      return false;
                    }
                    
                    // gender validation, should only be male or female
                    if (genderInput !== "male" && genderInput !== "female") {
                      Swal.showValidationMessage("Please enter a valid gender (Male/Female)!");
                      return false;
                    }

                    // age validation, should only be a number
                    const hasString = /\D/.test(ageInput);
                    if (hasString) {
                      Swal.showValidationMessage("Age must be a number!");
                      return false;
                    }

                    return {
                      fName: document.getElementById("swal-fName").value.trim(),
                      lName: document.getElementById("swal-lName").value.trim(),
                      gender: genderInput.charAt(0).toUpperCase() + genderInput.slice(1), // Capitalize first letter only
                      age: document.getElementById("swal-age").value.trim(),
                      address: document.getElementById("swal-address").value.trim(),
                    };
                  },
                }).then((editResult) => {
                  if (editResult.isConfirmed) {
                    const newLastName = editResult.value.lName.trim();
                    const newGender = editResult.value.gender.trim();
                
                    // call the function to identify the section
                    const newSection = identifySection(newLastName, newGender);
                
                    // update existing rows
                    existingRow.cells[1].innerText = editResult.value.fName + " " + newLastName;
                    existingRow.cells[2].innerText = newGender;
                    existingRow.cells[3].innerText = editResult.value.age;
                    existingRow.cells[4].innerText = editResult.value.address;
                    existingRow.cells[5].innerText = newSection; // Update section column
                
                    Swal.fire("Updated!", "The record has been updated.", "success");
                  }
                });
              } else if (result.isDenied) {
                // Delete option
                existingRow.remove();

                // if table has 1 row, remove the submitted class (to display: none;)
                if (tableBody.rows.length === 1) {
                  table.classList.remove("submitted");
                }

                Swal.fire("Deleted!", "The record has been removed.", "success");
              }
            });
          } else {
            // if ID doesn't exist, add new row
            Swal.fire({
              title: "Section Identified!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Cool!",
            });

            let newRow = document.createElement("tr");
            table.classList.add("submitted");

            newRow.innerHTML = `
              <td>${data.summary.id}</td>
              <td>${data.summary.Name}</td>
              <td>${data.summary.Gender}</td>
              <td>${data.summary.Age}</td>
              <td>${data.summary.Address}</td>
              <td>${data.section}</td>
            `;

            tableBody.appendChild(newRow);
            sortId();
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});

});
  
  