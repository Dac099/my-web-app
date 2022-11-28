import {createTask, deleteTask, upateTask, getAllTasks} from './todos.controller.js';

const task_btn = document.getElementById('new-task');
const task_title = document.getElementById('task-title');
const tasks_container = document.querySelector('.my-tasks');

const tasks_url = 'https://jsonplaceholder.typicode.com/todos';

function createCardTask(task){
  const task_card = document.createElement('article');
  task_card.classList.add(['card', 'card-task']);

  if(task.completed === false){
    task_card.classList.add('task-uncompleted');
  }else{
    task_card.classList.add('task-completed');
  }

  task_card.dataset.id = task.id;
  task_card.innerHTML = `
    <p class="task-action update-task">&#128397;</p>
    <p class="task-action delete-task">&#128465;</p>
    <p class="task-title">${task.title}</p>
    <p data-status=${task.completed} class="task-action, task-status">
      ${(task.completed) ? '&#9745;' : '&#9744;'}
    </p>
  `;

  task_card.addEventListener('click', (e) => {
    const element = e.target;

    if(element.classList[1] === "update-task"){
      console.log('Update');
    }

    if(element.classList[1] === "delete-task"){
      console.log('Delete');
    }

    if(element.classList[1] === "task-status"){
      console.log(element.dataset.status);
      if(element.dataset.status === "false"){
        // element.dataset.status = "true";
        element.innerHTML = '&#9745;';
        task_card.classList.remove('task-uncompleted')
        task_card.classList.add('task-completed');
      }

      if(element.dataset.status === "true"){
        // element.dataset.status = "false";
        element.innerHTML = '&#9744;';
        task_card.classList.remove('task-completed');
        task_card.classList.add('task-uncompleted');
      }
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

async function createNewTask(){
  try {
    if(task_title.value != ''){

      const task = await createTask(tasks_url, {
        title: task_title.value,
        userId: localStorage.getItem('id'),
        completed: false
      });
      
      task_title.value = '';

      const taskElement = createCardTask(task);

      tasks_container.insertAdjacentElement('afterbegin', taskElement);
    }else{
      alert('An empty task?');
    }
  } catch (error) {
    console.log(error);
  }
}

task_btn.addEventListener('click', createNewTask);

window.onload = async () => {
  try {
    const task_list = await createTaskElements();
    tasks_container.append(...task_list);
  } catch (error) {
    console.log(error);
  }
}