import React from 'react';
import LoadExcel from '../Components/LoadExcel';

import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

const AdminEstadisticas = ({setTitulo}) => {
    let { listaID } = useParams();
    setTitulo("Administrador / Estadísticas");
    return (
        <div>
            <LoadExcel></LoadExcel> 
        </div>
    );
};

export default AdminEstadisticas;