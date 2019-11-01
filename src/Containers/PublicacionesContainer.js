import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';
import Tabs from '../Components/Tabs';
import Buscador from '../Components/Buscador';
import Titulo from '../Components/Titulo';
import SelectorUAO from '../Components/SelectorUAO';

class PublicacionesContainer extends Component {
    render() {
        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <Titulo titulo="Publicaciones"></Titulo>
                <SelectorUAO></SelectorUAO>
                <label class="cb-container">
                    <input type="checkbox"></input>
                    <p>Opción Uno</p>
                    <span class="icon far fa-square"></span>
                </label>
                    <label class="cb-container">
                    <input type="checkbox"></input>
                    <p>Opción Dos</p>
                    <span class="icon far fa-square"></span>
                </label>
                <label class="cb-container">
                    <input type="checkbox"></input>
                    <p>Opción Tres</p>
                    <span class="icon far fa-square"></span>
                </label>
                <Tabs></Tabs>
                <Footer></Footer>
            </div>
        );
    }
}

PublicacionesContainer.propTypes = {

};

export default PublicacionesContainer;