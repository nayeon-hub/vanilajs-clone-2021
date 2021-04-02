const topLeftBox = document.querySelector(".top-left"),
  spanBtn = topLeftBox.querySelector("span");
const todo = document.querySelector(".todo");
const todoBox = todo.querySelector(".todo-box");
const taskForm = todoBox.querySelector(".todo-form");
const taskInput = taskForm.querySelector("input");
const pendingList = todoBox.querySelector(".pending-ul");
const finishedList = todoBox.querySelector(".finished-ul");

let pList = [];
let fList = [];

function showTodoList() {
  const name = todo.className;
  console.log(name);
  if (name === "todo hiding") {
    todo.classList.remove("hiding");
  } else {
    todo.classList.add("hiding");
  }
}
function savePending(text) {
  localStorage.setItem("PENDING", JSON.stringify(pList));
}
function saveFinished(text) {
  localStorage.setItem("FINISHED", JSON.stringify(fList));
}

function paint(text, lists) {
  const ul = lists;
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btnOne = document.createElement("button");
  const btnTwo = document.createElement("button");

  ul.appendChild(li);
  li.appendChild(span);
  li.appendChild(btnOne);
  li.appendChild(btnTwo);

  span.innerText = text;
  btnTwo.innerText = "❌";

  if (lists.className === "pending-ul") {
    btnOne.innerText = "✅";
    const newId = Math.random() * 10;
    li.id = newId;
    const pObj = {
      id: newId,
      text: text,
    };
    pList.push(pObj);
    savePending();

    btnOne.addEventListener("click", move);
    btnTwo.addEventListener("click", remove);
  } else if (lists.className === "finished-ul") {
    btnOne.innerText = "⏪";
    const newId = Math.random() * 10;
    li.id = newId;
    const fObj = {
      id: newId,
      text: text,
    };
    fList.push(fObj);
    saveFinished();

    btnOne.addEventListener("click", move);
    btnTwo.addEventListener("click", remove);
  }
}
function move(event) {
  const li = event.target.parentNode;
  const ul = li.parentNode;
  const span = li.querySelector("span");

  if (ul.className === "pending-ul") {
    remove(event);
    paint(span.innerText, finishedList);
  } else if (ul.className === "finished-ul") {
    remove(event);
    paint(span.innerText, pendingList);
  }
}

function remove(event) {
  const li = event.target.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);
  if (ul.className === "pending-ul") {
    const cleanList = pList.filter(function (pl) {
      return pl.id !== parseFloat(li.id);
    });
    pList = cleanList;
    savePending();
  } else if (ul.className === "finished-ul") {
    const cleanList = fList.filter(function (fl) {
      return fl.id !== parseFloat(li.id);
    });
    fList = cleanList;
    saveFinished();
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInput.value;
  paint(currentValue, pendingList);
  taskInput.value = "";
}

function loadedTask() {
  const loadedPending = localStorage.getItem("PENDING");
  const loadedFinished = localStorage.getItem("FINISHED");

  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pl) {
      paint(pl.text, pendingList);
    });
  }
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (fl) {
      paint(fl.text, finishedList);
    });
  }
}

function init() {
  loadedTask();
  taskForm.addEventListener("submit", handleSubmit);
  spanBtn.addEventListener("click", showTodoList);
}

init();
