import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector(".popup__form");
const formValidator = new FormValidator(validationConfig, addTodoForm);
const todoTemplate = "todo-template";

const handleTodoChecked = (checked) => {
  todoCounter.updateCompleted(checked);
};

const handleTodoDelete = (completed) => {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(!completed);
  }
};

const renderTodo = (item) => {
  const todo = new Todo(
    { name: item.name, date: item.date, completed: item.completed },
    todoTemplate,
    item.id,
    handleTodoDelete,
    handleTodoChecked
  );
  todosList.addItem(todo.getView());
};

const handleFormSubmit = (inputValues) => {
  const todoName = inputValues["name"];
  const dateInput = inputValues["date"] !== null ? inputValues["date"] : "";

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name: todoName, date: date };
  const todo = new Todo(
    values,
    todoTemplate,
    uuidv4(),
    handleTodoDelete,
    handleTodoChecked
  );
  todosList.addItem(todo.getView());
  todoCounter.updateTotal(true);
  addTodoPopup.close();
  formValidator.resetValidation();
};

const todosList = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
todosList.renderItems();
const addTodoPopup = new PopupWithForm("#add-todo-popup", handleFormSubmit);
addTodoPopup.setEventListeners();
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

formValidator.enableValidation();
