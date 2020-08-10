import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';
import Tabs from '../Components/Tabs';
import Buscador from '../Components/Buscador';
import Titulo from '../Components/Titulo';
import Tabla from '../Components/Tabla';

import {getData} from '../utils/api';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import background from '../img//background.png';

const PublicacionesContainer = () => {

    const [datos, setDatos] = useState([]);
    const [filtrado, setFiltrado]= useState([]);
    const [indice, setindice] = useState(1);
    const [buscar, setBuscar] = useState("");
    const [tipoBusqueda,setTipoBusqueda] = useState("Título");

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
        if(buscar !== "" && datos){
            setFiltrado(
                datos.filter(function (i){
                    if(tipoBusqueda === "Título")
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
            <div style={{minHeight:'24.2em', padding:'1em 0 0 0', background: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.9)), url(${background})`, backgroundPosition:'center', backgroundRepeat:'repeat', backgroundSize:'cover'}}>
                
                <Tabs setindice={setindice} tab1="Documentos" tab2="Cuentas Económicas del Valle"></Tabs>
                <div style={{margin:'2em 0em 0.5em 2.5em', display:'flex', flexWrap:'wrap'}} >
                    <FormControl style={{marginBottom:'1.2em'}} component="fieldset">
                        <FormLabel component="legend">Tipo de busqueda:</FormLabel>
                            <RadioGroup aria-label="position" name="position" value={tipoBusqueda} onChange={e => setTipoBusqueda(e.target.value)} row>
                                
                            <FormControlLabel
                            value="Título"
                            control={<Radio color="primary" />}
                            label="Título"
                            labelPlacement="Título"
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
                <div style={{backgroundColor:'white'}}>
                    <Tabla isAdmin={false} /* contenido={cargando ? 'Cargando...' : renderInfo(datos)} */ datos={filtrado/* ===[]?filtrado:datos */} /* datos={datos} */></Tabla>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}


export default PublicacionesContainer;
