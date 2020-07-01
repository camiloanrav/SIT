import React from 'react';
import PropTypes from 'prop-types';

const RecursosUtiles = ({ header, body }) => {
    return (
        <div>
            <section className="resources-section">
                <div className="rs-title">
                    <p>Recursos útiles</p>
                </div>
                <div className="rs-text">
                    <p>A continuación encontrarás una serie de <strong>contenidos y documentos útiles.</strong> Esperamos sean de mucha ayuda.</p>
                </div>
                <div className="rs-documents">
                    <p>Recursos disponibles:</p>
                    <ul>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/file/d/1BLni3SEb8JfpoX-DOZNVR8Tzy9UeO_YM/view">
                                <span className="fab fa-google-drive"></span>
                                <p>Link a manual</p>
                            </a>
                        </li>
                        {/* <li>
                            <a href="">
                                <span className="fas fa-file-download"></span>
                                <p>Descargar manual</p>
                            </a>
                        </li> */}
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

