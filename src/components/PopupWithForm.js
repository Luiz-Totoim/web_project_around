import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitForm = submitForm;
    this._submitButton = this._form.querySelector(".popup__save-button");  
    this._submitButtonOriginalText = this._submitButton.textContent; 
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Salvando..."; 
    } else {
      this._submitButton.textContent = this._submitButtonOriginalText;  
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = this._form.querySelectorAll(".popup__input");
    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true); 
      this._submitForm(this._getInputValues())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }
}
