const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
//const filterOption = document.querySelector('.filter-todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//filterOption.addEventListener("click", filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

function addTodo(e) {


    e.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to local localStorage
    saveLocalTodos(todoInput.value);
    //completebutton
    const completedButton = document.createElement('button');
    completedButton.innerHTML = ' <i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = ' <i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //clear input
    todoInput.value = "";
}


function deleteCheck(e) {
    const item = e.target;


    //delete
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animantion
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //check
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}



function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //completebutton
        const completedButton = document.createElement('button');
        completedButton.innerHTML = ' <i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = ' <i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);

    });
}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));

}