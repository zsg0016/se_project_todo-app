export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
  }
  open() {
    this._popupElement.classList.add("popup_visible");
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscapeClose(evt);
    });
    const popContent = this._popupElement.querySelector(".popupcontent");
    this._popupElement.addEventListener("click", (event) => {
      if (
        event.target === this._popupElement ||
        !popContent.contains(event.target)
      ) {
        this.close();
      }
    });
  }
}
