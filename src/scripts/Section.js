class Section {
    constructor({ items = [], renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // Atualiza _renderedItems e renderiza os itens
    renderItems(items = this._renderedItems) {
        if (Array.isArray(items)) {
            items.forEach(item => {
                this._renderer(item);
            });
        } else {
            console.error('Os itens fornecidos não são um array:', items);
        }
    }

    addItem(element) {
        this._container.prepend(element);
    }
}

export { Section };
