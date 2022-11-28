import {createTask, deleteTask, upateTask, getAllTasks} from './todos.controller.js';

const task_btn = document.getElementById('new-task');
const task_title = document.getElementById('task-title');
const tasks_container = document.querySelector('.my-tasks');

const tasks_url = 'https://jsonplaceholder.typicode.com/todos';

function createCardTask(task){
  const task_card = document.createElement('article');
  task_card.classList.add(['card', 'card-task']);
  task_card.innerHTML = `
    <p id="update-task" class="task-action">&#128397;</p>
    <p id="delete-task" class="task-action">&#128465;</p>
    <p -data-task-id=${task.id}>${task.title}</p>
    <p -data-status=${task.completed} id="task-status" class="task-action">
      ${(task.completed) ? '&#9745;' : '&#9744;'}
    </p>
  `;
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