//Selectors
const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
toDoButton.addEventListener("click", addTodo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);

// Functions
function addTodo(event) {
  //Prevent form submit/refresh
  event.preventDefault();

  //toDo DIV
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo");

  //create LI
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  //ADD TODO TO LOCAL STORAGE
  saveLocalTodos(toDoInput.value);
  // Completed Button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  toDoDiv.appendChild(completeButton);
  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  toDoDiv.appendChild(trashButton);
  // Append To List
  toDoList.appendChild(toDoDiv);
  //Clear Todo INPUT VALUE
  toDoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete ToDo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CheckMark ToDo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterToDo(e) {
  const todos = toDoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //CHECK IF THERE IS EXISTING DATA
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //CHECK IF THERE IS EXISTING DATA
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //toDo DIV
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    //create LI
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);
    // Completed Button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    toDoDiv.appendChild(completeButton);
    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    toDoDiv.appendChild(trashButton);
    // Append To List
    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalTodos(todo) {
  //CHECK IF THERE IS EXISTING DATA
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const toDoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(toDoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
