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




}

