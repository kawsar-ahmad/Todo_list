document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  let taskIdCounter = 1;

  function addTask() {
    if (taskInput.value.trim() !== "") {
      const newTask = createTaskElement(taskInput.value);
      taskList.appendChild(newTask);
      taskInput.value = "";
      taskIdCounter++;
      renumberTasks();
    }
  }

  function deleteTask(button) {
    const task = button.parentElement;
    task.remove();
    renumberTasks();
  }

  function completeTask(button) {
    const task = button.parentElement;
    const taskText = task.querySelector("span");
    taskText.style.textDecoration =
      taskText.style.textDecoration === "line-through"
        ? "none"
        : "line-through";
  }

  function editTask(button) {
    const task = button.parentElement;
    const taskText = task.querySelector("span");
    const newText = prompt(
      "Edit task:",
      taskText.textContent.split(".").slice(1).join(".").trim()
    );
    if (newText !== null && newText.trim() !== "") {
      taskText.textContent = `${task.getAttribute("data-task-id")}. ${newText}`;
    }
  }

  function createTaskElement(taskText) {
    const newTask = document.createElement("li");
    newTask.setAttribute("data-task-id", taskIdCounter);
    newTask.innerHTML = `
        <span>${taskIdCounter}. ${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="completeTask(this)">Complete</button>
        <button onclick="deleteTask(this)">Delete</button>
      `;
    return newTask;
  }

  function renumberTasks() {
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach((task, index) => {
      const taskText = task.querySelector("span");
      taskText.textContent = `${index + 1}. ${taskText.textContent
        .split(".")
        .slice(1)
        .join(".")
        .trim()}`;
      task.setAttribute("data-task-id", index + 1);
    });
  }

  window.addTask = addTask;
  window.deleteTask = deleteTask;
  window.completeTask = completeTask;
  window.editTask = editTask;
});
