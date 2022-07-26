let options = document.querySelectorAll("nav .options .option")
let tabs = document.querySelectorAll("main section")
let modalTriggers = document.querySelectorAll(".modal-link")
let modals = document.querySelectorAll(".modal")
let modalForms = document.querySelectorAll(".modal form");
let modalFormInputs = document.querySelectorAll(".modal form input");
let modalFormInputsErrorLabel = document.querySelectorAll(".modal form .error");
let modalCloseButton = document.querySelectorAll(".modal button.close");


let socket = io();
$("select").select2();

options.forEach((option, index) => {
  option.addEventListener("click", (e) => {
    options.forEach((v) => (v.classList.remove("active")))
    option.classList.add("active")
    tabs.forEach((v) => (v.style.display = "none"))
    tabs[index].style.opacity = 0;
    tabs[index].style.display = "block";
    tabs[index].style.opacity = 1;
  })

})

modalTriggers.forEach((modalTrigger, index) => {
  modalTrigger.addEventListener("click", () => {
    modals[index].style.opacity = 0;
    modals[index].removeAttribute("style")
    modals[index].style.opacity = 1;
  })
})




modalCloseButton.forEach((closeButton, index) => {
  closeButton.addEventListener("click", () => {

    modals[index].style.opacity = 0;
    modals[index].style.display="none"; 
  
   })
})

modalForms.forEach((form, index) => {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    modalFormInputs[index].classList.remove("error");

    if (modalFormInputs[index].value.trim() === "") {

      modalFormInputs[index].classList.add("error");
      modalFormInputsErrorLabel[index].textContent = "This field is required"

    } else if (modalFormInputs[index].value.trim().length < 4) {

      modalFormInputs[index].classList.add("error");
      modalFormInputsErrorLabel[index].textContent = "Name cannot be less than 4 characters"

    } else {
      form.submit();
    }

  })
})