import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popupElement.querySelector(".popup-view-image__image-title");
    this._image = this._popupElement.querySelector(".popup-view-image__render-image");
  }

  open(data) {
    this._imageTitle.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
    super.setEventListeners();
  }
}
