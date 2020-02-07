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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const PublicacionesContainer = () => {

    const [cargando, setCargando] = useState(true);
    /* const [nombre, setnombre] = useState(null);
    const [autor, setautor] = useState(null);
    const [url, seturl] = useState(null); */
    const [datos, setDatos] = useState([]);
    const [filtrado, setFiltrado]= useState([]);
    const [indice, setindice] = useState(1);
    const [buscar, setBuscar] = useState("");
    const [tipoBusqueda,setTipoBusqueda] = useState("Titulo");

    useEffect(() => {
        getAxios();
    }, [] );

    useEffect(() => {
        setCargando(true);
        getAxios();
    }, [indice]);

    useEffect(() => {
        if(buscar !== ""){
            setFiltrado(
                datos.filter(function (i){
                    if(tipoBusqueda === "Titulo")
                        return i.titulo.toLowerCase().match(buscar.toLowerCase());
                    else
                        return i.autor.toLowerCase().match(buscar.toLowerCase());
                })
            )
        }else{
            setFiltrado(datos)
        }
    }, [buscar,datos] );

    /* function handleChange(i) {
        console.log('Soy handleChange', i)
        setindice(i);
    } */

    async function getAxios() {
        console.log(indice)
        await axios.get(`http://192.168.0.159/serpacificows/documento/search.php?id=${indice}`).then(response => {
            
            setDatos(response.data);
            setCargando(false);
            console.log("Estado:", datos, "Respuesta:", response.data);
        }).catch(error => console.log(error.response));
        /* var dataFromServer = [];
        if(indice === 1){
            dataFromServer = [
                {iddocumentos: "5", titulo: "Tesis de prueba 2", anio: "2012", autor: "Cristian Jimenez", urlarchivo: "www.google.com"},
                {iddocumentos: "7", titulo: "Tesis de prueba 3", anio: "2011", autor: "Juan Garces", urlarchivo: "www.google.com"},
                {iddocumentos: "8", titulo: "Tesis de prueba 4", anio: "2015", autor: "Camilo Correa", urlarchivo: "www.google.com"},
                {iddocumentos: "9", titulo: "Tesis de prueba 5", anio: "2014", autor: "Steven Erazo", urlarchivo: "www.google.com"},
                {iddocumentos: "10", titulo: "Tesis de prueba 6", anio: "2012", autor: "Camilo Puertas", urlarchivo: "www.google.com"},
                {iddocumentos: "11", titulo: "Tesis de prueba 7", anio: "2009", autor: "Juan Perez", urlarchivo: "www.google.com"},
                {iddocumentos: "12", titulo: "Tesis de prueba 8", anio: "2019", autor: "Raul Gomez", urlarchivo: "www.google.com"},
                {iddocumentos: "3", titulo: "Tesis de prueba", anio: "2000", autor: "Camilo Ramirez", urlarchivo: "www.google.com"},
                {iddocumentos: "13", titulo: "Tesis de prueba 9", anio: "2016", autor: "Pepe Ortiz", urlarchivo: "www.google.com"},
                {iddocumentos: "14", titulo: "Tesis de prueba 10", anio: "2011", autor: "Lina Narvaez", urlarchivo: "www.google.com"},
                {iddocumentos: "15", titulo: "Tesis de prueba 11", anio: "2018", autor: "Samantha Trujillo", urlarchivo: "www.google.com"},
                {iddocumentos: "16", titulo: "Tesis de prueba 12", anio: "2015", autor: "Daniela Diaz", urlarchivo: "www.google.com"},
                {iddocumentos: "17", titulo: "Tesis de prueba 13", anio: "2015", autor: "Mauricio Gutierrez", urlarchivo: "www.google.com"}
            ];
        }else{
            dataFromServer = [
                {iddocumentos: "5", titulo: "Tesis de prueba 2", anio: "2012", autor: "Mario Romero", urlarchivo: "www.google.com"},
                {iddocumentos: "7", titulo: "Tesis de prueba 3", anio: "2011", autor: "Juan Garces", urlarchivo: "www.google.com"},
                {iddocumentos: "8", titulo: "Tesis de prueba 4", anio: "2015", autor: "Camilo Correa", urlarchivo: "www.google.com"},
                {iddocumentos: "9", titulo: "Tesis de prueba 5", anio: "2014", autor: "Steven Erazo", urlarchivo: "www.google.com"},
                {iddocumentos: "10", titulo: "Tesis de prueba 6", anio: "2012", autor: "Camilo Puertas", urlarchivo: "www.google.com"},
                {iddocumentos: "11", titulo: "Tesis de prueba 7", anio: "2009", autor: "Juan Perez", urlarchivo: "www.google.com"},
                {iddocumentos: "12", titulo: "Tesis de prueba 8", anio: "2019", autor: "Raul Gomez", urlarchivo: "www.google.com"}
            ];
        }
        
        setDatos(dataFromServer);
        setCargando(false); */
    }

    // useEffect(() => {
    //     getPubs().then((res) => {
    //         setDatos(res.data);
    //     }).catch((err) => console.log(err));
    //     setCargando(false);
    // });

    

    /* function renderInfo(datos) { // console.log(datos)
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
                            <p><a>Detalles <span className="fas fa-search"></span></a></p>
                            <a href={urlarchivo}>Descargar<span className="fas fa-file-download"></span>
                            </a>
                        </td>
                    </tr>
                );
            });
        }


    } */

    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>

            <Titulo titulo="Publicaciones"></Titulo>
            <Tabs setindice={setindice}></Tabs>
            <div style={{margin:'2em 0em 0.5em 2.5em', display:'flex', flexWrap:'wrap'}} >
                {/* <div  class="input-form select-input" onChange={e => setTipoBusqueda(e.target.value)}>
                    <label for="selector">Tipo de busqueda</label>
                    <select name="selector" id="selector">
                        <option value="Titulo">Titulo</option>
                        <option value="Autor">Autor</option>
                    </select>
                </div> */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Tipo de busqueda:</FormLabel>
                        <RadioGroup aria-label="position" name="position" value={tipoBusqueda} onChange={e => setTipoBusqueda(e.target.value)} row>
                            
                        <FormControlLabel
                        value="Titulo"
                        control={<Radio color="primary" />}
                        label="Titulo"
                        labelPlacement="Titulo"
                        />

                        <FormControlLabel
                        value="Autor"
                        control={<Radio color="primary" />}
                        label="Autor"
                        labelPlacement="Autor"
                        />
                    </RadioGroup>
                </FormControl>
                <Buscador tipoBusqueda={tipoBusqueda} setBuscar={setBuscar}></Buscador>
                
            </div>
            
            <Table /* contenido={cargando ? 'Cargando...' : renderInfo(datos)} */ datos={filtrado/* ===[]?filtrado:datos */} /* datos={datos} */></Table>
            <Footer></Footer>
        </div>
    );
}


export default PublicacionesContainer;
