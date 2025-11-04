import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = [];
    const inputElements = this._formElement.querySelectorAll("input");
    inputElements.forEach((input) => {
      if (input.name) {
        inputValues[input.name] = input.value;
      }
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}
