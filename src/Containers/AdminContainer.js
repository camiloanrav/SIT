import React, {useState} from 'react';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';
import Titulo from '../Components/Titulo';
import AdminInicio from '../Components/AdminInicio';
import AdminPublicaciones from '../Components/AdminPublicaciones';
import AdminEstadisticas from '../Components/AdminEstadisticas';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch, 
    NavLink
  } from "react-router-dom";

const AdminContainer = () => {
    
    const [page, setPage] = useState(1);
    let { path, url } = useRouteMatch();
    let { params } = useParams();
    const [titulo, setTitulo] = useState("Administrador / Inicio");
    let content;

    if(page === 1){
        content = <AdminInicio setTitulo={setTitulo}></AdminInicio>
    } else if(page === 3){
        content = <AdminPublicaciones setTitulo={setTitulo}></AdminPublicaciones>
    } else if(page === 2){
        content = <AdminEstadisticas setTitulo={setTitulo}></AdminEstadisticas>
    }

    return (
        <div>
            <NavBarDesktop user={"administrador"} url={url} setPage={setPage}></NavBarDesktop>
            <NavBarMovil></NavBarMovil>
            <Titulo titulo={titulo}></Titulo>
                {content}
            {/* <Switch>
                <Route exact path={path}>
                <h3>Selecione un tipo de publicación</h3>
                </Route>
                <Route path={`${path}/:listaID`}>
                    {content}
                </Route>
            </Switch> */}
            <div className="footer-admin"></div>
            <Footer></Footer>
        </div>
    );
};

export default AdminContainer;