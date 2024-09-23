export default class Card {
  constructor(
    { id, title, link, ownerId, likes, userId },
    templateSelector,
    handleCardClick,
    addLike,
    removeLike,
    openConfirmation
  ) {
    this._internalTitle = title;    
    this._urlInterno = link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._id = id;
    this._ownerId = ownerId;
    this._likes = likes;
    this._userId = userId;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._openConfirmation = openConfirmation;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._template)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return template;
  }

  _updateLikes() {
    this._likeCountElement = this._element.querySelector(
      ".elements__like-count"
    );
    this._likeCountElement.textContent = this._likes.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.setAttribute("id", this._id);
    this._element.setAttribute("ownerId", this._ownerId);
    this._element.querySelector(".elements__card-name").textContent =
      this._internalTitle;
    this._element
      .querySelector(".elements__card-image")
      .setAttribute("src", this._urlInterno);
    this._element
      .querySelector(".elements__card-image")
      .setAttribute("alt", this._internalTitle);
    this._element
      .querySelector(".elements__card-image")
      .addEventListener("click", () => {
        this._handleCardClick(this._internalTitle, this._urlInterno);
      });

    const deleteIcon = this._element.querySelector(".elements__delete-icon");
    if (this._userId !== this._ownerId) {
      deleteIcon.remove();
    } else {
      deleteIcon.addEventListener("click", (evt) => {
        const card = evt.target.closest(".elements__card");
        this._openConfirmation(this._id, card);
      });
    }

    this._element
      .querySelector(".elements__card-image")
      .addEventListener("click", () => {
        this._handleCardClick(this._internalTitle, this._urlInterno);
      });

    this._element
      .querySelector(".elements__like-icon")
      .addEventListener("click", (evt) => {
        if (evt.target.classList.contains("elements__like-icon-clicked")) {
          this._removeLike(this._id)
            .then((card) => {
              this._likeCountElement.textContent = card.likes.length;
            })
          return evt.target.classList.remove("elements__like-icon-clicked");
        }
        this._addLike(this._id)
          .then((card) => {
            this._likeCountElement.textContent = card.likes.length;
          })
        return evt.target.classList.add("elements__like-icon-clicked");
      });

    this._likes.forEach((likeObj) => {
      if (this._userId === likeObj._id) {
        return this._element
          .querySelector(".elements__like-icon")
          .classList.add("elements__like-icon-clicked");
      } else {
        return this._element
          .querySelector(".elements__like-icon")
          .classList.remove("elements__like-icon-clicked");
      }
    });

    
    this._updateLikes();
    return this._element;
  }
}
