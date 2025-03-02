document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.querySelector("#todo-input");
  const submitBtn = document.getElementById("add-task-btn");
  const ulList = document.querySelector("#todo_list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((elem) => renderWebPage(elem));

  submitBtn.addEventListener("click", () => {
    let todoText = todoInput.value;
    if (todoText === "") return;

    let createTask = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };
    tasks.push(createTask);
    addTaskInLocalStorage();
    renderWebPage(createTask);
    todoInput.value = "";
    console.log(tasks);
  });

  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitBtn.click();
    }
  });

  function addTaskInLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderWebPage(value) {
    let li = document.createElement("li");
    li.setAttribute("data-id", value.id);

    if (value.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
    <span>${value.text}</span>
    <button>Remove</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      value.completed = !value.completed;
      li.classList.toggle("completed");
      addTaskInLocalStorage();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != value.id);
      li.remove();
      addTaskInLocalStorage();
    });

    li.setAttribute("data-complete", value.completed);
    ulList.appendChild(li);
  }
});
