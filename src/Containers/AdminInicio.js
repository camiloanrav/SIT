import React, {useState, useEffect } from 'react';
import Accordion from '../Components/Accordion';
import Titulo from '../Components/Titulo';
import Footer from '../Components/Footer';

import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';

import  { Redirect } from 'react-router-dom';

const AdminInicio = () => {
    let titulo = "Administrador / Inicio";

    const ProtectedComponent = () => {
        if (sessionStorage.getItem("login")){
            return null
        }else{
            return <Redirect to='/login'  />
        }
    }

    return (
        <div>
            <NavBarDesktop user={"administrador"}></NavBarDesktop>
            <NavBarMovil user={"administrador"}></NavBarMovil>
            <Titulo titulo={titulo}></Titulo>
            <Accordion></Accordion>
            <div className="footer-admin"></div>
            <ProtectedComponent></ProtectedComponent>
            <Footer></Footer>
        </div>
    );
};

export default AdminInicio;