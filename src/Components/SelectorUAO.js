import React from 'react';
import PropTypes from 'prop-types';

const SelectorUAO = props => {
    return (
        <div>
            <div className="input-form select-input" style={{maxWidth:'70em'}}>
                <label for="selector">Tipo de documento</label>
                <select name="selector" id="selector">
                    <option value="opcion1">Cédula de Ciudadanía</option>
                    <option value="opcion1">Tarjeta de Identidad</option>
                    <option value="opcion1">Contraseña</option>
                    <option value="opcion1">Pasaporte</option>
                </select>
            </div>
        </div>
    );
};

SelectorUAO.propTypes = {

};

export default SelectorUAO;