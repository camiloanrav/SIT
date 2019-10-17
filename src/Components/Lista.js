import React from 'react';
import PropTypes from 'prop-types';

const Lista = props => {
    return (
        <div>
            <div className="lista">
                <div class="form-table" >
                    <table style={{}}>
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Autor/es</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-table-header="Nivel de formación">Sistema multimedia para favoreces el aprendizaje profundo en estudiantes de la materia arquitectura de sistemas multimedia</td>
                                <td data-table-header="Docentes de planta">Camilo Andres Ramirez, Cristian Andres Olivares</td>
                                <td data-table-header="Docentes de hora cátedra">
                                    <a>Detalles <span class="fas fa-search"></span></a>
                                    <a>Descargar <span class="fas fa-file-download"></span></a>
                                </td>
                            </tr>

                            <tr>
                                <td data-table-header="Nivel de formación">Maestría</td>
                                <td data-table-header="Docentes de planta">154</td>
                                <td data-table-header="Docentes de hora cátedra"></td>
                            </tr>

                            <tr>
                                <td data-table-header="Nivel de formación">Especialización</td>
                                <td data-table-header="Docentes de planta">10</td>
                                <td data-table-header="Docentes de hora cátedra"></td>
                            </tr>

                            <tr>
                                <td data-table-header="Nivel de formación">Pregrado</td>
                                <td data-table-header="Docentes de planta">15</td>
                                <td data-table-header="Docentes de hora cátedra"></td>
                            </tr>

                            <tr>
                                <td data-table-header="Nivel de formación">Listas</td>
                                <td data-table-header="Docentes de planta">
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </td>
                                <td data-table-header="Docentes de hora cátedra">
                                    <ol>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ol>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

Lista.propTypes = {

};

export default Lista;