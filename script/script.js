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
    
    function validateInput() {
    
      if ((fName.value.length < 2 || fName.value.length > 15) && (lName.value.length < 2 || lName.value.length > 15)) {
        message.setAttribute("class", "error");
        message.innerHTML = "Minimum of 2 and maximum of 15 characters for first name and last name.";
        return false; // prevent form submit
      } else {
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
    
    // form submission validation
    card.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateInput()) {
        return;
      } else {
        const formData = new FormData(event.target);

        fetch("main.php", {
          method: "POST",
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            Swal.fire({
              title: "Section Identified!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Cool!"
          });

          let table = document.querySelector("table");
          let tableBody = document.getElementById("userInfos");
          let newRow = document.createElement("tr");

          table.classList.add("submitted");

          newRow.innerHTML = `
              <td>${data.summary.id}</td>
              <td>${data.summary.Name}</td>
              <td>${data.summary.Gender}</td>
              <td>${data.summary.Age}</td>
              <td>${data.summary.Address}</td>
              <td>${data.section}</td>
                  <button class="edit-btn" data-id="${data.summary.Id}">Edit</button>
                  <button class="delete-btn" data-id="${data.summary.Id}">Delete</button>
              
          `;

          tableBody.appendChild(newRow);

          } else {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "Okay"
            })
        }
  
        })
        .catch(error => console.error("Error:", error));
        }
      });
  
  });
  
  