import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';
import Tabs from '../Components/Tabs';
import Buscador from '../Components/Buscador';
import Titulo from '../Components/Titulo';

class PublicacionesContainer extends Component {
    render() {
        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <Titulo titulo="Publicaciones"></Titulo>
                <Tabs></Tabs>
                <Footer></Footer>
            </div>
        );
    }
}

PublicacionesContainer.propTypes = {

};

export default PublicacionesContainer;