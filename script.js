// The unique key for the app stored in localStorage
const AppKey = "041TaskTraker";

// Selecting DOM elements for the task creation and management
const newTaskContainer = document.querySelector(".add-task");
const addBtn = document.querySelector(".add input");
const saveTaskBtn = document.querySelector('.add-task-btn');
const newTaskInfo = document.getElementById('new-task');
const taskMenu = document.getElementsByClassName("menu")[0];
const feedback = document.querySelector(".feedback");

// Setup function to initialize the app
const appSetUp = () => {
    // Initialize the app data if it doesn't exist in localStorage
    if (!Object.keys(localStorage).includes(AppKey)) {
        localStorage.setItem(AppKey, JSON.stringify({}));
    }

    // Add event listener to show the add-task form when the "+" button is clicked
    addBtn.addEventListener("click", () => {
        toggelAddTask();
    });
};

// Helper function to determine if a task is completed
const isChecked = (isCompleted) => {
    return (isCompleted) ? "complete" : "";
};

// Function to render all tasks from localStorage to the UI
const renderTask = () => {
    taskMenu.innerHTML = ``; // Clear the current task list

    let savedData = JSON.parse(localStorage.getItem(AppKey));

    // Show a default message if there are no tasks
    if (Object.keys(savedData).length === 0) {
        let item = document.createElement("li");
        item.classList.add("task");
        item.innerHTML = `
            <div class="check-box">
                <span>You Are Too Much Free :D</span>
            </div>
        `;
        taskMenu.append(item);
        return 1;
    }

    // Render each task stored in localStorage
    let counter = 0;
    for (let key in savedData) {
        let item = document.createElement("li");

        item.classList.add("task");
        item.innerHTML = `
            <div class="check-box">
                <input type="checkbox" class=" ${isChecked(savedData[key].isCompleted)}" name="check" id="${key}">
                <span class="task-info ${isChecked(savedData[key].isCompleted)}">${savedData[key].task}</span>
            </div>
            <div class="button-box">
                <input type="button" value="Del">
            </div>
        `;
        taskMenu.append(item);
    }
};

// Function to show feedback messages to the user (success/error)
const showFeedback = (message, type) => {
    let content = feedback.getElementsByTagName('span')[0];
    content.textContent = message;
    feedback.classList = `feedback show ${type}`; // Add class for styling
    setTimeout(() => {
        feedback.classList = `feedback`; // Hide feedback after 1.5 seconds
        content.textContent = ``;
    }, 1500);
};

// Check if the task is already in localStorage to avoid duplicates
const isRepeatedTask = (new_task) => {
    let savedData = JSON.parse(localStorage.getItem(AppKey));
    let tasksList = Object.values(savedData);

    return tasksList.some((taskInfo) => {
        return taskInfo.task === new_task; // Returns true if a match is found
    });
};

// Function to update localStorage with a new task
const updateAppData = (newTask, isCompleted) => {
    let newKey = Date.now(); // Use current timestamp as a unique key
    let savedData = JSON.parse(localStorage.getItem(AppKey));
    savedData[newKey] = { task: newTask.trim(), isCompleted: isCompleted };
    localStorage.setItem(AppKey, JSON.stringify(savedData));
};

// Function to toggle the completion state of a task
const updateTaskCompletion = (id) => {
    let savedData = JSON.parse(localStorage.getItem(AppKey));
    if (Object.keys(savedData).includes(id)) {
        savedData[id].isCompleted = !(savedData[id].isCompleted); // Toggle completion
        localStorage.setItem(AppKey, JSON.stringify(savedData));
    } else {
        return 1; // Return if the task ID doesn't exist
    }
};

// Function to show/hide the add-task form
const toggelAddTask = () => {
    newTaskInfo.value = ''; // Clear the input field
    newTaskContainer.classList.toggle("show"); // Toggle visibility of the form
    document.querySelector(".add input").classList.toggle("close"); // Toggle the "+" button state
    saveNewTask(); // Set up the event listener for saving the task
};

// Save the new task (event listener setup)
const saveNewTask = () => {
    saveTaskBtn.removeEventListener("click", handleSaveTask); // Remove any existing listener
    saveTaskBtn.addEventListener("click", handleSaveTask); // Add a fresh listener for the task save
};

// Handle the saving of a new task
const handleSaveTask = () => {
    let newTask = newTaskInfo.value.trim(); // Remove any leading/trailing spaces

    // Check if the task is empty or already exists
    if (!newTask) {
        console.log("No Task Exists");
        showFeedback("No Task Exists", "error");
    } else if (isRepeatedTask(newTask)) {
        console.log("Task Already Exists");
        showFeedback("Task Already Exists", "error");
    } else {
        updateAppData(newTask, false); // Save the new task as not completed
        showFeedback("Task Added Successfully", "success");
        renderTask(); // Re-render tasks after adding a new one
    }
    toggelAddTask(); // Close the add-task form after saving
};

// Function to delete a task from localStorage
const deleteTask = (newKey) => {
    let savedData = JSON.parse(localStorage.getItem(AppKey)) || {};
    if (savedData[newKey]) {
        delete savedData[newKey]; // Remove the task
        localStorage.setItem(AppKey, JSON.stringify(savedData));
        showFeedback(`Task deleted successfully.`, "success");
    } else {
        showFeedback(`Task does not exist.`, "error");
    }
};

// Function to update a task's information in localStorage
const updateTaskInfo = (id, newTask) => {
    let savedData = JSON.parse(localStorage.getItem(AppKey));
    if (Object.keys(savedData).includes(id)) {
        savedData[id].task = newTask; // Update the task's description
        localStorage.setItem(AppKey, JSON.stringify(savedData));
    } else {
        return 1; // Return if task ID doesn't exist
    }
};

// Event listener to toggle the task completion or delete tasks
const completionToggle = () => {
    taskMenu.addEventListener("click", (event) => {
        const target = event.target;

        // Handle task completion toggle when task name is clicked
        if (target.matches(".task-info")) {
            const checkbox = target.previousElementSibling; // Get the associated checkbox
            checkbox.checked = !checkbox.checked; // Toggle the checkbox
            updateTaskCompletion(checkbox.id); // Update task completion in localStorage
            renderTask(); // Re-render tasks

        // Handle task completion when checkbox is clicked
        } else if (target.matches(`[type="checkbox"]`)) {
            updateTaskCompletion(target.id); // Update task completion in localStorage
            renderTask(); // Re-render tasks

        // Handle task deletion when the "Del" button is clicked
        } else if (target.matches(`[value="Del"]`)) {
            const taskElement = target.closest(".task"); // Find the task container
            const checkbox = taskElement?.querySelector(".check-box input[type='checkbox']"); // Find checkbox inside the task
            deleteTask(checkbox?.id); // Delete task from localStorage
            renderTask(); // Re-render tasks

        } else {
            return; // Return if none of the above conditions match
        }
    });
};

// Initialize the app by setting up event listeners and rendering tasks
appSetUp();
renderTask();
completionToggle();
