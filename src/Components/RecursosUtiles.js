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
                                <span class="icon icon-drive"></span>
                                <p>Políticas</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon icon-drive"></span>
                                <p>Documento en línea</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon icon-download"></span>
                                <p>Reglamentos.doc</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon icon-download"></span>
                                <p>Norma-3456.pdf</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span class="icon icon-download"></span>
                                <p>Resoluciones.pdf</p>
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

