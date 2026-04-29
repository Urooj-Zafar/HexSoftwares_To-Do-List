const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const toDoList = document.getElementById('toDoList');

let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if(inputText.length <=0 ){
        alert("write something ");
        return;
    }

    if(addBtn.value === "Edit"){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocaltodos(editTodo.oldValue, inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editbtn");
    li.appendChild(editBtn);
 
    const delBtn = document.createElement("button");
    delBtn.innerText = "Remove";
    delBtn.classList.add("btn" , "delbtn");
    li.appendChild(delBtn);

    toDoList.appendChild(li);
    inputBox.value = "";

    saveLocalStorage(inputText);
    }
}
const updateTodo = (e) =>{
        if(e.target.innerHTML === "Remove"){
        toDoList.removeChild(e.target.parentElement);
        delLocaltodo(e.target.parentElement);
    }

        if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
        editTodo.oldValue = e.target.previousElementSibling.innerHTML;
    }
        
}

const saveLocalStorage = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];
    } 
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

const getLocalTodos = () =>{
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];
    } 
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editbtn");
        li.appendChild(editBtn);
    
        const delBtn = document.createElement("button");
        delBtn.innerText = "Remove";
        delBtn.classList.add("btn" , "delbtn");
        li.appendChild(delBtn);

        toDoList.appendChild(li);
        });
    }
}

const delLocaltodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    let todoText = todo.children[0].innerHTML;
    let index = todos.indexOf(todoText);

    if (index !== -1) {
        todos.splice(index, 1);
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocaltodos = (oldValue, newValue) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    let index = todos.indexOf(oldValue);
    if (index !== -1) {
        todos[index] = newValue;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click' , addTodo);
toDoList.addEventListener('click' , updateTodo)