import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoAyuda from '../Components/VideoAyuda';
import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import RecursosUtiles from '../Components/RecursosUtiles';
import Titulo from '../Components/Titulo';

class AyudaContainer extends Component {
    render() {
        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <Titulo titulo="Ayuda"></Titulo>
                <VideoAyuda></VideoAyuda>
                <div className="ayuda">
                    <div>
                        <h3>Preguntas frecuentes:</h3>
                        <div class="circle-icon">
                            <span class="icon fas fa-envelope"></span>
                        </div>
                </div>
                    <RecursosUtiles></RecursosUtiles>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

AyudaContainer.propTypes = {

};

export default AyudaContainer;