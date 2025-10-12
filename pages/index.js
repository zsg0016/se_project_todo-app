import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseButton = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const formValidator = new FormValidator(validationConfig, addTodoForm);

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseButton.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const renderTodo = (data, todoTemplate, todoID) => {
  const todo = new Todo(data, todoTemplate, todoID);
  todosList.append(todo.getView());
};

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const todoName = evt.target.name.value;
  const dateInput =
    evt.target.date.valueAsDate !== null ? evt.target.date.value : "";

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { todoName, date };
  renderTodo(values, "todo-template", uuidv4());
  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item, "todo-template", item.id);
});

formValidator.enableValidation();
