flatpickr("#todo-date", {
  dateFormat: "Y-m-d",
  minDate: "today",
  disableMobile: true,
  theme: "dark",
});

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
showItems();

function additems() {
  const inputElement = document.querySelector("#todo-input");
  const dateElement = document.querySelector("#todo-date");
  const todoInput = inputElement.value.trim();
  const todoDate = dateElement.value;
  if (!todoInput) return;
  todoList.push({ item: todoInput, DueDate: todoDate });
  localStorage.setItem("todoList", JSON.stringify(todoList));
  inputElement.value = "";
  dateElement.value = "";
  showItems(true);
  const addBtn = document.querySelector(".btn-todo");
  addBtn.classList.add("pulse");
  setTimeout(() => addBtn.classList.remove("pulse"), 400);
}

function deleteItem(index) {
  const container = document.querySelector(".todo-container");
  const itemElement = container.children[index];
  itemElement.classList.add("swipe-away");
  setTimeout(() => {
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    showItems();
  }, 500);
}

function showItems(isNew = false) {
  const containerElement = document.querySelector(".todo-container");
  containerElement.innerHTML = "";
  todoList.forEach((todo, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <span>${todo.item}</span>
      <span>${todo.DueDate || ""}</span>
      <button class='btn-delete' onclick="deleteItem(${index})">DELETE</button>
    `;
    if (isNew && index === todoList.length - 1) {
      itemDiv.classList.add("pop-glow");
    } else {
      itemDiv.classList.add("fade-stagger");
      itemDiv.style.animationDelay = `${index * 0.05}s`;
    }
    containerElement.appendChild(itemDiv);
  });
}
