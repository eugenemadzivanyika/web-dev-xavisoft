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
        <div>
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
        <div>
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

// Add a new task to the to-do list
function addTask() {
  const taskInputElement = document.querySelector('.new-task-name');
  const dueDateInputElement = document.querySelector('.due-date');
  const dueTimeInputElement = document.querySelector('.due-time');
  const quickTaskInputElement = document.querySelector('.quick-task-box');
  
  const taskName = taskInputElement.value || quickTaskInputElement.value;
  const dueDate = dueDateInputElement.value;
  const dueTime = dueTimeInputElement.value;

  if (taskName && dueDate && dueTime) {

    console.log("task begins posting begins");
    

    let priority = '';
    if (urgentCheckbox.checked) {
      priority = 'Important';
    } else if (notUrgentCheckbox.checked) {
      priority = 'Not Important';
    }

    const taskData = {
      taskName: taskName,
      dueDate: dueDate,
      dueTime: dueTime,
      priority: priority
    };
    
    postData(taskData); 

    taskInputElement.value = "";
    dueDateInputElement.value = "";
    dueTimeInputElement.value = "";
    urgentCheckbox.checked = false;
    notUrgentCheckbox.checked = false;  
  
  } else if (taskName) {

    const taskData = { taskName: taskName };
    postData(taskData);
    quickTaskInputElement.value = "";
    taskInputElement.value = "";
  }else {
    alert('Please Add task name');
  } 
  renderToDoList();
}

// Get to do list from backend
async function getToDoList() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

// Delete task from backend
function deleteTask(id) {
  const deleteURL = URL + "/" + id;

  fetch(deleteURL, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Task deleted:', data);
    toDoList = toDoList.filter(task => task.id !== id);
    renderToDoList();
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Failed to delete task. Please try again.');
  });
}

// Post data to backend
function postData (taskData) {
      fetch(URL, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}


