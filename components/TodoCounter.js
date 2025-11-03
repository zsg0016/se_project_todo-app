class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._todoCounterTextElement = document.querySelector(selector);
    this._completedTodos = 0;
    this._totalTodos = 0;
    todos.forEach((todoElement) => {
      if (todoElement.completed) {
        this._completedTodos += 1;
      }
    });
    this._updateText();
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    if (increment) {
      this._completedTodos += 1;
    } else {
      this._completedTodos -= 1;
    }
    this._completedTodos = this._completedTodos < 0 ? 0 : this._completedTodos;
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    if (increment) {
      this._totalTodos += 1;
    } else {
      this._totalTodos -= 1;
    }
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    // Sets the text content of corresponding text element.
    // Call this in the constructor, and whenever the counts get updated.
    this._todoCounterTextElement.textContent = `Showing ${this._completedTodos} out of ${this._totalTodos} completed`;
  }
}

export default TodoCounter;
