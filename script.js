const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addButton");
const todoList = document.querySelector("#todoList");     // storing html variable//


document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo(){
    const task = todoInput.value.trim();
    if(task === ""){
        alert("Pleace enter Your todo");
        return;
    }

    const date = new Date().toLocaleDateString(); // add date 

    const li = document.createElement("li");
    li.className = "flex items-center justify-between p-2 border rounded";
    li.innerHTML = 
    <span class="serial font-bold"></span> 
    <span class="flex-grow task-text">${task}</span>                          // create elemnet
    <span class="text-sm text-gray-500">${date}</span>
    <div class="flex space-x-2">
        <button class="editButton bg-yellow-300 hover:bg-yellow-400 p-1 rounded">Edit</button>
        <button class="deleteButton bg-red-500 hover:bg-red-700 text-white p-1 rounded">Delete</button>
    </div>
;

todoList.prepend(li); // add new task at the top

saveTodos(){
    todoInput.value = "";
    todoInput.focus();
    addEventListener(li);          // save functionality
    updateSerialNumbers();
}

function editTodo(li){
    const taskText = li.querySelector(".task-text");
    const originalText = taskText.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    input.className = 'flex-grow border p-1 rounded';
    
    taskText.replaceWith(input);
    input.focus();


    input.addEventListener('blur', () =>{
        if(input.value.trim() ===""){
            alert('Can not be empty');            // add edit button
            input.focus();
        }else{
            taskText.textContent = input.value.trim();
            input.replaceWith(taskText);
            saveTodos();
        }
    });
}

 function deleteTodo(li){
    li.remove();                   // create delete btn
    saveTodos();
    updateSerialNumbers();
 }

 function addEventListener(li){
    const editButton = li.querySelector('.editButton');
    const deleteButton = li.querySelector('.deleteButton');

    editButton.addEventListener('click',() => editTodo(li));
    deleteButton.addEventListener('click',() => deleteTodo(li));
 }

 function saveTodos(){
    const todos = [];
    document.querySelectorAll('#todoList li').forEach((li) => {
        const taskText = li.querySelector('.task-text').textContent;   
        const date = li.querySelector('.text-sm').textContent;
        todos.unshift({taskText, date});
    });
    localStorage.setItem('todos', JSON.stringify(todos));
 }
 function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(({ taskText, date }) => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-2 border rounded';
        li.innerHTML = 
            <span class="serial font-bold"></span> 
            <span class="flex-grow task-text">${taskText}</span>
            <span class="text-sm text-gray-500">${date}</span>
            <div class="flex space-x-2">
                <button class="editButton bg-yellow-300 hover:bg-yellow-400 p-1 rounded">Edit</button>
                <button class="deleteButton bg-red-500 hover:bg-red-700 text-white p-1 rounded">Delete</button>
            </div>
        ;
        todoList.appendChild(li);
        addEventListener(li);
    })
    updateSerialNumbers()
}
 function updateSerialNumbers(){
    document.querySelectorAll('#todList li').forEach((li, index) => {
        li.querySelector('.serial').textContent = ${index + 1}. ;
    });
 }

}