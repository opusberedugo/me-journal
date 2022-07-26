// Form
let form = document.querySelector("form");
let hmmn = {};
// Inputs
let inputs = Array.from(document.querySelectorAll("form input"));

// Error
let errorLabels = Array.from(document.querySelectorAll("p.error"));

// Regular Expressions
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /[0](70|80|90|81|91)\d{8}/;

let usernameState = { state: null };

const socket = io();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e);

  usernameState.state = null;

  inputs.map(input => input.classList.remove("error"));
  inputs.map(input => input.value = input.value.trim());
  errorLabels.map(label => label.textContent = "");

  inputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      input.classList.add("error");
      errorLabels[index].textContent = "this field is required";
      throw Error("Field is empty");
    }
  })

  if (inputs[0].value.trim().length < 4) {

    inputs[0].classList.add("error");
    errorLabels[0].textContent = "Name must have at least 4 characters";
    throw Error("Name not valid");

  } else if (inputs[1].value.trim().length < 4) {

    inputs[1].classList.add("error");
    errorLabels[1].textContent = "Name must have at least 4 characters";
    throw Error("Name not valid");

  } else if (!emailRegex.test(inputs[2].value.trim())) {

    inputs[2].classList.add("error");
    errorLabels[2].textContent = "Please Enter a valid email";
    throw Error("Email is not valid");

  } else if (inputs[3].value.trim().length > 11 || inputs[3].value.trim().length < 11) {

    inputs[3].classList.add("error");
    errorLabels[3].textContent = "Please Enter a valid Nigerian Phone number";
    throw Error("Phone number is not valid");

  } else if (phoneRegex.test(inputs[3].value.trim()) === false) {

    inputs[3].classList.add("error");
    errorLabels[3].textContent = "Please Enter a valid Nigerian Phone number";
    throw Error("Phone number is not valid");

  } else if (inputs[4].value.trim().length < 4) {

    inputs[4].classList.add("error");
    errorLabels[4].textContent = "Username must have at least 4 characters";
    throw Error("Name not valid");

  } else if (inputs[5].value.trim().length < 6) {

    inputs[5].value.trim().classList.add("error")
    errorLabels[5].textContent = "Password must have at least 6 characters"
    throw Error("Password Invalid not valid")

  } else if (inputs[6].value.trim().length < 6) {

    inputs[6].value.trim().classList.add("error")
    errorLabels[6].textContent = "Password must have at least 6 characters"
    throw Error("Password Invalid not valid")

  } else if (inputs[5].value.trim() != inputs[6].value.trim()) {

    inputs[5].classList.add("error")
    inputs[6].classList.add("error")
    errorLabels[6].textContent = "Password must have at least 6 characters"
    throw Error("Passwords must be the same")

  } else if (usernameState.state === null) {
    
    socket.emit('username-available', inputs[4].value.trim())
    
    socket.on("userAvailabilityState", ( (state) => { 
      usernameState.state = state
      if (!usernameState.state) {
      
        inputs[4].classList.add("error");
        errorLabels[4].textContent = "Username has been taken";
        throw Error("Username has been taken");
      
      }else{
        form.submit();
      }
      return state
    }))

    
  } 





})