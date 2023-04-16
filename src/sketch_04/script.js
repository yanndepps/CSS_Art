// init references
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

// on window load
window.onload = () => {
	updateNote = "";
	count = Object.keys(localStorage).length;
	displayTasks();
}

// display tasks
const displayTasks = () => {
	if (Object.keys(localStorage).length > 0) {
		tasksDiv.style.display = "inline-block";
	} else {
		tasksDiv.style.display = "none";
	}

	// clear task
	tasksDiv.innerHTML = "";

	// fetch all keys in LS
	let tasks = Object.keys(localStorage);
	tasks = tasks.sort();

	for (let key of tasks) {
		let classValue = "";
		// get all values
		let value = localStorage.getItem(key);
		let taskInnerDiv = document.createElement("div");
		taskInnerDiv.classList.add("task");
		taskInnerDiv.setAttribute("id", key);
		taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

		// parse boolean back to boolean
		let editButton = document.createElement("button");
		editButton.classList.add("edit");
		editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
		if (!JSON.parse(value)) {
			editButton.style.visibility = "visible";
		} else {
			editButton.style.visibility = "hidden";
			taskInnerDiv.classList.add("completed");
		}
		taskInnerDiv.appendChild(editButton);
		taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></button>`;
		tasksDiv.appendChild(taskInnerDiv);
	}
};

// disable edit button
const disableBtns = (bool) => {
	let editBtns = document.getElementsByClassName("edit");
	Array.from(editBtns).forEach(el => {
		el.disabled = bool;
	});
};

// rm task from local storage
const rmTask = (taskValue) => {
	localStorage.removeItem(taskValue);
	displayTasks();
};

// add tasks to LS
const updateStorage = (index, taskValue, completed) => {
	localStorage.setItem(`${index}_${taskValue}`, completed);
	displayTasks();
};

// add new task to LS
document.querySelector("#push").addEventListener("click", () => {
	// enable edit btn
	disableBtns(false);
	if (newTaskInput.value.length == 0) {
		alert("Please enter a task!");
	} else {
		// store and display from LS
		if (updateNote == "") {
			// new task
			updateStorage(count, newTaskInput.value, false);
		} else {
			// update task
			let existingCount = updateNote.split("_")[0];
			rmTask(updateNote);
			updateStorage(existingCount, newTaskInput.value, false);
			updateNote = "";
		}
		count += 1;
		newTaskInput.value = "";
	}
});
