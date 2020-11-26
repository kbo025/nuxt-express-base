'use strict'

function HttpError(code, message, data) {
    this.message = message || 'Mensagem de erro padrão';
    this.code = code;
    this.data = data || [];
}

HttpError.prototype = Object.create(HttpError.prototype);
HttpError.prototype.constructor = HttpError;

module.exports = HttpError;