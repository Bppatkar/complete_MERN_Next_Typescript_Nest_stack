const textfield = document.querySelector("#todo-input");
const btn = document.getElementById("add-task-btn");
const list = document.querySelector("#todo_list");

let tasks = [];

btn.addEventListener("click", () => {
  const taskText = textfield.value.trim();
});
