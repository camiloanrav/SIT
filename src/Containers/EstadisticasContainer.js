import React, {useState, useEffect} from 'react';

import NavBarDesktop from "../Components/NavBarDesktop";
import NavBarMovil from "../Components/NavBarMovil";
import Footer from "../Components/Footer";
import EstadisticasUno from "../Components/EstadisticasUno";
import EstadisticasDos from "../Components/EstadisticasDos";
import EstadisticasTres from "../Components/EstadisticasTres";
import Titulo from "../Components/Titulo";

import {getData} from '../utils/api';

import background from '../background.png';

import Tabs from '../Components/Tabs';

const EstadisticasContainer = () => {
    const [indice, setindice] = useState(1);

    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>
            <Titulo titulo="Estadísticas"></Titulo>
            <div style={{padding:'1em 0em 0em 0em', background: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${background})`/* ,  backgroundImage:`url(${background})` */, backgroundPosition:'center', backgroundRepeat:'repeat', backgroundSize:'cover'}}>
                <Tabs setindice={setindice} tab1="Busqueda por Dimensiones" tab2="Busqueda Avanzada"></Tabs>
                {
                    indice === 1 ? 
                    //<EstadisticasDos></EstadisticasDos>
                    <EstadisticasTres></EstadisticasTres>
                    :
                    <EstadisticasUno></EstadisticasUno>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default EstadisticasContainer;