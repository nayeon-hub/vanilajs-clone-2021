const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.add("hiding");
  greeting.classList.remove("hiding");
  greeting.innerText = `Hello ${text}`;
  //show "hello name"
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    //she is not
    askForName();
  } else {
    //she is
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}

init();
