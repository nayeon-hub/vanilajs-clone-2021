const focusForm = document.querySelector(".js-toDoForm"),
  focusInput = focusForm.querySelector("input");
const focusInfo = document.querySelector(".js-focusInfo");
const focusSpan = focusInfo.querySelector("span");
const focusCheck = focusInfo.querySelector("input");
const focusBtn = focusInfo.querySelector("button");

const CURRENT_FOCUS = "currentFocus";

function textDeco() {
  const name = focusCheck.className;
  if (name === "checked pending") {
    focusCheck.classList.remove("pending");
    focusSpan.style.textDecoration = "line-through";
  } else {
    focusCheck.classList.add("pending");
    focusSpan.style.textDecoration = "none";
  }
}

function deleteFocus() {
  localStorage.removeItem(CURRENT_FOCUS);
  focusSpan.innerHTML = "";
  focusInfo.classList.add("hiding");
  askForFocus();
}

function saveFocus(text) {
  localStorage.setItem(CURRENT_FOCUS, text);
}

function paintFocus(text) {
  focusForm.classList.add("hiding");
  focusInfo.classList.remove("hiding");
  focusSpan.innerHTML = text;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentFocus = focusInput.value;
  saveFocus(currentFocus);
  paintFocus(currentFocus);
  focusInput.value = "";
}
function askForFocus() {
  focusForm.classList.remove("hiding");
  focusForm.addEventListener("submit", handleSubmit);
}

function loadFocus() {
  const currentFocus = localStorage.getItem(CURRENT_FOCUS);

  if (currentFocus === null) {
    askForFocus();
  } else {
    paintFocus(currentFocus);
  }
}

function init() {
  loadFocus();
  focusBtn.addEventListener("click", deleteFocus);
  focusCheck.addEventListener("click", textDeco);
}

init();
