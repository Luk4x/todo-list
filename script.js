let input = document.getElementById('main-input')
let btn = document.getElementById('btn-addc')
let task = document.getElementById('task-id')
let taskArray = []
let tasklist = document.getElementById('tasks')
reloadTasks()

btn.addEventListener('click', addTask)
btn.addEventListener('keypress', enterKey)

function enterKey(keys) {
  if (keys.key == 'Enter') {
    addTask()
  }
}

function addTask() {
  if (input.value) {
    taskArray.push({
      taski: input.value,
      status: false
    })
  } else {
    alert('Digite uma tarefa!')
  }
  input.value = ''
  showTasks()
}

function showTasks() {
  let newLi = ''
  taskArray.forEach((task, index) => {
    newLi =
      newLi +
      `<li class="list ${task.status == true ? 'done' : ''}">
    <button class="btn-add" onclick="doneTask(${index})">
        <i class="far fa-plus-square"></i>
    </button>
    <p class="task-name ${task.status == true ? 'done' : ''}" id="task-id">${
        task.taski
      }</p>
    <button class="btn-del" onclick="delTask(${index})">
        <i class="far fa-minus-square"></i>
    </button>
    </li>`
  })
  tasklist.innerHTML = newLi

  localStorage.setItem('list', JSON.stringify(taskArray))
}

function delTask(index) {
  taskArray.splice(index, 1)
  showTasks()
}

function doneTask(index) {
  taskArray[index].status = !taskArray[index].status
  showTasks()
}

function reloadTasks() {
  let myTasks = localStorage.getItem('list')
  if (myTasks) {
    taskArray = JSON.parse(myTasks)
    showTasks()
  }
}
