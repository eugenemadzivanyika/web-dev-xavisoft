// Show modal for adding a new task when the add button is clicked
document.getElementById('add-task-button').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'flex';
});

// Hide the modal when the back button is clicked
document.getElementById('back-button').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'none';
});

// Add the new task and close modal
document.getElementById('add-new-task-button').addEventListener('click', function () {
  addTask();
  document.querySelector('.bg-modal').style.display = 'none';
});

// Change visibility of quick task button based on input focus
const quickTaskInput = document.getElementById('quick-task-box');
const addQuickTaskButton = document.querySelector('.add-quick-task-button');

quickTaskInput.addEventListener('focus', function () {
  addQuickTaskButton.style.display = 'inline-block';
});

quickTaskInput.addEventListener('blur', function () {
  if (!quickTaskInput.value) {
    addQuickTaskButton.style.display = 'none';
  }
});

quickTaskInput.addEventListener('input', function () {
  if (quickTaskInput.value) {
    addQuickTaskButton.style.display = 'inline-block';
  } else {
    addQuickTaskButton.style.display = 'none';
  }
});

// Add a quick task when button is clicked
document.getElementById('add-quick-task-button').addEventListener('click', function () {
  addQuickTask();
});

// Handle priority checkbox selection
const urgentCheckbox = document.getElementById('urgent-checkbox');
const notUrgentCheckbox = document.getElementById('not-urgent-checkbox');

urgentCheckbox.addEventListener('change', function() {
  if (urgentCheckbox.checked) {
    notUrgentCheckbox.checked = false;
  }
});

notUrgentCheckbox.addEventListener('change', function() {
  if (notUrgentCheckbox.checked) {
    urgentCheckbox.checked = false;
  }
});

// Dummy data to display at the beginning
const toDoList = [
  { taskName: 'eat', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Urgent' },
  { taskName: 'sleep', dueDate: '10/17/2024', dueTime: '23.00', priority: 'Not urgent' }
];

const quickTaskList = ['pray', 'read bible'];

renderToDoList();

// Display all the tasks on the screen
function renderToDoList() {
  let toDOListHTML = '';
  let quickTaskHTML = '';
  let finalHTML = '';

  const sortedToDoList = toDoList.sort((a, b) => {
    if (a.priority === 'Urgent' && b.priority !== 'Urgent') {
      return -1; 
    } else if (a.priority !== 'Urgent' && b.priority === 'Urgent') {
      return 1;  
    } else {
      return 0; 
    }
  });

  for (let i = 0; i < sortedToDoList.length; i++) {
    const taskObject = sortedToDoList[i];
    const { taskName, dueDate, dueTime, priority } = taskObject;

    const html = `
      <div class="task">
        <div class="task-details">
          <div>
            <input class="checkbox" type="checkbox" onchange="handleCheckboxChange(this, toDoList, ${i})">
          </div>  
          <div>
            <p class="task-name">${taskName}</p>
            <p class="task-time">${dueDate}, ${dueTime}</p>
            <p class="task-type">${priority}</p>
          </div>
        </div>
        <div>
          <button class="trash-button" onclick="toDoList.splice(${i}, 1); renderToDoList();">
            <img class="trash-image" src="./images/delete.png" alt="delete-button">
          </button>
        </div>
      </div>
    `;

    toDOListHTML += html;
  }

  for (let j = 0; j < quickTaskList.length; j++) {
    const task = quickTaskList[j];
    const quickTaskHtml = `
      <div class="task">
        <div class="task-details">
          <div>
            <input class="checkbox" type="checkbox" onchange="handleCheckboxChange(this, quickTaskList, ${j})">
          </div>  
          <div>
            <p class="task-name">${task}</p>
          </div>
        </div>
        <div>
          <button class="trash-button" onclick="quickTaskList.splice(${j}, 1); renderToDoList();">
            <img class="trash-image" src="./images/delete.png" alt="delete-button">
          </button>
        </div>
      </div>
    `;

    quickTaskHTML += quickTaskHtml;
  }

  finalHTML = toDOListHTML + quickTaskHTML;
  document.querySelector('.task-container').innerHTML = finalHTML;
}

// Add a new task to the to-do list
function addTask() {
  const taskInputElement = document.querySelector('.new-task-name');
  const dueDateInputElement = document.querySelector('.due-date');
  const dueTimeInputElement = document.querySelector('.due-time');

  const taskName = taskInputElement.value;
  const dueDate = dueDateInputElement.value;
  const dueTime = dueTimeInputElement.value;

  let priority = '';
  if (urgentCheckbox.checked) {
    priority = 'Urgent';
  } else if (notUrgentCheckbox.checked) {
    priority = 'Not Urgent';
  }

  toDoList.push({ taskName: taskName, dueDate: dueDate, dueTime: dueTime, priority: priority });
  
  taskInputElement.value = "";
  dueDateInputElement.value = "";
  dueTimeInputElement.value = "";
  urgentCheckbox.checked = false;
  notUrgentCheckbox.checked = false;

  renderToDoList(); 
}

// Add a new quick task to the quick task list
function addQuickTask() {
  const quickTaskInputElement = document.querySelector('.quick-task-box');
  const quickTask = quickTaskInputElement.value;

  quickTaskList.push(quickTask);
  quickTaskInputElement.value = "";
  renderToDoList(); 
}

// Delete task when checkbox for finished is checked
function handleCheckboxChange(checkbox, taskList, index) {
  if (checkbox.checked) {
    setTimeout(() => {
      taskList.splice(index, 1);
      renderToDoList();
    }, 800);
  }
}
