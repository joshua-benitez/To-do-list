// Select the form and input field
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

// Handle form submission (when user adds a task)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload on form submission

  const taskName = taskInput.value.trim();

  if (taskName) {
    // Create a new list item and append to the task list
    const taskList = document.getElementById("task-list");
    const newTask = document.createElement("li");
    newTask.textContent = taskName;
    taskList.appendChild(newTask);

    // Create the "Delete" button for the task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // When clicked, remove the task (its parent <li>) from the list
    deleteButton.addEventListener("click", function () {
      taskList.removeChild(newTask);
    });

    // Add the delete button to the task item
    newTask.appendChild(deleteButton);

    // Clear the input field after adding the task
    taskInput.value = "";
  } else {
    // Alert user if they try to submit an empty task
    alert("Please enter a task name.");
  }
});
