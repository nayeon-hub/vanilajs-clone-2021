const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
// LS = localStorage
let toDos = [];


function deleteTodo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //value에 저장할 때는 list->string으로 바꿔서~
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length+1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click",deleteTodo)
  span.innerText = text;

  toDoList.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault(); //event를 작동하지 못하게 하는 메서드
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  //localStorage 저장이 이미 되있거나 안되있거나
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    //출력할때는 string->list로 바꿔서
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
    //JSON javascript object notaiton
  } else {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
