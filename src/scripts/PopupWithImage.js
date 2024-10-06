import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        // Chama o construtor da classe pai (Popup)
        super(popupSelector);
        // Seleciona os elementos da imagem e legenda dentro do popup
        this._imageElement = this._popup.querySelector('.modalImage__content');
        this._captionElement = this._popup.querySelector('.modalImage__caption');
    }

        open({ link, name }) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        this._popup.classList.add('modalImage_opened');
    }
      
}
