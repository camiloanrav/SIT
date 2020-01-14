import React from 'react';

const DatosDepartamento = ({nombre,extension,capital,poblacion,participacionPIB,color}) => {
    return (
        <div style={{opacity:'.9',position:'relative',left:'230px',top:'-450px',textAlign:'left',fontSize:'14px', width:'12em', backgroundColor: color, padding:'1em', borderRadius:'0.4em', boxShadow:'5px 3px 3px rgba(0,0,0,0.2)'}}>
        {/* <div style={{opacity:'.9',position:'relative',left:'300px',top:'-500px',textAlign:'left',fontSize:'17px', width:'15em', backgroundColor: color, padding:'1em', borderRadius:'0.4em', boxShadow:'5px 3px 3px rgba(0,0,0,0.2)'}}> */}
              
            <div><b>Nombre del departamento: </b> {nombre}</div>
            <div><b>Capital: </b> {capital}</div>
            <div><b>Extensión: </b> {extension} </div>
            <div><b>Población 2019pr: </b> {poblacion}</div>
            <div><b>Participación PIB regional 2018pr: </b> {participacionPIB}</div>
        </div> 
    );
};

export default DatosDepartamento;