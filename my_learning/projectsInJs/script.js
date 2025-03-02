document.addEventListener("DOMContentLoaded", () => {
  const textfield = document.querySelector("#todo-input");
  const btn = document.getElementById("add-task-btn");
  const list = document.querySelector("#todo_list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((elem) => renderTaskFromLocalStorage(elem));

  btn.addEventListener("click", () => {
    const taskText = textfield.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    savedTasklocalStorage();
    renderTaskFromLocalStorage(newTask);
    // console.log(tasks);
    textfield.value = "";
  });

  textfield.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      btn.click();
    }
  });

  function savedTasklocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTaskFromLocalStorage(value) {
    let li = document.createElement("li");
    li.setAttribute("data-id", value.id);
    if (value.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
    <span>${value.text}</span> 
    <button>Remove</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      value.completed = !value.completed;
      li.classList.toggle("completed");
      savedTasklocalStorage();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== value.id);
      // console.log(tasks);
      li.remove();
      savedTasklocalStorage();
    });

    li.setAttribute("data-complete", value.completed);

    list.appendChild(li);
  }
});
