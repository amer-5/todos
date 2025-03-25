const inputField = document.getElementById("inputField");
const submitButton = document.getElementById("submitButton");
const outputField = document.getElementById("todos");

const getTodos = async () => {
  const response = await fetch("http://localhost:3000/", {
    headers: { authorization: "Mojtoken" },
  });
  const todos = await response.json();

  outputField.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.innerText = todo.text;
    todoElement.setAttribute("id", todo.id);
    todoElement.addEventListener("dblclick", async () => {
      const delResponse = await fetch(
        `http://localhost:3000/${todoElement.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      getTodos();
    });
  });
};

const createTodo = async () => {
  let inputValue = inputField.value;

  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: inputValue }),
  });

  const data = await response.json();
  console.log(data.todo.id);

  const todoElement = document.createElement("div");
  todoElement.innerText = inputValue;
  todoElement.setAttribute("id", data.todo.id);
  outputField.appendChild(todoElement);
  inputField.value = "";
};

document.addEventListener("DOMContentLoaded", getTodos);
submitButton.addEventListener("click", createTodo);
