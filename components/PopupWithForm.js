import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputElements = {
      todoName: this._formElement.querySelector("#todo-name").value,
      todoDate: this._formElement.querySelector("#todo-date").value,
    };
    return inputElements;
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscapeClose(evt);
    });
    const popContent = document.querySelector(".popup__content");
    this._popupElement.addEventListener("click", (event) => {
      if (!popContent.contains(event.target)) {
        this.close();
      }
    });
    this._formElement = document.querySelector(".popup__form");
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}
