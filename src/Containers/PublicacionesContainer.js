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
import {getData} from '../utils/api';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const PublicacionesContainer = () => {

    const [datos, setDatos] = useState([]);
    const [filtrado, setFiltrado]= useState([]);
    const [indice, setindice] = useState(1);
    const [buscar, setBuscar] = useState("");
    const [tipoBusqueda,setTipoBusqueda] = useState("Titulo");

    useEffect(() => {
        getData(`/documento/search.php?id=${indice}`).then(data => {
            setDatos(data); 
        });
    }, [] );

    useEffect(() => {
        getData(`/documento/search.php?id=${indice}`).then(data => {
            setDatos(data); 
        });
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

    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>

            <Titulo titulo="Publicaciones"></Titulo>
            <Tabs setindice={setindice}></Tabs>
            <div style={{margin:'2em 0em 0.5em 2.5em', display:'flex', flexWrap:'wrap'}} >
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
