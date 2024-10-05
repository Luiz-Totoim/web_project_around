export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupSection = this._popup.parentElement;
    this._popupCloseIcon = this._popup.querySelector(".popup__close-icon");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupSection.classList.add("popup_popup_opened");
    this.setEventListeners();
  }
  close() {
    this._popupSection.classList.remove("popup_popup_opened");

    document.removeEventListener("keydown", this._handleEscClose);
    this._popupSection.removeEventListener("click", this._handleClickOutside);
    this._popupCloseIcon.removeEventListener("click", this.close);
  }
  _handleClickOutside(event) {
    if (event.target.tagName == "SECTION") {
      this.close();
    }
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);

    this._popupSection.addEventListener("click", this._handleClickOutside);

    this._popupCloseIcon.addEventListener("click", this.close);
  }
}
