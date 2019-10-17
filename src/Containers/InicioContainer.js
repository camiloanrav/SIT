import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/core/styles.scss';
import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Card from '../Components/Card';

function InicioContainer() {
    //const [gradient, setGradient] = useState("");
    return (
      <div>
        

        <NavBarDesktop></NavBarDesktop>
        <NavBarMovil></NavBarMovil>
        {/* Contenido principal */}
        <AwesomeSlider cssModule={AwsSliderStyles}>
            <div data-src="/path/to/image-0.png" />
            <div data-src="/path/to/image-1.png" />
            <div data-src="/path/to/image-2.jpg" />
        </AwesomeSlider>
        
        <section class="investigation with-decoration">
          <div className="cards">
            <Card nombreDimension="Institucional"></Card>
            <Card nombreDimension="Ambiental"></Card>
            <Card nombreDimension="Economica"></Card>
            <Card nombreDimension="Social"></Card>
          </div>
        </section>
        {/*<section class="circulation-of-links">
        </section>*/}
        
        <Footer></Footer>
      </div>
    );
}

InicioContainer.propTypes = {

};

export default InicioContainer;
