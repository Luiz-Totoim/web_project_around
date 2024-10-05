import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".image-popup__image");
    this._popupTitle = this._popup.querySelector(".image-popup__title");
  }

  open(item) {
    this._popupImage.src = item.link;
    this._popupTitle.textContent = item.name;
    super.open();
  }
}
