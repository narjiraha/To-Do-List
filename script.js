let todoList = [];

function addTodo() {
  const input = document.getElementById("input");
  if (input.value === "") return;

  const todo = {
    id: Date.now(),
    text: input.value,
    done: false,
    subtasks: [],
    timestamp: new Date(),
  };
  todoList.push(todo);

  const card = document.createElement("div");
  card.classList.add("card");

  const cardText = document.createElement("p");
  cardText.innerText = todo.text;
  cardText.setAttribute("data-todo-id", todo.id);

  const timestampText = document.createElement("p");
  const timestampOptions = { dateStyle: "short", timeStyle: "short" };
  timestampText.innerText = `Added on: ${todo.timestamp.toLocaleString(
    undefined,
    timestampOptions
  )}`;
  timestampText.classList.add("timestamp");

  const editSaveContainer = document.createElement("div"); // create a div to contain the edit and save buttons
  editSaveContainer.classList.add("edit-save-container"); // add a class to the container

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.onclick = () => {
    cardText.contentEditable = true;
    cardText.focus();
    editButton.style.display = "none"; // hide the edit button
    saveButton.style.display = "inline-block"; // show the save button
  };

  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.onclick = () => {
    cardText.contentEditable = false;
    todo.text = cardText.innerText;
    saveButton.style.display = "none"; // hide the save button
    editButton.style.display = "inline-block"; // show the edit button
  };
  saveButton.style.display = "none"; // initially hide the save button

  const doneButton = document.createElement("button");
  doneButton.innerText = "Done";
  doneButton.onclick = () => {
    todo.done = !todo.done;
    card.classList.toggle("done", todo.done);
    doneButton.classList.toggle("done", todo.done);
  };

  const cardInput = document.createElement("input");
  cardInput.type = "text";
  cardInput.placeholder = "Add a subtask...";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Subtask";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";

  cardInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && cardInput.value !== "") {
      addSubtaskToList(card, todo, cardInput.value);
      cardInput.value = "";
    }
  });

  addButton.onclick = () => {
    if (cardInput.value !== "") {
      addSubtaskToList(card, todo, cardInput.value);
      cardInput.value = "";
    }
  };

  deleteButton.onclick = () => {
    deleteTodoFromList(todo);
    card.remove();
  };

  card.appendChild(cardText);
  card.appendChild(timestampText);

  // append the edit and save buttons to the container
  editSaveContainer.appendChild(editButton);
  editSaveContainer.appendChild(saveButton);

  // append the edit-save-container and done button to the card
  card.appendChild(editSaveContainer);
  card.appendChild(doneButton);
  card.appendChild(deleteButton);
  card.appendChild(cardInput);
  card.appendChild(addButton);


  const cardContainer = document.getElementById("card-container");
  cardContainer.appendChild(card);
  input.value = "";
}


function addSubtaskToList(card, todo, subtaskText) {
  const subtask = {
    id: Date.now(),
    text: subtaskText,
    done: false,
    timestamp: new Date()
  };
  todo.subtasks.push(subtask);

  const subtaskTextElement = document.createElement("p");
  subtaskTextElement.innerText = subtask.text;


  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onclick = () => {
    subtask.done = !subtask.done;
    subtaskTextElement.classList.toggle("done", subtask.done);
  };

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.onclick = () => {
    deleteSubtaskFromList(todo, subtask);
    subtaskTextElement.remove();
    timestampText.remove();
    checkbox.remove();
    deleteButton.remove();
  };

  subtaskTextElement.appendChild(checkbox);
  subtaskTextElement.appendChild(deleteButton);
  card.appendChild(subtaskTextElement);

}

function deleteSubtaskFromList(todo, subtask) {
  const index = todo.subtasks.findIndex(item => item.id === subtask.id);
  if (index !== -1) {
    todo.subtasks.splice(index, 1);
  }
}


function deleteTodoFromList(todo) {
  const index = todoList.findIndex(item => item.id === todo.id);
  if (index !== -1) {
    todoList[index].done = true;
    const cardText = document.querySelector(`[data-todo-id="${todo.id}"]`);
    cardText.classList.add("done");
    todoList.splice(index, 1);
  }
}
