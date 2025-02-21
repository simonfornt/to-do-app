const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() {
    const task = todoInput.value.trim();
    if (task === '') {
        alert('Please enter a task!');
        return;
    }

    const date = new Date().toLocaleDateString(); // Format: "MM/DD/YYYY"

    const li = document.createElement('li');
    li.className = 'flex items-center justify-between p-2 border rounded';
    li.innerHTML = `
        <span class="serial font-bold"></span> 
        <span class="flex-grow task-text">${task}</span>
        <span class="text-sm text-gray-500">${date}</span>
        <div class="flex space-x-2">
            <button class="editButton bg-yellow-300 hover:bg-yellow-400 p-1 rounded">Edit</button>
            <button class="deleteButton bg-red-500 hover:bg-red-700 text-white p-1 rounded">Delete</button>
        </div>
    `;

    // Add new task at the top
    todoList.prepend(li);

    saveTodos(); // Save updated list to localStorage
    todoInput.value = '';
    todoInput.focus();
    addEventListeners(li);
    updateSerialNumbers(); // Update serial numbers
}

function editTodo(li) {
    const taskText = li.querySelector('.task-text');
    const originalText = taskText.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    input.className = 'flex-grow border p-1 rounded';

    taskText.replaceWith(input);
    input.focus();

    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            alert('Task cannot be empty!');
            input.focus();
        } else {
            taskText.textContent = input.value.trim();
            input.replaceWith(taskText);
            saveTodos(); // Save changes to localStorage
        }
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (input.value.trim() === '') {
                alert('Task cannot be empty!');
                input.focus();
            } else {
                taskText.textContent = input.value.trim();
                input.replaceWith(taskText);
                saveTodos(); // Save changes to localStorage
            }
        }
    });
}

function deleteTodo(li) {
    li.remove();
    saveTodos(); // Save updated list after deleting an item
    updateSerialNumbers(); // Update serial numbers
}

function addEventListeners(li) {
    const editButton = li.querySelector('.editButton');
    const deleteButton = li.querySelector('.deleteButton');

    editButton.addEventListener('click', () => editTodo(li));
    deleteButton.addEventListener('click', () => deleteTodo(li));
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todoList li').forEach((li) => {
        const taskText = li.querySelector('.task-text').textContent;
        const date = li.querySelector('.text-sm').textContent;
        todos.unshift({ taskText, date }); // Save in reverse order so new tasks stay on top
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(({ taskText, date }) => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-2 border rounded';
        li.innerHTML = `
            <span class="serial font-bold"></span> 
            <span class="flex-grow task-text">${taskText}</span>
            <span class="text-sm text-gray-500">${date}</span>
            <div class="flex space-x-2">
                <button class="editButton bg-yellow-300 hover:bg-yellow-400 p-1 rounded">Edit</button>
                <button class="deleteButton bg-red-500 hover:bg-red-700 text-white p-1 rounded">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
        addEventListeners(li);
    });
    updateSerialNumbers(); // Update serial numbers after loading
}

function updateSerialNumbers() {
    document.querySelectorAll('#todoList li').forEach((li, index) => {
        li.querySelector('.serial').textContent = `${index + 1}. `;
    });
}

addButton.addEventListener('click', () => addTodo());
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});