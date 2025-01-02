# Task Tracker Web App

## Hey there! Welcome to the Task Tracker!

This is a simple web app where you can keep track of your tasks. It allows you to add new tasks, mark them as completed, and delete them. The best part? The tasks stay saved, even when you refresh the page—thanks to local storage. Plus, it’s mobile-friendly, so it works on both phones and desktops. 😊

Whether you're just starting your programming journey or you've been coding for a while, this project will help you understand some core web development concepts. By the end of it, you'll have a solid grasp on how to work with HTML, CSS, JavaScript, and local storage. Let’s dive in!

## Features
- **Add Tasks**: You can type in a task and hit save—simple as that!
- **Mark Tasks as Completed**: Once a task is done, just mark it, and it’ll stand out.
- **Delete Tasks**: Don’t need that task anymore? Just delete it!
- **Local Storage**: Your tasks stick around even after you refresh the page, thanks to local storage.
- **Responsive**: Whether you’re on a phone or a computer, the app adjusts to your screen size.
- **User Feedback**: You’ll get feedback when you add, mark, or delete tasks so you know things worked.

## How to Run This Project

### Step 1: Clone the Repo
Start by getting the project on your local machine. Open up your terminal and clone it with Git:

```bash
git clone https://github.com/your-username/task-tracker.git
```

### Step 2: Open the Project
Once it’s cloned, navigate to the project folder:

```bash
cd task-tracker
```

Now, open the `index.html` file in your favorite web browser.

### Step 3: Start Tracking Tasks
You’re all set! You can start adding tasks, marking them as done, and deleting them as needed. Just play around with the features, and see how it works.

---

## Let's Break Down the Code

### 1. HTML Structure

First things first, we’ve got the HTML. This defines the structure of our app. It's simple, with a header, an input field to add tasks, a list to display them, and a footer with a button to add more tasks.

```html
<header>
    <h1>Task Tracker</h1>
    <div class="add-task">
        <input type="text" id="new-task" placeholder="Enter New Task">
        <input type="button" value="Save">
    </div>
</header>
<main>
    <ul class="task-list"></ul>
</main>
<footer>
    <input type="button" value="+">
</footer>
```

- **Header**: Contains the title and an input field for adding new tasks.
- **Main**: This is where all the tasks will show up.
- **Footer**: A simple button to add more tasks.

---

### 2. CSS Styling

Next, we use CSS to make our app look nice and clean. It’s designed to be simple and easy to follow.

```css
body {
    background-color: #2f2f2f;
    color: white;
    font-family: Arial, sans-serif;
}

.add-task input {
    padding: 8px;
    margin: 5px;
    background-color: #333;
    color: white;
}

.task {
    display: flex;
    justify-content: space-between;
    background-color: #444;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
}
```

- **Body**: Sets a dark theme for the background and white text for contrast.
- **Input Fields**: The task input fields and buttons have a simple, clean look.
- **Task Items**: Each task has some nice padding and spacing to make it visually appealing.

---

### 3. JavaScript Logic

Now the fun part—JavaScript! It’s what makes the app interactive. Let's go through the main functions:

#### Setting Up Local Storage

Before we do anything, we make sure to use local storage. This lets us save tasks even when the page is refreshed.

```javascript
const AppKey = "taskTrackerData";

if (!localStorage.getItem(AppKey)) {
    localStorage.setItem(AppKey, JSON.stringify({}));
}
```

- **localStorage**: If we don't already have tasks saved, we set up an empty object to hold them.

---

#### Adding a Task

When you add a task, we grab the input, save it, and update the list. Here’s the code:

```javascript
const addTask = () => {
    const newTask = document.getElementById("new-task").value.trim();
    if (newTask) {
        const tasks = JSON.parse(localStorage.getItem(AppKey));
        const newKey = Date.now();
        tasks[newKey] = { task: newTask, isCompleted: false };
        localStorage.setItem(AppKey, JSON.stringify(tasks));
        renderTasks();
    }
}
```

- **addTask**: It gets the task, adds it to local storage, and then re-renders the task list.

---

#### Rendering Tasks

We need a way to display the tasks. This function grabs everything from local storage and puts them on the page.

```javascript
const renderTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(AppKey));
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";
    for (let key in tasks) {
        const task = tasks[key];
        const li = document.createElement("li");
        li.classList.add("task");
        li.innerHTML = `
            <span>${task.task}</span>
            <button onclick="deleteTask(${key})">Delete</button>
        `;
        taskList.appendChild(li);
    }
}
```

- **renderTasks**: Loops through all tasks and creates a list of them. Each task has a delete button attached.

---

#### Deleting a Task

Finally, we need a way to remove tasks when they’re no longer needed. Here's the code for that:

```javascript
const deleteTask = (taskKey) => {
    const tasks = JSON.parse(localStorage.getItem(AppKey));
    delete tasks[taskKey];
    localStorage.setItem(AppKey, JSON.stringify(tasks));
    renderTasks();
}
```

- **deleteTask**: This function removes a task from local storage and updates the list after the deletion.

---

## Technologies Used
- **HTML**: I used HTML to structure the app (it’s the skeleton!).
- **CSS**: Designed the look of the app with some styling.
- **JavaScript**: Brought the app to life by handling interactions like adding, deleting, and saving tasks.

## Project URL
You can check out the live version of the app here:  
[Live Project on GitHub](https://github.com/your-username/task-tracker)

---

That's all, folks! 😄

I hope this project helps you get a better understanding of how web apps work. It’s a small project, but it covers some big concepts. If you have any questions or want to learn more, feel free to ask. Happy coding! 👨‍💻👩‍💻

---