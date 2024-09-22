export class FormValidator {
  constructor(config, formElement) {
    this._inputsSelector = config.inputsSelector;
    this._buttonElementSelector = config.buttonElementSelector;
    this._buttonElementClass = config.buttonElementClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
  }

  enableValidation() {
    this._validateInputs();
  }
  _validateInputs() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._inputsSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._buttonElementSelector
    );
    this._toggleButtonState(inputs, buttonElement, config);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputs, buttonElement);
      });
    });
  }
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      const inputElementValidationMessage = inputElement.validationMessage;
      this._showInputError(inputElement, inputElementValidationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _toggleButtonState(inputs, buttonElement) {
    if (this._hasInvalidInput(inputs)) {
      buttonElement.classList.add(config.buttonElementClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._buttonElementClass);
      buttonElement.removeAttribute("disabled", true);
    }
  }
  _showInputError(inputElement, inputElementValidationMessage) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElementValidationMessage;
  }
  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  _hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

/* tarefa extra do sprint 9: resetar formulário quando o popup é fechado  */
export const config = {
  inputsSelector: ".popup__input",
  buttonElementSelector: ".popup__submit-button",
  buttonElementClass: "popup__submit-button_inactive",
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_type_error",
};

export const resetValidation = () => {
  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    const inputs = Array.from(
      formElement.querySelectorAll(config.inputsSelector)
    );

    formElement.reset();

    inputs.forEach((inputElement) => {
      const errorElement = inputElement.nextElementSibling;

      inputElement.classList.remove(config.inputErrorClass);
      errorElement.classList.remove(config.errorClass);
      errorElement.textContent = "";
    });
  });
};
