import "./css/base.css";

import {
  sayHello,
  main,
  footer,
  input,
  btnClear,
  allPages,
  isEmpty,
  renderTask,
  countItems,
  clearTask,
  PendingPage,
  taskArray,
  newTask,
  CompletedPage,
  myLoad,
  setterLocalStorage
} from "./js/utils";

console.log(sayHello("Hello"));

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false)
myLoad();

function navigator() {
  if (location.hash == '#/') {
    setterLocalStorage()
    allPages();
  } else if (location.hash == '#/pending') {
    PendingPage();
    setterLocalStorage()
  } else if (location.hash == '#/completed') {
    CompletedPage();
    setterLocalStorage()
  } else {
    isEmpty();
    allPages();
  }
}

btnClear.addEventListener("click", clearTask);

input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    newTask(taskArray);
    setterLocalStorage()
  }
});

