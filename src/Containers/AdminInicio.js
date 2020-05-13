import React, {useState, useEffect } from 'react';
import Accordion from '../Components/Accordion';
import Titulo from '../Components/Titulo';
import Footer from '../Components/Footer';

import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';

const AdminInicio = () => {
    let titulo = "Administrador / Inicio";
    return (
        <div>
            <NavBarDesktop user={"administrador"}></NavBarDesktop>
            <NavBarMovil user={"administrador"}></NavBarMovil>
            <Titulo titulo={titulo}></Titulo>
            <Accordion></Accordion>
            <div className="footer-admin"></div>
            <Footer></Footer>
        </div>
    );
};

export default AdminInicio;