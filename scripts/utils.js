import Card from "./Card.js";
import { resetValidation } from "./FormValidator.js";
import {
  updateUserInfo,
  nameInput,
  aboutInput,
  profileName,
  profileDescription,
  galleryCards,
} from "./index.js";

/* Botões dos popups */
const editProfileButton = document.querySelector(".profile__edit-icon");
const editProfileSection = document.querySelector(".edit-profile-popup");

const addCardButton = document.querySelector(".profile__add-button");
const addCardSection = document.querySelector(".add-card-popup");
const createButton = document.querySelector(".add-card-popup__submit-button");

const imagePopupSection = document.querySelector(".image-popup");

export function openPopup(event) {
  let closeButton;
  let popupSection;
  const openPopupButton = event.currentTarget;
  if (openPopupButton.classList.contains("profile__edit-icon")) {
    popupSection = editProfileSection;
    closeButton = editProfileSection.querySelector(".popup__close-icon");
  }
  if (openPopupButton.classList.contains("profile__add-button")) {
    popupSection = addCardSection;
    closeButton = addCardSection.querySelector(".popup__close-icon");
  }
  if (openPopupButton.classList.contains("gallery__card-image")) {
    popupSection = imagePopupSection;
    closeButton = imagePopupSection.querySelector(".popup__close-icon");
  }

  popupSection.classList.add("popup_popup_opened");

  document.addEventListener("keydown", closePopupWithEsc);
  popupSection.addEventListener("click", closePopupWithClick);
  closeButton.addEventListener("click", closePopup);
}

function closePopup() {
  const popupSection = document.querySelector(".popup_popup_opened");
  const closeButton = popupSection.querySelector(".popup__close-icon");
  popupSection.classList.remove("popup_popup_opened");

  document.removeEventListener("keydown", closePopupWithEsc);
  popupSection.removeEventListener("click", closePopupWithClick);
  closeButton.removeEventListener("click", closePopup);

  resetValidation();
}
function closePopupWithEsc(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}
function closePopupWithClick(event) {
  if (event.target.tagName == "SECTION") {
    closePopup();
  }
}

editProfileButton.addEventListener("click", openPopup);
addCardButton.addEventListener("click", openPopup);

/* Implementar mudança dos dados no perfil */
const editProfileFormElement = document.querySelector(
  ".edit-profile-popup__form"
);
editProfileFormElement.addEventListener("submit", submitProfileForm);
function submitProfileForm(event) {
  event.preventDefault();

  updateUserInfo();

  /* o valor dos inputs é atualizado depois do formulário ser resetado */
  closePopup();
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
}

/* adicionar novo card */
const addCardformElement = document.querySelector(".add-card-popup__form");
addCardformElement.addEventListener("submit", submitAddCardForm);
function submitAddCardForm(event) {
  event.preventDefault();

  const inputLink = document.querySelector(".add-card-popup__input_link");
  const inputTitle = document.querySelector(".add-card-popup__input_title");

  const item = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  const card = new Card({
    item,
    templateSelector: "#card-template",
    openPopup,
  });
  const cardElement = card.generateCard();

  galleryCards.prepend(cardElement);

  /* depois que um card é adicionado, na próxima vez que o popup for aberto, o botão criar já estará desativado */
  createButton.classList.add("popup__submit-button_inactive");
  createButton.setAttribute("disabled", true);

  closePopup();
}
