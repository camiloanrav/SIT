import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoAyuda from '../Components/VideoAyuda';
import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import RecursosUtiles from '../Components/RecursosUtiles';

class AyudaContainer extends Component {
    render() {
        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <VideoAyuda></VideoAyuda>
                <div className="ayuda">
                    <div>
                        <h3>A tener en cuenta</h3>
                        <ul>
                            <li>lodsadremdasdasdas</li>
                            <li>dasdsadasdasdasda</li>
                            <li>dsadsadasdasdasdas</li>
                            <li>dasdasdsadasdasdasd</li>
                            <li>dasdasdasdsadasdasdas</li>
                        </ul>
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