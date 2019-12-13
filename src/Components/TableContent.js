import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

class TableContent extends React.Component {
    render() {
        const {nombre, autor, url, cargando} = this.props;
        const dataTable = (                     
         <tr>
             <td data-table-header="Nivel de formación">{nombre}</td>
             <td data-table-header="Docentes de planta">{autor}</td>
             <td data-table-header="Docentes de hora cátedra">
                 {/*<p><a>Detalles <span className="fas fa-search"></span></a></p>*/}
                  <a href={url}>Descargar<span className="fas fa-file-download"></span></a>
              </td>
          </tr>
         
     );
     const mensajeCarga = <span className="d-flex m-auto">Cargando...</span>;

     return (
        <div>
            {cargando ? mensajeCarga : dataTable }
        </div>
    );
 };

};

TableContent.propTypes = {

};

export default TableContent;