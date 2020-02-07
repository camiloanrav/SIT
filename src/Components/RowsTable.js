import React, {Component, useState, useEffect} from 'react';
import { Link} from 'react-router-dom';

const RowsTable = ({dataPerPage}) => {
    const [rows,setRows] = useState(0);
    useEffect(() => {
        setRows( dataPerPage.map(function(d, index) {
            return <tr key={index}>
                    <td data-table-header="Título">{d.titulo}</td>
                    <td data-table-header="Autor/es">{d.autor}</td>
                    <td data-table-header="Acciones"> <Link target="_blank" to={d.urlarchivo}>Descargar</Link></td>
                </tr>;
        })
        )
    }, [dataPerPage] );

    
    return (
        <tbody> 
            {rows}
        </tbody> 
    );
}

export default RowsTable;