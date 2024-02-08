import Task from './task';

console.log('app.js bundled');

function saveStateToLocalStorage() {
  const containers = Array.from(document.querySelectorAll('.items'));
  const state = containers.map(container => {
    const tasks = Array.from(container.querySelectorAll('.item')).map(task => task.textContent);
    return { id: container.id, tasks };
  });
  localStorage.setItem('containersState', JSON.stringify(state));
}

// Функция для загрузки состояния из LocalStorage
function loadStateFromLocalStorage() {
  const state = JSON.parse(localStorage.getItem('containersState')) || [];
  state.forEach(containerState => {
    const container = document.getElementById(containerState.id);
    if (container) {
      const ul = container.querySelector('.items');
      ul.innerHTML = ''; // Очистим список перед добавлением задач
      containerState.tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.className = 'item menu';
        li.textContent = taskText;
        ul.appendChild(li);
      });
    }
  });
}

loadStateFromLocalStorage();

const container = document.querySelector('.container')


function editTask(element) {

  const inputEl = document.createElement('textarea');
  const buttonsRow = document.createElement('div');
  const addButton = document.createElement('button');
  const closeButton = document.createElement('div');

  element.classList.remove('menu');
  const text = element.textContent;
  if (text) {
    inputEl.value = text;
    element.textContent = '';
  }
  buttonsRow.className = 'buttons-row';
  inputEl.className = 'input';
  addButton.textContent = 'Save Task';
  closeButton.innerHTML = '✕';
  closeButton.className = 'close';

  element.appendChild(inputEl)
  buttonsRow.appendChild(addButton);
  buttonsRow.appendChild(closeButton);
  element.appendChild(buttonsRow);

  container.removeEventListener('dblclick', taskHandler)

  addButton.addEventListener('click', (event) => {
    const itemEl = event.target.closest('.item');
    if (itemEl) {
      const text = itemEl.querySelector('.input').value.trim()
      if (text) {
        element.innerHTML = '';
        element.textContent = text;
        element.classList.add('menu');
        container.addEventListener('click', taskHandler);

      }
    }
  });

  closeButton.addEventListener('click', () => {
     if (text) {

       element.innerHTML = '';
       element.textContent = text;
       element.classList.add('menu');

     } else {
       element.remove();
     }
     container.addEventListener('click', taskHandler);
    saveStateToLocalStorage();
    })

}

function addTask (column){

  const newTask = document.createElement('li');
  newTask.classList.add("item");

  column.querySelector('ul').appendChild(newTask)
  editTask(newTask);
}


const taskHandler = (event) => {
  if (event.target.classList.contains('add-card-link')) {
    addTask(event.target.parentElement);
  } else if (event.target.classList.contains('item')) {
    editTask(event.target)
  }
}

container.addEventListener('dblclick', taskHandler);


let draggedEl;

const onMouseOver = (event) => {
  console.log('draggedEl',draggedEl)

  // draggedEl.style.zIndex = 9999;
  // draggedEl.style.position = 'absolute';
  draggedEl.style.top = event.clientY + 'px';
  draggedEl.style.left = event.clientX + 'px';
};
const onMouseUp = (event) => {
  const mouseupItem = event.target;

  console.log('mouseupItem', mouseupItem)
  if (mouseupItem.classList.contains('item')) {
    const items = mouseupItem.closest('.items')
    items.insertBefore(draggedEl, mouseupItem)
    console.log('items', items)
  }
  draggedEl.classList.remove('dragged');
  draggedEl.removeAttribute('style');
  draggedEl = undefined;

  document.documentElement.removeEventListener('mouseup', onMouseUp)
  document.documentElement.removeEventListener('mouseover', onMouseOver)
};

container.addEventListener('mousedown', (event) => {
  event.preventDefault()
  console.log(event.target)
  draggedEl = event.target;
  if(draggedEl.classList.contains('item')) {
    draggedEl.classList.add('dragged')
    // debugger;
    document.documentElement.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseover', onMouseOver)
  }


});
