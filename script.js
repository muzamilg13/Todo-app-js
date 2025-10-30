let todoList = JSON.parse(localStorage.getItem('todoList')) || []

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

function additems() {
  const inputElement = document.querySelector('#todo-input')
  const dateElement = document.querySelector('#todo-date')
  const todoInput = inputElement.value.trim()
  const todoDate = dateElement.value

  if (!todoInput) return

  todoList.push({ item: todoInput, DueDate: todoDate })
  saveToStorage()
  inputElement.value = ''
  dateElement.value = ''
  showItems(true)
  const addBtn = document.querySelector('.btn-todo')
  addBtn.classList.add('pulse')
  setTimeout(() => addBtn.classList.remove('pulse'), 400)
}

function showItems(animateNew = false) {
  const containerElement = document.querySelector('.todo-container')
  let newHtml = ''
  for (let i = 0; i < todoList.length; i++) {
    const { item, DueDate } = todoList[i]
    newHtml += `
      <div class="fadeStagger ${animateNew && i === todoList.length - 1 ? 'pop-glow' : ''}">
        <span>${item}</span>
        <span>${DueDate || ''}</span>
        <button class="btn-delete" onclick="deleteItem(${i}, this)">DELETE</button>
      </div>`
  }
  containerElement.innerHTML = newHtml
}

function deleteItem(index, btn) {
  const item = btn.parentElement
  item.classList.add('swipe-away')
  setTimeout(() => {
    todoList.splice(index, 1)
    saveToStorage()
    showItems()
  }, 500)
}

showItems()
