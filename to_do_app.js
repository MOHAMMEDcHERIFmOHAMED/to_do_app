let addBtn = document.querySelector('.bx');
let input = document.querySelector('.show');
let toDoContainer = document.querySelector('.toDoContainer');
let tasksNBR = document.querySelector('.tasksNBR');
let completeNBR = document.querySelector('.completeNBR');

addBtn.onclick = addToList;

let tasks_count = 0;
let complete_count = 0;

// Load tasks from local storage
let arr = JSON.parse(localStorage.getItem("TASKS")) || [];
loadData();

// Function to load data from local storage
function loadData() {
    tasks_count = arr.length;
    updateTaskCount();
    for (task of arr) {
        let table = `
        <div data-id="${task.ID}" class="mession ${task.complet ? 'completed' : ''}">
            <p p-id="${task.ID}">${task.textvalue}</p>
            <button data-id="${task.ID}" class="rmBtn">delete</button>
        </div>
        `;
        toDoContainer.innerHTML += table;
        if (task.complet) {
            complete_count++;
        }
    }
    updateCompletedTaskCount();
}

// Add tasks to list
function addToList() {
    let textvalue = input.value;
    let data;
    if (textvalue != "") {
        let ID = Date.now();
        let table = `
        <div data-id="${ID}" class="mession">
            <p p-id="${ID}">${textvalue}</p>
            <button data-id="${ID}" class="rmBtn">delete</button>
        </div>
        `;
        tasks_count++;
        updateTaskCount();
        toDoContainer.innerHTML += table;
        input.value = '';
        data = { ID, textvalue, complet: false };
        arr.push(data);
        localStorage.setItem("TASKS", JSON.stringify(arr));
    }
}

// Update tasks number
function updateTaskCount() {
    tasksNBR.innerHTML = `${tasks_count}`;
}

// Update completed task number
function updateCompletedTaskCount() {
    completeNBR.innerHTML = `${complete_count}`;
}

// Event listener for marking tasks as done or deleting them
toDoContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'P') {
        let ID = event.target.parentElement.getAttribute('data-id');
        doneMession(ID);
    } else if (event.target.classList.contains('rmBtn')) {
        let ID = event.target.getAttribute('data-id');
        deleteTask(ID);
    }
});

// Delete task
function deleteTask(ID) {
    let taskElement = document.querySelector(`[data-id="${ID}"]`);
    if (taskElement) {
        if (taskElement.classList.contains('completed')) {
            complete_count--;
            updateCompletedTaskCount();
        }
        taskElement.remove();
        tasks_count--;
        updateTaskCount();
        arr = arr.filter(task => task.ID != ID);
        localStorage.setItem("TASKS", JSON.stringify(arr));
    }
}

// Mark task as done
function doneMession(ID) {
    let taskElement = document.querySelector(`[data-id="${ID}"]`);
    if (taskElement.classList.contains('completed')) {
        for (let task of arr) {
            if (task.ID == ID) {
                task.complet = false;
            }
        }
        taskElement.classList.remove('completed');
        complete_count--;
    } else {
        for (let task of arr) {
            if (task.ID == ID) {
                task.complet = true;
            }
        }
        taskElement.classList.add('completed');
        complete_count++;
    }
    updateCompletedTaskCount();
    localStorage.setItem("TASKS", JSON.stringify(arr));
}
