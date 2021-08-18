//Selecting elements
const textField = document.querySelector('.textBox-input');
const buttonAdd = document.querySelector('.btn-plus');
const listItems = document.querySelector('.listItems');
const buttonClearList = document.querySelector('.btn-footer');

//Event Listeners
buttonAdd.addEventListener('click', addTodo);
textField.addEventListener('keyup', textInput);

// Onkeyup Event
function textInput() {
  const todoTaskInput = textField.value; // Get hold of what has been entered in the text box
  if (todoTaskInput.replace(/^\s+ | \s+$/g, '') == 0) {
    //Remove blank spaces before and after text input
    buttonAdd.classList.remove('active'); // Deactivate the add button if empty or blank spaces
  } else {
    // If conditions are met and the text entered isn't blank spaces then activate the add button
    buttonAdd.classList.add('active');
  }
}

showTodoList(); //The function to display all the todo items

function addTodo() {
  // Function to add todo items by clicking on the add/plus button
  const todoTaskInput = textField.value; //retrieve the input field value
  const getLocalStorageData = localStorage.getItem('newTodoItem'); //check local storage
  if (getLocalStorageData == null) {
    //If there is nothing in the local storage
    listArray = []; //we create a blank array
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(todoTaskInput);
  localStorage.setItem('newTodoItem', JSON.stringify(listArray));
  showTodoList();
  buttonAdd.classList.remove('active'); // Deactivate the add button if empty or blank spaces
}

function showTodoList() {
  const getLocalStorageData = localStorage.getItem('newTodoItem');
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }

  if (listArray.length > 0) {
    buttonClearList.classList.add('active');
  } else {
    buttonClearList.classList.remove('active');
  }
  let newLiTag = '';
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  listItems.innerHTML = newLiTag; //Add a new Li tag
  textField.value = '';
}

// Function to delete individual tasks
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem('newTodoItem');
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem('newTodoItem', JSON.stringify(listArray));
  showTodoList();
}

// Function to clear all the tasks
buttonClearList.onclick = function () {
  window.localStorage.clear();
  showTodoList();
};

//Function to display the current date and time
function currentTime() {
  var day = new Date();
  var time =
    (day.getHours() < 10 ? '0' : '') +
    day.getHours() +
    ':' +
    (day.getMinutes() < 10 ? '0' : '') +
    day.getMinutes();

  var select = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  var day = new Date();

  document.querySelector('.dateText').innerHTML = day.toDateString(
    'en-US',
    select
  );
  document.querySelector('.timeText').innerHTML = time;
}
window.onload = function () {
  setInterval(currentTime, 100);
};
