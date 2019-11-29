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
                    <div className="preguntasFrecuentes">
                        <h3>Preguntas frecuentes:</h3>
                        <div style={{marginBottom:"2em"}}>
                            <div style={{display:"flex"}}>
                                <div className="circle-icon">
                                    <span className="icon fas fa-angle-right"></span>
                                </div>
                                <p className="pregunta">¿Cómo Consulto los datos?</p>
                            </div>
                            <p style={{marginLeft:'2.5em', textAlign:'left'}}>En la pestañasaaaaavffddd dasdsadasdasdasd sadasdsadasdsadsadasdasda dwsadsadsadasdasdsa.</p>
                        </div>
                        <div style={{marginBottom:"2em"}}>
                            <div style={{display:"flex"}}>
                                <div className="circle-icon">
                                    <span className="icon fas fa-angle-right"></span>
                                </div>
                                <p className="pregunta">¿Cómo Consulto los datos?</p>
                            </div>
                            <p style={{marginLeft:'2.5em', textAlign:'left'}}>En la pestañasaaaaavffddd dsadsaddddddddddddddddddddddddd saddddddddddddddddddddddddddddddddddddsa saddddddddddd dfg.</p>
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