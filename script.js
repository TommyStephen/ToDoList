document.addEventListener("DOMContentLoaded", loadTasks);

// Load tasks from Local Storage
function loadTasks() {
    let taskTableBody = document.getElementById("taskTableBody");
    taskTableBody.innerHTML = ""; // Clear table before reloading

    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

    taskArray.forEach((task, index) => {
        let row = taskTableBody.insertRow();

        let dateCell = row.insertCell(0);
        let taskCell = row.insertCell(1);
        let actionCell = row.insertCell(2);

        dateCell.textContent = task.date;
        taskCell.textContent = task.text;

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = function () {
            editTask(index);
        };

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            deleteTask(index);
        };

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
    });
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");
    let taskText = taskInput.value.trim();
    let taskDateValue = taskDate.value;
    

    if (taskText === "" || taskDateValue === "") {
        alert("Please enter a task and select a date!");
        return;
    }

    let task = {
        date: taskDateValue,
        text: taskText
    };

    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
    taskArray.push(task);
    
    // Sort tasks by date
    taskArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    localStorage.setItem("tasks", JSON.stringify(taskArray));

    taskInput.value = "";
    taskDate.value = "";

    loadTasks();
}



// Edit task function
function editTask(index) {
    let taskArray = JSON.parse(localStorage.getItem("tasks"));

    let newDate = prompt("Enter new date (YYYY-MM-DD):", taskArray[index].date);
    let newText = prompt("Enter new task:", taskArray[index].text);

    if (newDate && newText) {
        taskArray[index].date = newDate;
        taskArray[index].text = newText;
        
        // Sort tasks after editing
        taskArray.sort((a, b) => new Date(a.date) - new Date(b.date));

        localStorage.setItem("tasks", JSON.stringify(taskArray));
        loadTasks();
    }
}

// Delete task function
function deleteTask(index) {
    let taskArray = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    loadTasks();
}
