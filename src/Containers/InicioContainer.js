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
import { getDimension } from '../utils/api';
import axios from "axios";

import DemoCarousel from '../Components/DemoCarousel';

import dimensionAmbiental from '../dimensionAmbiental.JPG';
import dimensionEconomica from '../dimensionEconomica.jpeg';
import dimensionInstitucional from '../dimensionInstitucional.jpg';
import dimensionSocial from '../dimensionSocial.jpg';

const InicioContainer = () => {
    const [cargando, setCargando] = useState(true);
    const [nombreDimension, setNombre] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [datos, setDatos] =  useState([]);
    const [imagenes] = useState([dimensionEconomica, dimensionSocial, dimensionAmbiental, dimensionInstitucional]);


    async function getAxios() {  
        await axios.get(`http://11.11.8.164/serpacificows/dimension/all.php`).then(response => {
            for(let i = 0; i < response.data.length; i++){
                response.data[i].rutaimagen = imagenes[i];
            }
                        
            setDatos(response.data);
            console.log("OK");    
            renderPosts(datos);
            console.log("Estado:", datos, "Respuesta:", response.data);
        }).catch(error => console.log(error.response));
    }

    useEffect(() => {
        console.log('Entro');
        setCargando(false);
        getAxios()
    }, [cargando] );
 

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
                <div className='cards'>
                    <Mapa></Mapa>
                    <Acercade2></Acercade2>
                </div>
                <Footer></Footer>
            </div>
        );
   
  
 
}
InicioContainer.propTypes = {};

export default InicioContainer;
