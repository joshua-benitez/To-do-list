// grab the form and the input field from the DOM
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

// creates a new task item with its buttons and adds it to the list
function createTaskElement(taskName) {
  const taskList = document.getElementById("task-list");

  // basic <li> to hold the task text
  const newTask = document.createElement("li");
  newTask.textContent = taskName;

  // create both buttons (delete + completed)
  const deleteButton = createDeleteButton(newTask);
  const completedButton = createCompletedButton(newTask);

  // attach the buttons to the task
  newTask.appendChild(deleteButton);
  newTask.appendChild(completedButton);

  // finally, add the task to the visible list
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
  });

  return btn;
}

// makes a completed/undo button for a task
function createCompletedButton(taskElement) {
  const btn = document.createElement("button");
  btn.textContent = "Completed";
  btn.classList.add("task-btn");

  // toggles strikethrough and updates the button label
  btn.addEventListener("click", () => {
    taskElement.classList.toggle("completed");
    btn.textContent = taskElement.classList.contains("completed")
      ? "Undo"
      : "Completed";
  });

  return btn;
}

// main listener that runs when a task is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // avoid full page reload

  const taskName = taskInput.value.trim();

  // only add if there's something in the input
  if (taskName) {
    createTaskElement(taskName); // build and add task
    taskInput.value = ""; // reset input field
  } else {
    alert("Please enter a task name."); // user tried to submit blank
  }
});
