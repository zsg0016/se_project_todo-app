import { v4 as uuidv4 } from "https://jspm.dev/uuid";
export default class Todo {
  constructor(data, selector) {
    this._id = data.id === undefined ? uuidv4() : data.id;
    this._name = data.name;
    this._completed = data.completed === undefined ? false : data.completed;
    this._date = data.date;
    this._selector = selector;
  }

  getView() {
    const todoElement = document
      .querySelector(`#${this._selector}`)
      .content.querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");

    todoNameEl.textContent = this._name;
    todoCheckboxEl.checked = this._completed;
    todoCheckboxEl.id = `todo-${this._id}`;
    todoLabel.setAttribute("for", `todo-${this._id}`);
    this.#setDueDate(todoElement);
    this.#setEventListeners(todoElement);

    return todoElement;
  }

  #setEventListeners(todoElement) {
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });
  }

  #setDueDate(todoElement) {
    const todoDate = todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }
}
