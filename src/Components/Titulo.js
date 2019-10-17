import React from 'react';
import PropTypes from 'prop-types';

const Titulo = ({titulo}) => {
    return (
        <div>
            <section class="investigation with-decoration">
                <h2 className="titulo">{titulo}</h2>
            </section>
        </div>
    );
};

Titulo.propTypes = {
    
};

export default Titulo;