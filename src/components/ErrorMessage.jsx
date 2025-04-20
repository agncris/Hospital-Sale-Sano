import React from 'react';

const ErrorMessage = ({ error }) => {
    if (!error) return null;

    let message = 'Ha ocurrido un error.';

    if (error.response) {
        // Errores que responden del servidor
        message = `Error: ${error.response.status} - ${error.response.data.message}`;
    } else if (error.request) {
        // Errores que ocurren al hacer la solicitud
        message = 'Error: No se recibió respuesta del servidor.';
    } else {
        // Otros errores
        message = `Error: ${error.message}`;
    }

    return (
        <div className="error-message">
            {message}
        </div>
    );
};

export default ErrorMessage;