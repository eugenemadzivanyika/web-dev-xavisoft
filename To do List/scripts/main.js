// fetch('header.html')
// .then(response => response.text())
// .then(data => {
//   document.getElementById('header').innerHTML = data;
//   document.getElementById('page-title').textContent = "To Do List";
// });

document.getElementById('add-task-button').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'flex';
});

document.getElementById('back-button').addEventListener('click', function () {
  document.querySelector('.bg-modal').style.display = 'none';
});

document.getElementById('add-new-task-button').addEventListener('click', function () {
  addTask();
  document.querySelector('.bg-modal').style.display = 'none';
});

// document.getElementById('quick-task-box').addEventListener('focus', function () {
//   document.querySelector('.add-quick-task-button').style.display = 'inline-block';
// });

// document.getElementById('quick-task-box').addEventListener('blur', function () {
//   document.querySelector('.add-quick-task-button').style.display = 'none';
// });

document.getElementById('add-quick-task-button').addEventListener('click', function () {
  addQuickTask();
});


const toDoList = [ {taskName: 'eat', dueDate: '10/17/2024', dueTime: '23.00'}, {taskName:'sleep',dueDate:'10/17/2024', dueTime:'23.00'}];

const quickTaskList = ['pray', 'read bible'];

renderToDoList();

function renderToDoList() {
  let toDOListHTML = '';

  let quickTaskHTML = '';

  let finalHTML= '';

  for (let i = 0; i < toDoList.length; i++) {
    const taskObject = toDoList[i];
    const {taskName, dueDate, dueTime}  = taskObject;
    const html = `
      <div class="task">
        <div class="task-details">
          <div>
            <input class="checkbox" type="checkbox"
              onclick="
              toDoList.splice(${i},1);
              renderToDoList();">
          </div>  
          <div>
            <p class="task-name">${taskName}</p>
            <p class="task-time">${dueDate}, ${dueTime}</p>
            <p class="task-type">Personal</p>
          </div>
        </div>
        <div>
        <button class="trash-button" 
           onclick="
            toDoList.splice(${i},1);
            renderToDoList();">
          <img class="trash-image" src="/images/trash-can.png" alt="delete"></button>
        </div>
      </div>
    `;

    toDOListHTML += html;
    // console.log(toDOListHTML);
  }

  for (let j = 0; j < quickTaskList.length; j++) {
    const task = quickTaskList[j];
    const quickTaskHtml = `
      <div class="task">
        <div class="task-details">
          <div>
            <input class="checkbox" type="checkbox"
              onclick="
              quickTaskList.splice(${j},1);
              renderToDoList();">
          </div>  
          <div>
            <p class="task-name">${task}</p>
          </div>
        </div>
        <div>
        <button class="trash-button" 
           onclick="
            quickTaskList.splice(${j},1);
            renderToDoList();">
          <img class="trash-image" src="/images/trash-can.png" alt="delete"></button>
        </div>
      </div>
    `;

    quickTaskHTML += quickTaskHtml;
    
  }

  finalHTML = toDOListHTML + quickTaskHTML;
  console.log(finalHTML);
  document.querySelector('.task-container')
    .innerHTML = finalHTML;
}
 
function addTask() {
  const taskInputElement = document.querySelector('.new-task-name');
  const dueDateInputElement = document.querySelector('.due-date');
  const dueTimeInputElement = document.querySelector('.due-time');

  const taskName = taskInputElement.value;
  const dueDate = dueDateInputElement.value;
  const dueTime = dueTimeInputElement.value;
  

  toDoList.push({taskName: taskName, dueDate: dueDate, dueTime: dueTime});
  console.log(toDoList);
  taskInputElement.value = "";
  dueDateInputElement.value = "";
  dueTimeInputElement.value = "";

  renderToDoList(); 
}

function addQuickTask() {
  const quickTaskInputElement = document.querySelector('.quick-task-box');

  const quickTask = quickTaskInputElement.value;

  quickTaskList.push(quickTask);
  console.log(quickTaskList);

  quickTaskInputElement.value = "";
  renderToDoList(); 
}