import "./index.css";
import Card from "../components/Сard.js";
import FormValidation from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/web-ptbr-cohort-11",
  headers: {
    authorization: "e1bf077e-1f40-49ae-b399-5969495a1c96",
    "Content-Type": "application/json",
  },
});
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const popupWithConfirmation = new PopupWithConfirmation(
  ".popup-confirm-delete",
  (cardId) => handleCardDelete(cardId)
);
popupWithConfirmation.setEventListeners();
const popupWithConfirmationCloseButton = document.querySelector(
  ".popup-confirm-delete__close-button"
);
popupWithConfirmationCloseButton.addEventListener("click", () =>
  popupWithConfirmation.close()
);

const popupImage = new PopupWithImage(".popup-view-image");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

let userData = {};

api.getUserInfo().then((user) => {
  userData = user;
  userInfo.setUserInfo({ name: user.name, about: user.about });
  userInfo.setAvatar(user);
});

function handleCardClick(name, link) {
  popupImage.open({ name, link });
}

api.getCards().then((cards) => {
  const section = new Section(
    {
      items: cards,
      renderer: (cardData) => {
        const cardElement = new Card(
          {
            title: cardData.name,
            link: cardData.link,
            ownerId: cardData.owner._id,
            likes: cardData.likes,
            id: cardData._id,
            userId: userData._id,
          },
          "#template",
          handleCardClick,
          api.addLike.bind(api),
          api.removeLike.bind(api),
          (cardId, card) => popupWithConfirmation.open(cardId, card)
        ).generateCard();
        section.addItem(cardElement);
      },
    },
    ".elements"
  );

  section.renderItems();
});

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const user = userInfo.getUserInfo();
    inputName.value = user.name;
    inputAbout.value = user.about;
    popupEditProfile.open();
  });

// alterei- garantir que retornem uma Promise
function handleProfileFormSubmit({ name, about }) {
  return api.editUserInfo({ name, about }).then(() => {
    userInfo.setUserInfo({ name, about });
    popupEditProfile.close();
  });
}

function handleCardDelete(cardId) {
  return api.deleteCard(cardId).then(() => {
    console.log("Cartão excluído com sucesso.");
  });
}

// Função de validação dos inputs do perfil
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: ".popup__save-button",
  inputErrorClass: ".about-error",
  errorClass: "error-message",
};

//edit profile
const editButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector(".popup-edit__form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputName = document.querySelector(".popup-edit__input");
const inputAbout = document.querySelector(".popup__input-space");
const popupEditcloseButton = document.querySelector(
  ".popup-edit__close-button"
);

//add card
const cards = document.querySelector(".elements");
const addForm = document.querySelector(".popup-addCard__form");
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCardCloseButton = document.querySelector(
  ".popup-addCard__close-button"
);

//Avatar
const openPopupAvatar = document.querySelector(".profile__edit-button-avatar");
const closePopupAvatar = document.querySelector(
  ".popup-edit-avatar__close-button"
);
const avatarForm = document.querySelector(".popup-edit-avatar__form");

const editFormValidation = new FormValidation(config, editForm);

const editCard = new FormValidation(config, addForm);

const editAvatarFormValidation = new FormValidation(config, avatarForm);

const popupEditProfile = new PopupWithForm(
  ".popup-edit",
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

function handleProfileAvatarFormSubmit({ avatar }) {
  userInfo.setAvatar({ avatar });
  return api.editAvatar({ avatar });
}

const popupEditAvatar = new PopupWithForm(
  ".popup-edit-avatar",
  handleProfileAvatarFormSubmit
);
popupEditAvatar.setEventListeners();

closePopupAvatar.addEventListener("click", function () {
  popupEditAvatar.close();
});

openPopupAvatar.addEventListener("click", function () {
  popupEditAvatar.open();
  editAvatarFormValidation.enableValidation();
});

editButton.addEventListener("click", function () {
  popupEditProfile.open();
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  editFormValidation.enableValidation();
});

function submitFormCard(inputs) {
  const titulo = inputs.name.trim();
  const imagem = inputs.image.trim();

  if (titulo && imagem) {
    const newCardObj = {
      name: titulo,
      link: imagem,
    };

    return api.createCard(newCardObj).then((cards) => {
      const section = new Section(
        {
          items: [cards],
          renderer: (cardData) => {
            const cardElement = new Card(
              {
                title: cardData.name,
                link: cardData.link,
                ownerId: cardData.owner._id,
                likes: cardData.likes,
                id: cardData._id,
                userId: userData._id,
              },
              "#template",
              handleCardClick,
              api.addLike.bind(api),
              api.removeLike.bind(api),
              (cardId, card) => popupWithConfirmation.open(cardId, card)
            ).generateCard();
            section.addItem(cardElement);
          },
        },
        ".elements"
      );

      section.renderItems();
      addForm.reset();
    });
  }
}

const popupAddCard = new PopupWithForm(".popup-addCard", submitFormCard);
popupAddCard.setEventListeners();

addCardButton.addEventListener("click", function () {
  popupAddCard.open();
  editCard.enableValidation();
  addForm.reset();
});

// Fechar o popup "Novo Local"
popupAddCardCloseButton.addEventListener("click", function (evt) {
  popupAddCard.close();
});

popupEditcloseButton.addEventListener("click", function () {
  popupEditProfile.close();
});

const popupImageClose = document.querySelector(
  ".popup-view-image__close-button"
);

popupImageClose.addEventListener("click", function (evt) {
  popupImage.close();
});

function closePopupOnEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_opened");
    }
  }
}

document.addEventListener("keydown", closePopupOnEscKey);