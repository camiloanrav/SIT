import React from 'react';
import PropTypes from 'prop-types';

const RecursosUtiles = ({ header, body }) => {
    return (
        <div>
            <section class="resources-section">
                <div class="rs-title">
                    <p>Recursos útiles</p>
                </div>
                <div class="rs-text">
                    <p>A continuación encontrarás una serie de <strong>contenidos y documentos útiles.</strong> Esperamos sean de mucha ayuda.</p>
                </div>
                <div class="rs-documents">
                    <p>Recursos disponibles:</p>
                    <ul>
                        <li>
                            <a href="">
                                <span class="fab fa-google-drive"></span>
                                <p>Link a manual</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="fas fa-file-download"></span>
                                <p>Descargar manual</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

RecursosUtiles.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
};

export default RecursosUtiles;

