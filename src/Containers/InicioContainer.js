import React, { Component, useState, useEffect } from 'react';

import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Card from '../Components/Card';
import Mapa from '../Components/Mapa';
import InformacionInicio from '../Components/InformacionInicio';

import { getData } from '../utils/api';

import CarouselInicio from '../Components/CarouselInicio';

import dimensionAmbiental from '../img/dimensionAmbiental.jpg';
import dimensionEconomica from '../img/dimensionEconomica.jpeg';
import dimensionInstitucional from '../img/dimensionInstitucional.jpg';
import dimensionSocial from '../img/dimensionSocial.jpg';

const InicioContainer = () => {
    const [cargando, setCargando] = useState(true);
    const [datos, setDatos] =  useState([]);
    const [imagenes] = useState([dimensionEconomica, dimensionSocial, dimensionAmbiental, dimensionInstitucional]);

    useEffect(() => {
        getData('/dimension/all.php').then(data => {
            setCargando(false);
            for(let i = 0; i < data.length; i++){
                data[i].rutaimagen = imagenes[i];
            }       
            setDatos(data);
            renderPosts(datos);
        }).catch(error => console.log(error.data));
    }, []);

    function renderPosts(datos) {

        return datos.map((card,i) => {
            const {nombre, descripcion, rutaimagen} = card;
            return (
                <Card key={i} i={i} nombreDimension={nombre} descripcion={descripcion} rutaimagen={rutaimagen}/>                    
            );
        });
    }

    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>
            <CarouselInicio></CarouselInicio>
            <section className="investigation with-decoration">
                <div className="cards">                     
                    {cargando ? 'Cargando...' : renderPosts(datos)
                } </div>

            </section>
            <div className='contenido-inicio'>
                <Mapa></Mapa>
                <InformacionInicio></InformacionInicio>
            </div>
            <Footer></Footer>
        </div>
    );
   
  
 
}

export default InicioContainer;
