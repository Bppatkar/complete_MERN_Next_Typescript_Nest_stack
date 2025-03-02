const fs = require("fs");
const filePath = "./todo.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((elem, index) => console.log(`${index + 1}) ${elem.task} `));
};

const saveTask = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  //  tasks.push(task);  // 👈 Push task as a string instead of an object
  //{ task } is shorthand for { task: task } in ES6.
  saveTask(tasks);
  console.log("Task added: ", task);
  // run cmd in terminal - node todo/todo.js add "learning node js"
};

const removeTask = (i) => {
  const tasks = loadTasks();
  if (i > 0 && i <= tasks.length) {
    const removedTask = tasks.splice(i - 1, 1);
    saveTask(tasks);
    console.log("Task removed successfully: ", removedTask[0].task);
  } else console.log("Task not found");
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") addTask(argument);
else if (command === "list") listTasks();
// node todo/todo.js list [that will show your all tasks]
else if (command === "remove") removeTask(parseInt(argument));
else console.log("Command is not valid");
