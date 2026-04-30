const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const toDoList = document.getElementById('toDoList');

let editTodo = null;

const getTodos = () => JSON.parse(localStorage.getItem("todos")) || [];

const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = () => {
    const text = inputBox.value.trim();
    if (!text) return alert("write something");

    let todos = getTodos();

    if (addBtn.value === "Edit") {
        todos = todos.map(todo => {
            if (todo.id === editTodo.id) {
                return { ...todo, text };
            }
            return todo;
        });

        addBtn.value = "Add";
        editTodo = null;
    } else {
        todos.push({
            id: Date.now(),
            text,
            completed: false
        });
    }

    saveTodos(todos);
    inputBox.value = "";
    renderTodos();
};

const toggleTodo = (id) => {
    let todos = getTodos();

    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });

    saveTodos(todos);
    renderTodos();
};

const deleteTodo = (id) => {
    let todos = getTodos();

    todos = todos.filter(todo => todo.id !== id);

    saveTodos(todos);
    renderTodos();
};

const startEdit = (todo) => {
    inputBox.value = todo.text;
    addBtn.value = "Edit";
    editTodo = todo;
};

const renderTodos = () => {
    let todos = getTodos();
    toDoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <p style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </p>

            <!-- EDIT BUTTON CHANGED ONLY -->
            <button class="btn editbtn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <!-- DELETE BUTTON SAME AS BEFORE -->
            <button class="btn delbtn">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        li.querySelector("input").addEventListener("change", () => {
            toggleTodo(todo.id);
        });

        li.querySelector(".editbtn").addEventListener("click", () => {
            startEdit(todo);
        });

        li.querySelector(".delbtn").addEventListener("click", () => {
            deleteTodo(todo.id);
        });

        toDoList.appendChild(li);
    });

    updateStats();
};

const updateStats = () => {
    let todos = getTodos();

    document.getElementById("totalTasks").innerText = todos.length;
    document.getElementById("doneTasks").innerText =
        todos.filter(t => t.completed).length;
};

addBtn.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", renderTodos);