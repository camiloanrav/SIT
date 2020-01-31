import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';
import Tabs from '../Components/Tabs';
import Buscador from '../Components/Buscador';
import Titulo from '../Components/Titulo';
import Table from '../Components/Table';
import TableContent from '../Components/TableContent';
import SelectorUAO from '../Components/SelectorUAO';
import {getPubs} from '../utils/api';
import axios from "axios";

const PublicacionesContainer = () => {

    const [cargando, setCargando] = useState(true);
    const [nombre, setnombre] = useState(null);
    const [autor, setautor] = useState(null);
    const [url, seturl] = useState(null);
    const [datos, setdatos] = useState([]);
    const [indice, setindice] = useState(1);


    function handleChange(epa) {
        console.log('Soy handleChange', epa)
        setindice(epa);
    }

    async function getAxios() {
        console.log(indice)
        await axios.get(`http://11.11.8.46/serpacificows/documento/search.php?id=${indice}`).then(response => {
            
            setdatos(response.data)
            setCargando(false)
            console.log("Estado:", datos, "Respuesta:", response.data);
        }).catch(error => console.log(error.response));
    }

    // useEffect(() => {
    //     getPubs().then((res) => {
    //         setdatos(res.data);
    //     }).catch((err) => console.log(err));
    //     setCargando(false);
    // });

    useEffect(() => {
        console.log('Entro')
        setCargando(true)
        getAxios()
    }, [indice] );


    function renderInfo(datos) { // console.log(datos)
        if (datos === undefined) {
            return(null)
        } else {
            return datos.map(table => {
                const {titulo, autor, urlarchivo} = table;

                return (
                    <tr>
                        <td data-table-header="Nivel de formación">
                            {titulo}</td>
                        <td data-table-header="Docentes de planta">
                            {autor}</td>
                        <td data-table-header="Docentes de hora cátedra">
                            {/*<p><a>Detalles <span className="fas fa-search"></span></a></p>*/}
                            <a href={urlarchivo}>Descargar<span className="fas fa-file-download"></span>
                            </a>
                        </td>
                    </tr>

                // <TableContent nombre={titulo}
                //        autor={autor}
                //        url={urlarchivo}/>

                );
            });
        }


    }

    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>
            <Titulo titulo="Publicaciones"></Titulo>
            {/* {
            console.log("aja", indice)
        } */}
            <Tabs index={handleChange}></Tabs>
            <Table contenido={
                cargando ? 'Cargando...' : renderInfo(datos)
            }></Table>

            <Footer></Footer>
        </div>
    );
}


export default PublicacionesContainer;
