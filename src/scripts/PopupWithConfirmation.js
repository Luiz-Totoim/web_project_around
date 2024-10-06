import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
       this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        if (!this._form) {
            console.error("Formulário não encontrado no popup.");
        }
        this._confirmButton = this._popup.querySelector('.popup__button-save');
       console.log("constructor confirma",this._confirmButton); // Verifica se o popup foi corretamente selecionado
        
    }

    // Adiciona os event listeners necessários
    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._handleFormSubmit(this._cardId, this._card);
            
            this.close(); // Fecha o popup após o envio do formulário
        });
    }


    open(cardId, cardElement) {
        this._card = cardElement;
        this._cardId = cardId;
        super.open();
    }
    close() {
        super.close();
        this._form.reset(); // Reseta o formulário após fechar
    }

    
}
