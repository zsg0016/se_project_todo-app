export default class Todo {
  constructor(data, templateSelector, todoID) {
    this._name = data.name;
    this._id = todoID;
    this._completed = data.completed === undefined ? false : data.completed;
    this._date = data.date;
    this._templateSelector = templateSelector;
  }

  getView() {
    const todoElement = document
      .querySelector(`#${this._templateSelector}`)
      .content.querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoLabel = todoElement.querySelector(".todo__label");
    this._todoCheckboxEl = todoElement.querySelector(".todo__completed");

    todoNameEl.textContent = this._name;
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    todoLabel.setAttribute("for", `todo-${this._id}`);
    this.#setDueDate(todoElement);
    this.#setEventListeners(todoElement);

    return todoElement;
  }

  #setEventListeners(todoElement) {
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
    });
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
