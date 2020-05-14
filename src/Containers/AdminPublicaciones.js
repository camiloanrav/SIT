
import React, {Component, useState, useEffect} from 'react';

import background from '../background.png';
import Tabs from '../Components/Tabs';
import Buscador from '../Components/Buscador';
import Tabla from '../Components/Tabla';
import Titulo from "../Components/Titulo"
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';

import {getData} from '../utils/api';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Footer from '../Components/Footer';


const AdminPublicaciones = () => {
    let titulo = "Administrador / Publicaciones";
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
        if(buscar !== "" && datos){
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
        <div style={{minHeight:'28em'}}>
            <NavBarDesktop user={"administrador"}></NavBarDesktop>
            <NavBarMovil user={"administrador"}></NavBarMovil>
            <Titulo titulo={titulo}></Titulo>
            <Tabs setindice={setindice} tab1="Documentos" tab2="Cuentas Económicas del Valle"></Tabs>
            <div style={{margin:'2em 0em 0.5em 2.5em', display:'flex', flexWrap:'wrap'}} >
                <FormControl style={{marginBottom:'1.2em'}} component="fieldset">
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
            <Tabla tab={indice}  isAdmin={true}  datos={filtrado} setDatos={setDatos}></Tabla>
            <div className="footer-admin"></div>
            <Footer></Footer>
        </div>
    );
};

export default AdminPublicaciones;