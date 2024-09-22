import { FormValidator, config } from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup } from "./utils.js";

/* A página já carrega com as informações do perfil */
export const nameInput = document.querySelector(
  ".edit-profile-popup__input_name"
);
export const aboutInput = document.querySelector(
  ".edit-profile-popup__input_about"
);

export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export function updateUserInfo() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
}
updateUserInfo();

/* Cartões iniciais sendo adicionados via JS assim que a página carrega */
const initialCards = [
  {
    name: "Ilha Kauai",
    link: "./images/kauai-havai.jpg",
  },
  {
    name: "Grand Canyon",
    link: "./images/grand-canyon.jpg",
  },
  {
    name: "Parque Nacional Rocky Mountain",
    link: "./images/parque-nacional-rocky-mountain.jpg",
  },
  {
    name: "Parque Nacional Yellowstone",
    link: "./images/yellowstone-national-park.jpg",
  },
  {
    name: "Lago Haiyaha",
    link: "./images/lago-haiyaha.jpg",
  },
  {
    name: "Vale de Yosemite",
    link: "./images/vale-de-yosemite.jpg",
  },
];

export const galleryCards = document.querySelector(".gallery__cards");
initialCards.forEach((item) => {
  const card = new Card({
    item,
    templateSelector: "#card-template",
    openPopup,
  });
  const cardElement = card.generateCard();

  galleryCards.prepend(cardElement);
});

/* Aplicar validação aos formulários */
const formList = Array.from(document.forms);

formList.forEach((formElement) => {
  const validation = new FormValidator(config, formElement);
  validation.enableValidation(config, formElement);
});
