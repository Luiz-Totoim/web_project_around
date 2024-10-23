import "./index.css";
import Card from "../components/Сard.js";
import FormValidation from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Section from "../components/Section.js";
import User from "../components/User.js";
import ApiService from "../components/Api.js";

const api = new ApiService({
  baseURL: "https://around.nomoreparties.co/v1/web-ptbr-cohort-11",
  headers: {
    authorization: "e1bf077e-1f40-49ae-b399-5969495a1c96",
    "Content-Type": "application/json",
  },
});

import ModalWithConfirmation from "../components/ModalWithConfirmation.js";

const modalWithConfirmation = new ModalWithConfirmation(
  ".modal-confirm-delete",
  (cardId) => handleCardDelete(cardId)
);
modalWithConfirmation.setEventListeners();
const modalWithConfirmationCloseButton = document.querySelector(
  ".modal-confirm-delete__close-button"
);
modalWithConfirmationCloseButton.addEventListener("click", () =>
  modalWithConfirmation.close()
);

const modalImage = new ModalWithImage(".modal-view-image");

const userInfo = new User({
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
  modalImage.open({ name, link });
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
          (cardId, card) => modalWithConfirmation.open(cardId, card)
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
    modalEditProfile.open();
  });

// Função de validação dos inputs do perfil
function handleProfileFormSubmit({ name, about }) {
  return api.editUserInfo({ name, about }).then(() => {
    userInfo.setUserInfo({ name, about });
    modalEditProfile.close();
  });
}

function handleCardDelete(cardId) {
  return api.deleteCard(cardId).then(() => {
    console.log("Cartão excluído com sucesso.");
  });
}

// Configuração do formulário
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: ".modal__save-button",
  inputErrorClass: ".about-error",
  errorClass: "error-message",
};

//Perfil
const editButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector(".modal-edit__form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputName = document.querySelector(".modal-edit__input");
const inputAbout = document.querySelector(".modal__input-space");
const popupEditcloseButton = document.querySelector(
  ".modal-edit__close-button"
);

//Card
const cards = document.querySelector(".elements");
const addForm = document.querySelector(".modal-addCard__form");
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCardCloseButton = document.querySelector(
  ".modal-addCard__close-button"
);

//Avatar
const openPopupAvatar = document.querySelector(".profile__edit-button-avatar");
const closeModalAvatar = document.querySelector(
  ".modal-edit-avatar__close-button"
);
const avatarForm = document.querySelector(".modal-edit-avatar__form");

const editFormValidation = new FormValidation(config, editForm);

const editCard = new FormValidation(config, addForm);

const editAvatarFormValidation = new FormValidation(config, avatarForm);

const modalEditProfile = new ModalWithForm(
  ".modal-edit",
  handleProfileFormSubmit
);
modalEditProfile.setEventListeners();

function handleProfileAvatarFormSubmit({ avatar }) {
  userInfo.setAvatar({ avatar });
  return api.editAvatar({ avatar });
}

const modalEditAvatar = new ModalWithForm(
  ".modal-edit-avatar",
  handleProfileAvatarFormSubmit
);
modalEditAvatar.setEventListeners();

closeModalAvatar.addEventListener("click", function () {
  modalEditAvatar.close();
});

openPopupAvatar.addEventListener("click", function () {
  modalEditAvatar.open();
  editAvatarFormValidation.enableValidation();
});

editButton.addEventListener("click", function () {
  modalEditProfile.open();
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
              (cardId, card) => modalWithConfirmation.open(cardId, card)
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

const modalAddCard = new ModalWithForm(".modal-addCard", submitFormCard);
modalAddCard.setEventListeners();

addCardButton.addEventListener("click", function () {
  modalAddCard.open();
  editCard.enableValidation();
  addForm.reset();
});

// Fechar o modal "Novo Local"
popupAddCardCloseButton.addEventListener("click", function (evt) {
  modalAddCard.close();
});

popupEditcloseButton.addEventListener("click", function () {
  modalEditProfile.close();
});

const modalImageClose = document.querySelector(
  ".modal-view-image__close-button"
);

modalImageClose.addEventListener("click", function (evt) {
  modalImage.close();
});

function closeModalOnEscKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_opened");
    if (openedModal) {
      openedModal.classList.remove("popup_opened");
    }
  }
}

document.addEventListener("keydown", closeModalOnEscKey);