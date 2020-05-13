import React, {useState}  from 'react';
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
  const [administrador,setAdministrador] = useState(true);
  return (
    <Router>
      <div className="App">
        {
        administrador?
          <Switch>
            <Redirect exact from="/" to="/inicio"/>
            <Redirect exact from="/publicaciones" to="/publicaciones/documentos"/>
            <Redirect exact from="/administrador-estadisticas" to="/administrador-estadisticas/modificar-indicadores"/>
            <Redirect exact from="/administrador-publicaciones" to="/administrador-publicaciones/documentos"/>
            {/* <Redirect exact from="/administrador" to="/administrador/inicio"/> */}
            <Route exact path="/inicio" component={InicioContainer}/>
            <Route path="/estadisticas" component={EstadisticasContainer}/>
            <Route path="/contacto" component={ContactoContainer}/>
            <Route path="/ayuda" component={AyudaContainer}/>
            <Route path="/publicaciones" component={PublicacionesContainer}/>
            <Route path="/login" component={Login}/>
            <Route path="/administrador-inicio" component={AdminInicio}/>
            <Route path="/administrador-publicaciones" component={AdminPublicaciones}/>
            <Route path="/administrador-estadisticas" component={AdminEstadisticas}/>
            <Route component={NoMatchPage} />
          </Switch>
          :
          <Switch>
            <Redirect exact from="/" to="/inicio"/>
            <Redirect exact from="/publicaciones" to="/publicaciones/documentos"/>
            <Redirect exact from="/administrador-estadisticas" to="/login"/>
            <Redirect exact from="/administrador-publicaciones" to="/login"/>
            <Redirect exact from="/administrador-inicio" to="/login"/>
            {/* <Redirect exact from="/administrador" to="/administrador/inicio"/> */}
            <Route exact path="/inicio" component={InicioContainer}/>
            <Route path="/estadisticas" component={EstadisticasContainer}/>
            <Route path="/contacto" component={ContactoContainer}/>
            <Route path="/ayuda" component={AyudaContainer}/>
            <Route path="/publicaciones" component={PublicacionesContainer}/>
            <Route path="/login" component={Login}/>
            <Route path="/administrador-inicio" component={AdminInicio}/>
            <Route path="/administrador-publicaciones" component={AdminPublicaciones}/>
            <Route path="/administrador-estadisticas" component={AdminEstadisticas}/>
            <Route component={NoMatchPage} />
          </Switch>
          }
      </div>
    </Router>
  );
}


export default App;
