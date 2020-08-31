import React, {useState, useEffect}  from 'react';
import logo from './logo-ser-2.png';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import InicioContainer from './Containers/InicioContainer';
import EstadisticasContainer from './Containers/EstadisticasContainer';
import ContactoContainer from './Containers/ContactoContainer';
import AyudaContainer from './Containers/AyudaContainer';
import PublicacionesContainer from './Containers/PublicacionesContainer';
import NavBarDesktop from './Components/NavBarDesktop';
import NavBarMovil from './Components/NavBarMovil';
import Footer from './Components/Footer';
import Login from './Containers/Login';

import AdminInicio from './Containers/AdminInicio';
import AdminPublicaciones from './Containers/AdminPublicaciones';
import AdminEstadisticas from './Containers/AdminEstadisticas';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AjustesContainer from './Containers/AjustesContainer';

const NoMatchPage = () => {
  return (
    <div>
      <NavBarDesktop></NavBarDesktop>
      <NavBarMovil></NavBarMovil>
      <div style={{marginBottom:'7em'}}>
        <img alt="logo" src={logo} width="500em"></img>
        <h2><b>Error 404</b></h2>
        <h3>Página no encontrada</h3>
      </div>
      <Footer></Footer>
    </div>
  );
};

function App() {

  return (
    <Router>
      <div className="App">
          <Switch>
            <Redirect exact from="/" to="/ser/inicio"/>
            <Redirect exact from="/ser" to="/ser/inicio"/>
            <Redirect exact from="/ser/publicaciones" to="/ser/publicaciones/documentos"/>
            <Redirect exact from="/ser/estadisticas" to="/ser/estadisticas/busqueda-por-dimensiones"/>
            <Redirect exact from="/ser/administrador-estadisticas" to="/ser/administrador-estadisticas/modificar-indicadores"/>
            <Redirect exact from="/ser/administrador-publicaciones" to="/ser/administrador-publicaciones/documentos"/>

            <Route exact path="/ser/inicio" component={InicioContainer}/>
            <Route path="/ser/estadisticas" component={EstadisticasContainer}/>
            <Route path="/ser/contacto" component={ContactoContainer}/>
            <Route path="/ser/ayuda" component={AyudaContainer}/>
            <Route path="/ser/publicaciones" component={PublicacionesContainer}/>
            <Route path="/ser/login" component={Login}/>
            <Route path="/ser/administrador-inicio" component={AdminInicio}/>
            <Route path="/ser/administrador-publicaciones" component={AdminPublicaciones}/>
            <Route path="/ser/administrador-estadisticas" component={AdminEstadisticas}/>
            <Route path="/ser/ajustes" component={AjustesContainer}/>
            <Route component={NoMatchPage}/>
          </Switch>
        
      </div>
    </Router>
  );
}


export default App;
