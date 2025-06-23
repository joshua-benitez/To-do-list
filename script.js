let tasks = []; // array to hold tasks
// check if there are saved tasks in local storage
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks); // parse and load them
  tasks.forEach((task, index) => createTaskElement(task, index)); // recreate each task in the UI
}
// grab the form and the input field from the DOM
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

// creates a new task item with its buttons and adds it to the list
function createTaskElement(task, index) {
  const taskList = document.getElementById("task-list");

  // basic <li> to hold the task text
  const newTask = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = task.name;
  newTask.appendChild(taskText);

  newTask.dataset.index = index; // use passed-in index
  if (task.completed) {
    newTask.classList.add("completed");
  }

  // create both buttons (delete + completed)
  const deleteButton = createDeleteButton(newTask);
  const completedButton = createCompletedButton(newTask);

  // finally, add the task to the visible list
  newTask.appendChild(deleteButton);
  newTask.appendChild(completedButton);
  taskList.appendChild(newTask);
}

// makes a delete button for a specific task
function createDeleteButton(taskElement) {
  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.classList.add("task-btn");

  // removes this specific task when clicked
  btn.addEventListener("click", () => {
    taskElement.remove();
    const index = taskElement.dataset.index;
    // remove from the tasks array
    tasks.splice(index, 1);
    // update the indices of remaining tasks
    tasks.forEach((task, i) => {
      const taskItem = document.querySelector(`li[data-index="${i}"]`);
      if (taskItem) {
        taskItem.dataset.index = i; // update index in the DOM
      }
    });
    // save updated tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // if the list is empty, show a message
    if (tasks.length === 0) {
      const taskList = document.getElementById("task-list");
      taskList.innerHTML = "<li>No tasks available.</li>";
    }
  });

  return btn;
}

// makes a completed/undo button for a task
function createCompletedButton(taskElement) {
  const btn = document.createElement("button");
  btn.textContent = "Completed";
  btn.classList.add("task-btn");

  btn.addEventListener("click", () => {
    const index = taskElement.dataset.index;

    // Toggle visual class
    taskElement.classList.toggle("completed");

    // Update the task's 'completed' status in the array
    tasks[index].completed = taskElement.classList.contains("completed");

    // Save updated tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update button label
    btn.textContent = tasks[index].completed ? "Undo" : "Completed";
  });

  return btn;
}

// main listener that runs when a task is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // avoid full page reload

  const taskName = taskInput.value.trim();

  // clear all
  const clearBtn = document.getElementById("clear-tasks");

  clearBtn.addEventListener("click", () => {
    tasks = []; // clear the array
    localStorage.removeItem("tasks"); // clear localStorage
    document.getElementById("task-list").innerHTML = ""; // clear UI
  });

  // only add if there's something in the input
  if (taskName) {
    const newTask = { name: taskName, completed: false };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTaskElement(newTask, tasks.length - 1);
    taskInput.value = "";
  } else {
    alert("Please enter a task name."); // user tried to submit blank
  }
});
