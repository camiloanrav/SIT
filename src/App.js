import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import InicioContainer from './Containers/InicioContainer';
import EstadisticasContainer from './Containers/EstadisticasContainer';
import ContactoContainer from './Containers/ContactoContainer';
import AyudaContainer from './Containers/AyudaContainer';

function App() {
  return (
    <Router>
      <div className="App">
          <Route exact path="/" component={InicioContainer}/>
          <Route exact path="/Estadisticas" component={EstadisticasContainer}/>
          <Route exact path="/Contacto" component={ContactoContainer}/>
          <Route exact path="/Ayuda" component={AyudaContainer}/>
          <Switch>
            <Route path="/customers/new" component={InicioContainer}/>
            <Route path="/customers/:dni" component={InicioContainer}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
