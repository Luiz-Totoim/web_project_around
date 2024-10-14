import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._confirmationButton = this._popupElement.querySelector(
      ".popup-confirm-delete__save-button"
    );
    this._confirmationButtonOriginalText = this._confirmationButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmationButton.textContent = "Excluindo...";
    } else {
      this._confirmationButton.textContent =
        this._confirmationButtonOriginalText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleSubmit(this._cardId)
        .then(() => {
          this._cardElement.remove();
          this.close();
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  close() {
    super.close();
  }
}
