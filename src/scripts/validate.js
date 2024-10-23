// Definindo cardsContainerSelector
const cardsContainerSelector = '.card__container';
const cardsContainer = document.querySelector(cardsContainerSelector);

cardsContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("cards__card_heart")) {
        evt.target.classList.toggle("cards__card_active");
    }
    if (evt.target.classList.contains("cards__card_bin")) {
        evt.target.closest(".cards__card").remove();
    }
    if (evt.target.classList.contains("cards__card_image")) {
        const url = evt.target.src;
        const caption = evt.target.alt;
        document.querySelector(".modalImage__content").src = url;
        document.querySelector(".modalImage__content").alt = caption;
        document.querySelector(".modalImage__caption").textContent = caption;
        openModal();
    }
});

function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
}

function getErrorMessage(inputElement) {
    if (inputElement.validity.valueMissing) {
        return "Preencha esse campo.";
    }
    if (inputElement.type === "text" && inputElement.validity.tooShort) {
        return "Preencha esse campo com pelo menos 2 caracteres.";
    }
    if (inputElement.type === "url" && inputElement.validity.typeMismatch) {
        return "Por favor, insira um endereço web válido.";
    }
    return "";
}

function checkInputValidity(settings, inputElement, formElement) {
    if (!inputElement.validity.valid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(formElement, inputElement, errorMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    const isValidLength = inputList.every(inputElement => inputElement.value.length >= 2);

    if (hasInvalidInput(inputList) || !isValidLength) {
        buttonElement.classList.add("popup__button-disable");
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove("popup__button-disable");
        buttonElement.disabled = false;
    }
};

const setEventListeners = (settings) => {
    const forms = document.querySelectorAll(settings.formSelector);

    forms.forEach((form) => {
        const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
        const buttonElement = form.querySelector(settings.submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", function () {
                checkInputValidity(settings, inputElement, form);
                toggleButtonState(inputList, buttonElement);
            });
        });
        
        toggleButtonState(inputList, buttonElement);
    });
};

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__edit-text",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-disable",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__error_visible"
};

setEventListeners(settings);
