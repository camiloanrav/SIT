import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, useParams} from "react-router-dom";

class Table extends React.Component {
    render() {
        const {contenido} = this.props;
        const body = (

            <div>
                <div className="lista">                
                    <div className="form-table">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Autor/es</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {contenido}
                             </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );

        return (
            <div> {body} </div>
        );
    };


};

Table.propTypes = {};

export default Table;
