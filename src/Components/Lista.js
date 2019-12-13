import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

const Lista = props => {
    let { listaID } = useParams();
    return (
        <div>
            <div className="lista">
            
            <h3>{listaID}</h3>
                
            </div>
        </div>
    );
};

Lista.propTypes = {

};

export default Lista;