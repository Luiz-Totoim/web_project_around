export default class Card {
  constructor(data) {
    this._name = data.item.name;
    this._link = data.item.link;
    this._templateSelector = data.templateSelector;
    this._openPopup = data.openPopup;
  }
  _getTemplate() {
    const templateElement = document.querySelector(
      this._templateSelector
    ).content;
    const cardElement = templateElement
      .querySelector(".gallery__card")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".gallery__card-title").textContent =
      this._name;
    this._element
      .querySelector(".gallery__card-title")
      .setAttribute("alt", this._name);
    this._element.querySelector(".gallery__card-image").src = this._link;

    this._setEventListeners();

    return this._element;
  }
  _setEventListeners() {
    const cardImage = this._element.querySelector(".gallery__card-image");

    cardImage.addEventListener("click", (event) => {
      this._openPopup(event);
      this._enableExpandingImage();
    });

    this._element
      .querySelector(".gallery__delete-icon")
      .addEventListener("click", () => {
        this._enableDeletingCards();
      });

    this._element
      .querySelector(".gallery__heart-icon")
      .addEventListener("click", () => {
        this._enableLikeButton();
      });
  }
  _enableExpandingImage() {
    const expandedImage = document.querySelector(".image-popup__image");
    expandedImage.setAttribute("src", `${this._link}`);

    document.querySelector(".image-popup__title").textContent = this._name;
  }
  _enableDeletingCards() {
    this._element.remove();
  }
  _enableLikeButton() {
    const likeButon = this._element.querySelector(".gallery__heart-icon");
    const heartIconSource = likeButon.getAttribute("src");
    if (heartIconSource === "./images/heart-icon.png") {
      likeButon.setAttribute("src", "./images/heart-icon-active.png");
    } else {
      likeButon.setAttribute("src", "./images/heart-icon.png");
    }
  }
}
