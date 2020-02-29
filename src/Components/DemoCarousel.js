import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import carousel1 from '../carousel-01.jpg';
import carousel2 from '../carousel-02.jpg';
import carousel3 from '../carousel-03.jpg';
import carousel4 from '../carousel-04.jpg';
import carousel5 from '../carousel-05.jpg';

class DemoCarousel extends Component {
    render() {
        return (
            <div>
                <Carousel  style={{maxHeight:'20em'}}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                showArrows={true}
                autoPlay={true}
                transitionTime={350}
                interval={3000}
                infiniteLoop={true}>
                    <div style={{maxHeight:'20em'}}>
                        <img src={carousel1} alt="" />
                        <p className="legend">
                            Lugar
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>
                        <img src={carousel2} alt="" />
                        <p className="legend">
                            Lugar
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel3} alt="" />
                        <p className="legend">
                            Lugar
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel4} alt="" />
                        <p className="legend">
                            Lugar
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel5} alt="" />
                        <p className="legend">
                            Lugar
                        </p>
                    </div>
                </Carousel>
            </div>
        );
    }
};

export default DemoCarousel;