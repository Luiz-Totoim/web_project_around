export default class modal {
    constructor(modalSelector) {
      this._modalElement = document.querySelector(modalSelector);
      console.log(this._modalElement);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._modalElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      this._modalElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  
    _handleEscClose(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  
    setEventListeners() {
      this._modalElement.addEventListener("click", (evt) => {
        if (
          evt.target.classList.contains("modal-edit__close-button") ||
          evt.target.classList.contains("modal")
        ) {
          this.close();
        }
      });
    }
  }
  