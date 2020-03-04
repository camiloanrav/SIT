import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/core/styles.scss';

import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Card from '../Components/Card';
import Mapa from '../Components/Mapa';
import Acercade from '../Components/Acercade';
import Acercade2 from '../Components/Acercade2';
import { getData } from '../utils/api';

import DemoCarousel from '../Components/DemoCarousel';

import dimensionAmbiental from '../dimensionAmbiental.jpg';
import dimensionEconomica from '../dimensionEconomica.jpeg';
import dimensionInstitucional from '../dimensionInstitucional.jpg';
import dimensionSocial from '../dimensionSocial2.jpg';

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

        return datos.map(card => {
            const {nombre, descripcion, rutaimagen} = card;

            return (
                <Card nombreDimension={nombre} descripcion={descripcion} rutaimagen={rutaimagen}/>                    
            );
        });
    }

    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>
            <DemoCarousel></DemoCarousel>
            <section className="investigation with-decoration">
                <div className="cards">                     
                    {cargando ? 'Cargando...' : renderPosts(datos)
                } </div>

            </section>
            {/*<section class="circulation-of-links">
            </section>*/}
            <div className='contenido-inicio'>
                <Mapa></Mapa>
                <Acercade2></Acercade2>
            </div>
            <Footer></Footer>
        </div>
    );
   
  
 
}
InicioContainer.propTypes = {};

export default InicioContainer;
