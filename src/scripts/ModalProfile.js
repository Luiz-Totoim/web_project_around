// ModalProfile.js
import Popup from './Popup.js';

export default class ModalProfile extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._closeButton = this._popup.querySelector('.modalProfile__close');
        this._fileInput = this._popup.querySelector('.modalProfile__input');
        this._submitButton = this._popup.querySelector('.modalProfile__submit-button');
        
        this.setEventListeners(); // Chamando corretamente o setEventListeners
    }

    setEventListeners() {
        super.setEventListeners(); // Chamando o setEventListeners da classe base
        
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._fileInput.files[0]);
        });
    }

    _handleFormSubmit(file) {
        console.log('Arquivo selecionado:', file);
        this.close(); // Fecha o modal após o envio
    }
}
