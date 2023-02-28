export const sayHello = (text) => {
  return text;
};

export const main = document.querySelector('.main');
export const footer = document.querySelector('.footer');
export const input = document.querySelector('input');
export const btnClear = document.querySelector('.clear-completed');
export let taskArray = [];
const getterLocalStorage = JSON.parse(localStorage.getItem('mydayapp-js'));

export function myLoad() {
  if (getterLocalStorage === null) {
    setterLocalStorage();
  } else {
    taskArray = [...getterLocalStorage];
    countItems(taskArray);
    renderTask(taskArray)
  };
}

export function setterLocalStorage() {
  localStorage.setItem("mydayapp-js", JSON.stringify(taskArray));
};


export function isEmpty() {
  if (!taskArray.length) {
    main.classList.add('hidden');
    footer.classList.add('hidden');
  } else {
    main.classList.remove('hidden');
    footer.classList.remove('hidden');
  }
}

export function newTask(arrayTask) {
  var task = document.getElementsByTagName("input")[0].value.trim();
  const objTask = {
    title: task,
    state: "pending",
  }
  if (task != "") {
    arrayTask.push(objTask);
    input.value = "";
    if (location.hash == '#/pending') {
      main.innerHTML = "";
      renderTask(arrayTask.filter(task => task.state == "pending"));
    } else if(location.hash == '#/') {
      renderTask(arrayTask);
    }  else if (location.hash == 'completed') {
      renderTask(arrayTask);
    }
    countItems(arrayTask);
    isEmpty();
  } else {
  }

}

export function renderTask(tasks) {
  main.innerHTML = "";
  const taskUl = document.createElement('ul');
  tasks.map(function (element) {

    taskUl.classList.add('todo-list');
    const taskLi = document.createElement('li');
    const divTask = document.createElement('div');
    divTask.classList.add('view');
    const inputTask = document.createElement('input');
    inputTask.classList.add('toggle');
    inputTask.setAttribute('type', "checkbox");
    const labelTask = document.createElement('LABEL');
    const labelTaskText = document.createTextNode(element.title);
    const buttonTask = document.createElement('button');
    buttonTask.classList.add('destroy');

    buttonTask.addEventListener("click", function (event) {
      tasks.splice(tasks.indexOf(element),1);
      main.innerHTML = "";
      renderTask(tasks);
      countItems(tasks);
      taskArray=tasks;
      setterLocalStorage();
      isEmpty();
    });

    inputTask.addEventListener("change", function (event) {
      if (this.checked) {
        element.state = "completed";
        renderTask(tasks);
        countItems(tasks);
        if (location.hash == '#/pending') {
          PendingPage();
        }
        taskLi.classList.add('completed');
      } else {
        element.state = "pending";
        renderTask(tasks);
        countItems(tasks);
        taskLi.classList.remove('completed');
      }
    });

    if (element.state == 'completed') {
      inputTask.checked = true;
      taskLi.classList.add('completed');
    } else {
      taskLi.classList.remove('completed');
      inputTask.checked = false;
    }

    labelTask.addEventListener("dblclick", function (event) {
      taskUl.innerHTML = "";
      document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
          renderTask(tasks);
        }
      });
      const labelEdit = document.createElement('input');
      labelEdit.focus();
      labelEdit.setAttribute("type", "text");
      labelEdit.setAttribute("id", "inputEdit");
      taskLi.classList.add('editing');
      labelEdit.classList.add('edit');
      labelEdit.setAttribute("value", element.title);
      labelEdit.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          let taskEdit = document.getElementById('inputEdit').value.trim();
          element.title = taskEdit;
          renderTask(tasks);
          countItems(tasks);
        }
      });
      taskUl.appendChild(taskLi)
      taskLi.appendChild(labelEdit);
    });

    labelTask.appendChild(labelTaskText);
    divTask.appendChild(buttonTask);
    divTask.appendChild(inputTask);
    divTask.appendChild(labelTask);
    taskLi.appendChild(divTask);
    taskUl.appendChild(taskLi);
    main.appendChild(taskUl);
  })
}

export function countItems(tasks) {
  const spanFooter = document.querySelector('.todo-count');
  spanFooter.innerHTML = "";

  const count = document.createElement('strong');
  const textCount = document.createTextNode(tasks.filter(task => task.state == 'pending').length);
  const textCountLeft = document.createTextNode("");
  if (tasks.filter(task => task.state == 'pending').length > 1) {
    textCountLeft.nodeValue = " items left";
  } else {
    textCountLeft.nodeValue = " item left";
  }
  spanFooter.appendChild(count);
  spanFooter.appendChild(textCountLeft)
  count.appendChild(textCount);
  footer.appendChild(spanFooter);
}
export function clearTask() {
  taskArray = taskArray.filter(task => task.state == "pending")
  main.innerHTML = "";
  renderTask(taskArray);
  if (location.hash == '#/completed') {
    CompletedPage();
  }
}

export function allPages(){
  main.innerHTML = "";
  renderTask(taskArray);
}

export function PendingPage(){
  const taskArrayPending = taskArray.filter(task => task.state == "pending")
  main.innerHTML = "";
  renderTask(taskArrayPending);
}

export function CompletedPage(){
  main.innerHTML = "";
  const taskArrayCompleted = taskArray.filter(task => task.state == "completed")
  main.innerHTML = "";
  renderTask(taskArrayCompleted);
}



