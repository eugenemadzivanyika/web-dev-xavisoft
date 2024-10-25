
const taskInputElement = document.querySelector('.new-task-name');
const dueDateInputElement = document.querySelector('.due-date');
const dueTimeInputElement = document.querySelector('.due-time');
const quickTaskInputElement = document.querySelector('.quick-task-box');

// Show modal for adding a new task when the add button is clicked
document.getElementById('add-task-button').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'flex';
});

// Hide the modal when the back button is clicked
document.getElementById('back-button').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'none';
  taskInputElement.value = "";
  dueDateInputElement.value = "";
  dueTimeInputElement.value = "";
  quickTaskInputElement.value = "";
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
  addQuickTaskButton.style.display = quickTaskInput.value ? 'inline-block' : 'none';
});

// Add a quick task when button is clicked
document.getElementById('add-quick-task-button').addEventListener('click', function () {
  addTask();
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

const URL = "http://localhost:3500/todolist";
let toDoList = [];

// Set local to do list equal to server to do list
getToDoList()
  .then((todolist) => {
    toDoList = todolist;
    console.log(toDoList); 
    renderToDoList();
  })
  .catch((err) => console.log(err)); 

// Display all the tasks on the screen
function renderToDoList() {
  let toDOListHTML = '';

  for (let i = 0; i < toDoList.length; i++) {
    const taskObject = toDoList[i];
    const { taskName, dueDate, dueTime, priority } = taskObject;
    let html ='';
    if (taskName && dueDate && dueTime) {
      html = `
      <div class="task">
        <div class="task-details">
          <div>
            <input class="checkbox" type="checkbox" onchange="deleteTask('${taskObject.id}'); renderToDoList();">
          </div>  
          <div>
            <p class="task-name">${taskName}</p>
            <p class="task-time">${dueDate}, ${dueTime}</p>
            <p class="task-type">${priority}</p>
          </div>
        </div>
        <div class="task-buttons">
          <button class="edit-button"
            onclick="editTask('${taskObject.id}');
            renderToDoList();">
            <img class="edit-image" src="./images/edit.png" alt="edit-button">
          </button>

          <button class="trash-button" onclick="
          deleteTask('${taskObject.id}'); renderToDoList();">
            <img class="trash-image" src="./images/delete.png" alt="delete-button">
          </button>
        </div>
      </div>
    `;
    } else {
      html = `
      <div class="task">
        <div class="task-details">
          <div>
            <input class="checkbox" type="checkbox" onchange="deleteTask('${taskObject.id}'); renderToDoList();">
          </div>  
          <div>
            <p class="task-name">${taskName}</p>
          </div>
        </div>
        <div class="task-buttons">
            <button class="edit-button"
            onclick="editTask('${taskObject.id}');
            renderToDoList();">
            <img class="edit-image" src="./images/edit.png" alt="edit-button">
          </button>

          <button class="trash-button" onclick="deleteTask('${taskObject.id}');renderToDoList();">
            <img class="trash-image" src="./images/delete.png" alt="delete-button">
          </button>
        </div>
      </div>
    `;
    }

    toDOListHTML += html;
  }

  document.querySelector('.task-container').innerHTML = toDOListHTML;
}

// Add a new task or edited task to server
function addTask() {
  const taskName = taskInputElement.value || quickTaskInputElement.value;
  const dueDate = dueDateInputElement.value;
  const dueTime = dueTimeInputElement.value;

  if (!taskName) {
    alert('Please add a task name');
    return;
  }

  const isEditing = document.querySelector('.bg-modal').hasAttribute('data-editing-id');
  
  let priority = '';
  if (urgentCheckbox.checked) {
    priority = 'Important';
  } else if (notUrgentCheckbox.checked) {
    priority = 'Not Important';
  }

  const taskData = {
    taskName,
    dueDate: dueDate || '',
    dueTime: dueTime || '',
    priority,
  };

  if (isEditing) {
    const editingId = document.querySelector('.bg-modal').getAttribute('data-editing-id');
    updateTask(editingId, taskData)
      .then(getToDoList)
      .then((todolist) => {
        toDoList = todolist;
        renderToDoList();
      })
      .catch(err => console.log(err));
    document.querySelector('.bg-modal').removeAttribute('data-editing-id');
  } else {
    postData(taskData)
      .then(getToDoList)
      .then((todolist) => {
        toDoList = todolist;
        renderToDoList();
      })
      .catch(err => console.log(err));
  }

  taskInputElement.value = '';
  dueDateInputElement.value = '';
  dueTimeInputElement.value = '';
  urgentCheckbox.checked = false;
  notUrgentCheckbox.checked = false;
  quickTaskInputElement.value = '';
  document.querySelector('.bg-modal').style.display = 'none';
}

// Fetch to do list from server
async function getToDoList() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete task on server
function deleteTask(id) {
  const deleteURL = `${URL}/${id}`;

  fetch(deleteURL, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    toDoList = toDoList.filter(task => task.id !== id);
    renderToDoList();
  })
  .catch((error) => {
    alert('Failed to delete task. Please try again.');
  });
}

// Post data on server
async function postData(taskData) {
  try {
    const response = await fetch(URL, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// edit task on modal
function editTask(id) {
  const task = toDoList.find(task => task.id === id);

  if (task) {
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('.new-task-name').value = task.taskName;

    if (task.dueDate) {
      const [month, day, year] = task.dueDate.split('/');
      document.querySelector('.due-date').value = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else {
      document.querySelector('.due-date').value = '';
    }

    if (task.dueTime) {
      const [hour, minute] = task.dueTime.split('.').map(num => num.padStart(2, '0'));
      document.querySelector('.due-time').value = `${hour}:${minute}`;
    } else {
      document.querySelector('.due-time').value = '';
    }

    urgentCheckbox.checked = task.priority === 'Important';
    notUrgentCheckbox.checked = task.priority === 'Not Important';

    document.querySelector('.bg-modal').setAttribute('data-editing-id', id);

    document.getElementById('add-new-task-button').onclick = function() {
      const editingId = document.querySelector('.bg-modal').getAttribute('data-editing-id');
      const updatedTaskData = {
        taskName: document.querySelector('.new-task-name').value,
        dueDate: document.querySelector('.due-date').value,
        dueTime: document.querySelector('.due-time').value,
        priority: urgentCheckbox.checked ? 'Important' : (notUrgentCheckbox.checked ? 'Not Important' : ''),
      };

      updateTask(editingId, updatedTaskData);
      document.querySelector('.bg-modal').removeAttribute('data-editing-id');
      document.querySelector('.bg-modal').style.display = 'none';
    };
  }
}

// Update task on server
async function updateTask(id, updatedTaskData) {
  const updateURL = `${URL}/${id}`;
  try {
    const response = await fetch(updateURL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTaskData),
    });
    const data = await response.json();
    console.log('Task updated successfully:', data);
    renderToDoList();
  } catch (error) {
    console.error('Error updating task:', error);
    alert('Failed to update task. Please try again.');
  }
}
