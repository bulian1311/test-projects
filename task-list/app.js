'use-strict';

const form = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const taskClear = document.querySelector('#task-clear');
const taskFilter = document.querySelector('#task-filter');
const taskInput = document.querySelector('#task-input');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  taskClear.addEventListener('click', clearTasks);
  taskFilter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'btn btn-outline-danger ml-5';
    link.innerText = 'Удалить';

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(event) {
  if (taskInput.value === '') {
    alert('Введите значение!');
    return false;
  }
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'btn btn-outline-danger ml-5';
  link.appendChild(document.createTextNode('Удалить'));

  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

  event.preventDefault();
}

function removeTask(event) {
  if (
    event.target.classList.contains('btn-outline-danger') &&
    confirm('Вы уверены?')
  ) {
    event.target.parentElement.remove();
    removeTaskFromLocalStorage(event.target.parentElement);
  }
}

function clearTasks(event) {
  //taskList.innerHTML = '';

  if (confirm('Вы уверены?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  clearTasksFromLocalStorage();
}

function filterTasks(event) {
  const text = event.target.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(task => {
    const item = task.firstChild.textContent.toLowerCase();

    if (item.indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.firstChild.data === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}
