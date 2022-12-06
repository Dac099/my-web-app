import {createTask, deleteTask, upateTask, getAllTasks} from './todos.controller.js';

const task_btn = document.getElementById('new-task');
const task_title = document.getElementById('task-title');
const sectionsCompleted = document.querySelector('.completed-tasks');
const sectionUncompleted = document.querySelector('.uncompleted-tasks');
let controlEmptyTasks = 0;

const tasks_url = 'https://jsonplaceholder.typicode.com/todos';

function createCardTask(task){
  const task_card = document.createElement('article');
  task_card.classList.add('card');
  task_card.classList.add('card-task');

  if(task.completed === false){
    task_card.classList.add('task-uncompleted');
  }else{
    task_card.classList.add('task-completed');
  }

  task_card.dataset.id = task.id;
  task_card.dataset.status = task.completed;
  task_card.innerHTML = `
    <div>
      <p class="task-action update-task">&#128397;</p>
      <p class="task-action delete-task">&#128465;</p>
    </div>
    <p class="task-title">${task.title}</p>
    <p data-status=${task.completed} class="task-action task-status">
      ${(task.completed) ? '&#9745;' : '&#9744;'}
    </p>
  `;

  task_card.addEventListener('click', (e) => {
    const element = e.target;

    if(element.classList[1] === "update-task"){
      updateDOMTask(tasks_url, task_card);
    }

    if(element.classList[1] === "delete-task"){
      task_card.remove();
    }

    if(element.classList[1] === "task-status"){
      let control;

      if(element.dataset.status === "false"){
        element.innerHTML = '&#9745;';
        task_card.classList.remove('task-uncompleted')
        task_card.classList.add('task-completed');
        control = true;
        sectionsCompleted.prepend(task_card);
      }

      if(element.dataset.status === "true"){
        element.innerHTML = '&#9744;';
        task_card.classList.remove('task-completed');
        task_card.classList.add('task-uncompleted');
        control = false;
        sectionUncompleted.prepend(task_card);
      }

      element.dataset.status = (control) ? 'true' : 'false';
    }
  });

  return task_card;
}

async function createTaskElements(){
  try {
    const tasks = await getAllTasks(tasks_url, localStorage.getItem('id'));

    const tasks_elements = tasks.map(task => {
      return createCardTask(task);
    });

    return tasks_elements;
  } catch (error) {
    console.log(error);
  }
}

function appendTasks(tasklist){
  tasklist.forEach(task => {
    if(task.dataset.status === 'false'){
      sectionUncompleted.append(task);
    }else{
      sectionsCompleted.append(task);
    }
  });
}

async function createNewTask(){
  try {
    if(task_title.value != ''){
      controlEmptyTasks = 0;

      const task = await createTask(tasks_url, {
        title: task_title.value,
        userId: localStorage.getItem('id'),
        completed: false
      });
      
      task_title.value = '';

      const taskElement = createCardTask(task);

      sectionUncompleted.insertAdjacentElement('afterbegin', taskElement);
    }else{
      controlEmptyTasks++;

      (controlEmptyTasks > 2) 
      ? alert('Come on, buddy. Just write something.')
      : alert('An empty task?');
    }
  } catch (error) {
    console.log(error);
  }
}

function updateDOMTask(url, taskCard){
  try {
    const taskTitle = taskCard.querySelector('.task-title');
    const taskStatus = taskCard.querySelector('.task-status');
    const updateTaskBtn = document.createElement('button');
    const inputTask = document.createElement('input');

    taskTitle.classList.toggle('update-task--section');
    
    updateTaskBtn.classList.add('update-task--btn');
    updateTaskBtn.type = 'button';
    updateTaskBtn.innerText = 'Update';

    inputTask.type = 'text';
    inputTask.classList.add('input-new-task');
    inputTask.value = taskTitle.innerText;
    inputTask.required = true;
    inputTask.autofocus = true;

    taskTitle.innerHTML = '';
    taskTitle.append(inputTask);
    taskTitle.append(updateTaskBtn);

    updateTaskBtn.addEventListener('click', async () => {
      const taskData = {
        id : taskCard.dataset.id,
        userId : localStorage.getItem('id'),
        title : inputTask.value,
        completed : (taskStatus.dataset.status === 'true') ? false : true
      };

      if(parseInt(taskCard.dataset.id) < 200){
        const updatedTask = await upateTask(url, taskCard.dataset.id, taskData);
        taskTitle.innerHTML = `
          <p class="task-title">${updatedTask.title}</p>
        `;
      }else{
        taskTitle.innerHTML = `
          <p class="task-title">${inputTask.value}</p>
        `;
      }

      taskTitle.classList.toggle('update-task--section');
    });

  } catch (error) {
    console.log(error);
  }
}

task_btn.addEventListener('click', createNewTask);

window.onload = async () => {
  try {
    const task_list = await createTaskElements();
    appendTasks(task_list);
  } catch (error) {
    console.log(error);
  }
}