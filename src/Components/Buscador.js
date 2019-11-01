import React from 'react';
import PropTypes from 'prop-types';

const Buscador = props => {
    return (
        <div>
            <form class="form-search" style={{'margin':'1em', 'marginTop':'2.5em'}}>
                    {/*<input type="search" name="buscar"></input>*/}
                    <div class="input-form-search">
                        <input id="search-module-input" type="search" name="buscar" required="required" />
                        <label for="search-module-input">
                            Buscar por título
                        </label>
                    </div>
                    <button id="search-module-submit" type="submit" value=""><span class="icon fas fa-search"></span></button>
            </form>
        </div>
    );
};

Buscador.propTypes = {

};

export default Buscador;