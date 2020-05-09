import React, {useState, useEffect } from 'react';
import Accordion from '../Components/Accordion';

const AdminInicio = ({setTitulo}) => {
    setTitulo("Administrador / Inicio");

    return (
        <div >
            <Accordion></Accordion>
        </div>
    );
};

export default AdminInicio;