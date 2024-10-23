export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Método para verificar a resposta do servidor
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.json().then((err) => Promise.reject(`Erro: ${res.status} - ${err.message}`));
    }

    // Método para tratar erros de requisição
    _handleError(error) {
        console.error(error);
        // Retornar algo mesmo em caso de erro, para manter a consistência das Promises
        return Promise.reject(error);
    }

    // Método auxiliar para centralizar fetch
    _fetch(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos
    
        return fetch(`${this._baseUrl}${url}`, {
            headers: this._headers,
            signal: controller.signal,
            ...options
        })
        .then((res) => {
            clearTimeout(timeoutId); // Limpa o timeout no then
            return this._checkResponse(res);
        })
        .catch((error) => {
            clearTimeout(timeoutId); // Limpa o timeout no catch
            return this._handleError(error);
        });
    }
    
    // Métodos da API
    getUserInfo() {
        return this._fetch('/users/me');
    }

    getInitialCards() {
        return this._fetch('/cards');
    }

    updateUserInfo(data) {
        return this._fetch('/users/me', {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    addCard(data) {
        console.log(data);
        return this._fetch('/cards', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    likeCard(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
        method: 'PUT'
    });
}
    
    unlikeCard(cardId) {
        return this._fetch(`/cards/likes/${cardId}`, {
            method: 'DELETE'
        });
    }
    
    
    deleteCard(cardId) {
        console.log("api ", cardId)
        return this._fetch(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
        
    }

    updateAvatar(data) {
        return this._fetch('/users/me/avatar', {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }
}                                                                                           
