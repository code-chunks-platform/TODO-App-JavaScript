const inputField = document.getElementById("input_search");
const submitButton = document.getElementById("btn");
const taskLists = document.getElementById("lists");
let todos = JSON.parse(localStorage.getItem("Data")) || [];

submitButton.addEventListener("click", () => {
  if (inputField.value == "") {
    alert("Please enter somithing");
  } else {
    todos.push(inputField.value)
    localStorage.setItem("Data", JSON.stringify(todos));    
    updateTask();
    }
  inputField.value = "";
});

taskLists.addEventListener("click", (event) => {
  //-- *** Remove element when delete button is clicked *** --
  if (event.target.classList.contains("delete")) {
    const li = event.target.closest("li");
    const arrayIndex = Array.from(taskLists.children).indexOf(li);
    todos.splice(arrayIndex, 1);
    localStorage.setItem("Data", JSON.stringify(todos));
    updateTask();
  }

  //-- *** Edit and Remove element when edit button is clicked *** --
  if (event.target.classList.contains("edit")) {
    const li = event.target.closest("li");
    const pText = li.querySelector(".task_added");
    inputField.value = pText.innerHTML;
    const arrayIndex = Array.from(taskLists.children).indexOf(li);
    todos.splice(arrayIndex, 1);
    localStorage.setItem("Data", JSON.stringify(todos));
    updateTask();
  }

  //-- *** Check or Uncheck element when check button/circle is clicked *** --
  if (event.target.classList.contains("bi")) {
    const li = event.target.closest("li");

    if (event.target.classList.contains("bi-circle")) {
      event.target.classList.remove("bi-circle");
      event.target.classList.add("bi-check-circle");
      const pText = li.querySelector(".task_added");
      pText.style.textDecoration = "line-through";
    } else {
      event.target.classList.add("bi-circle");
      event.target.classList.remove("bi-check-circle");
      const pText = li.querySelector(".task_added");
      pText.style.textDecoration = "none";
    }
  }
});

let updateTask = ()=> {
  taskLists.innerHTML = "";
  todos.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="tasks">
        <div class="check_list">
          <i class="bi bi-circle"></i>
          <p class="task_added">${task}</p>
        </div>
        <div class="buttons">
          <button class="edit btn-all">Edit</button>
          <button class="delete btn-all">Delete</button>
        </div>
      </div>`;
      taskLists.appendChild(li);
   });
}

updateTask();
