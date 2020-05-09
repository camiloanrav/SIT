import React from 'react';
import PropTypes from 'prop-types';

const Buscador = ({setBuscar, tipoBusqueda}) => {
    
    return (
        <div>
            <form className="form-search" style={{'margin':'0em 0em 0em 0em' , minWidth:'18em', maxWidth:'30em'}}>
                    {/*<input type="search" name="buscar"></input>*/}
                    <div className="input-form-search">
                        <input autocomplete='off' onInput={e => setBuscar(e.target.value)} id="search-module-input" type="search" name="buscar" required="required" />
                        <label  for="search-module-input">
                            Buscar por {tipoBusqueda}
                        </label>
                    </div>
                    <button id="search-module-submit" type="submit" value=""><span className="icon fas fa-search"></span></button>
            </form>
        </div>
    );
};

Buscador.propTypes = {

};

export default Buscador;