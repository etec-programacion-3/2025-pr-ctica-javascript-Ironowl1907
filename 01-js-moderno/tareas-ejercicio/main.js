// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  getTasks().forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = task;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const newTask = prompt('Editar tarea:', task);
      if (newTask && newTask.trim()) {
        removeTask(idx);
        addTask(newTask.trim());
        renderTasks();
      }
    };
    li.appendChild(editBtn);

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.startsWith('✓') ? 'Desmarcar' : 'Completar';
    completeBtn.onclick = () => {
      const updatedTask = task.startsWith('✓')
        ? task.substring(2)
        : '✓ ' + task;
      removeTask(idx);
      addTask(updatedTask);
      renderTasks();
    };
    li.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
      removeTask(idx);
      renderTasks();
    };
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// Maneja el evento submit del formulario para agregar una tarea
form.onsubmit = e => {
  e.preventDefault();
  if (input.value.trim()) {
    addTask(input.value.trim());
    input.value = '';
    renderTasks();
  }
};

// Render inicial de las tareas
renderTasks();
