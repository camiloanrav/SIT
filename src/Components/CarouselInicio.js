import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import carousel1 from '../img/carousel-01.jpg';
import carousel2 from '../img/carousel-02.jpg';
import carousel4 from '../img/carousel-04.jpg';
import carousel5 from '../img/carousel-05.jpg';
import carousel6 from '../img/carousel-06.jpg';
import carousel7 from '../img/carousel-07.jpg';

class CarouselInicio extends Component {
    render() {
        return (
            <div>
                
                <div className="titulo">
                    <p>Estadísticas Territoriales<br></br>de la Región Pacífico</p>
                </div>
                <Carousel
                
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                showArrows={true}
                autoPlay={true}
                transitionTime={300}
                interval={10000}
                infiniteLoop={true}>
                    <div style={{maxHeight:'20em'}}>
                        <img src={carousel1} alt="" />
                        <p className="legend">
                            Nariño
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>
                        <img src={carousel2} alt="" />
                        <p className="legend">
                            Nariño
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel4} alt="" />
                        <p className="legend">
                            Valle del Cauca
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel5} alt="" />
                        <p className="legend">
                            Cauca
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel6} alt="" />
                        <p className="legend">
                            Chocó
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel7} alt="" />
                        <p className="legend">
                            Chocó
                        </p>
                    </div>
                </Carousel>
            </div>
        );
    }
};

export default CarouselInicio;