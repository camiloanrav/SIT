import React from 'react';
import PropTypes from 'prop-types';

const Titulo = ({titulo}) => {
    return (
        <div>
            <section style={{backgroundColor:'rgba(235,235,235,1)'}} /* className="investigation with-decoration" */>
                <h2 className="titulo-container">{titulo}</h2>
            </section>
        </div>
    );
};

Titulo.propTypes = {
    
};

export default Titulo;