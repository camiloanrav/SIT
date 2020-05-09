import React, {Component, useState, useEffect} from 'react';

const FilasTabla = ({admin, dataPerPage, handleClickOpen}) => {

    const [rows,setRows] = useState(0);
    useEffect(() => {
        console.log(dataPerPage);
        
        if(admin){
            setRows( dataPerPage.map(function(d, index) {
                return (
                    <tr key={index}>
                        <td data-table-header="Título">{d.titulo}</td>
                        <td data-table-header="Autor/es">{d.autor}</td>
                        <td data-table-header="Acciones"> 
                            <a target="_blank" rel="noopener noreferrer" href={d.urlarchivo}>Descargar</a>
                            <a style={{margin:'0em 0.8em 0em 0.8em'}}  href="#/" onClick={()=>{handleClickOpen(1,d.titulo, d.autor, d.anio, d.urlarchivo, d.idDocumento, d.categoria)}}>Editar</a>
                            <a href="#/" onClick={()=>{handleClickOpen(0,d.titulo,d.autor, d.anio, d.urlarchivo, d.idDocumento, d.categoria)}}>Eliminar</a>
                        </td>
                    </tr>
                )
            })
            )
            
        }else{
            setRows( dataPerPage.map(function(d, index) {
                    return (
                        <tr key={index}>
                            <td data-table-header="Título">{d.titulo}</td>
                            <td data-table-header="Autor/es">{d.autor}</td>
                            <td data-table-header="Acciones"> <a target="_blank" rel="noopener noreferrer" href={d.urlarchivo}>Descargar</a></td>
                        </tr>
                    )
                })
            );
        }
        
    }, [dataPerPage, admin, handleClickOpen] );

    
    return (
        <tbody> 
            {rows}
        </tbody> 
    );
}

export default FilasTabla;