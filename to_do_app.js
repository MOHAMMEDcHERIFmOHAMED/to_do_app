let addBtn = document.querySelector('.bx');
let input = document.querySelector('.show');
let toDoContainer = document.querySelector('.toDoContainer');
let tasksNBR = document.querySelector('.tasksNBR');
let completeNBR = document.querySelector('.completeNBR');

addBtn.onclick = addToList;

let tasks_count = 0;
let complete_count = 0;

// Add tasks to list
function addToList() {
    let textvalue = input.value;
    let ID = Date.now();
    let table = `
    <div data-id="${ID}" class="mession">
        <p>${textvalue}</p>
        <button data-id="${ID}" class="rmBtn">delete</button>
    </div>
    `;
    tasks_count++;
    updateTaskCount();
    toDoContainer.innerHTML += table;
    input.value = '';
}

// Update tasks number
function updateTaskCount() {
    tasksNBR.innerHTML = `${tasks_count}`;
}

// Update completed task number
function updateCompletedTaskCount() {
    completeNBR.innerHTML = `${complete_count}`;
}

// Missions done
toDoContainer.addEventListener('click', function(event) {
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
        if (taskElement.querySelector('p').style.textDecoration === "line-through") {
            complete_count--;
            completeNBR.innerHTML = `${complete_count}`;
        }
        taskElement.remove();
        tasks_count--;
        updateTaskCount();
    }
}

// Mark mission as done
function doneMession(ID) {
    let taskElement = document.querySelector(`[data-id="${ID}"]`);

    if (taskElement.classList.contains('completed')) {
        taskElement.classList.remove('completed');
        complete_count--;
        completeNBR.innerHTML = `${complete_count}`;
    } else {
        taskElement.classList.add('completed');
        complete_count++;
      completeNBR.innerHTML = `${complete_count}`;
    }
}

