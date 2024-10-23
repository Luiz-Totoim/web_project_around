import Modal from "./Modall.js";

export default class ModalWithImage extends Modal {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popupElement.querySelector(".modal-view-image__image-title");
    this._image = this._popupElement.querySelector(".modal-view-image__render-image");
  }

  open(data) {
    this._imageTitle.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
    super.setEventListeners();
  }
}
