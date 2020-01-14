import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import carousel1 from '../carousel-01.jpg';
import carousel2 from '../carousel-02.jpg';
import carousel3 from '../carousel-03.jpg';
import carousel4 from '../carousel-04.jpg';

class DemoCarousel extends Component {
    render() {
        return (
            <div>
                <Carousel  style={{maxHeight:'20em'}} showThumbs={false} showIndicators={false} showStatus={false} showArrows={true} autoPlay={true} transitionTime={350} interval={3000} infiniteLoop={true}>
                    {/* <div style={{maxHeight:'20em'}}>
                        <img src="https://s1.1zoom.me/big0/821/Ukraine_Autumn_500392.jpg" />
                        <p className="legend">
                            SER Pacífico
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>
                        <img src="https://www.dennisexpress.com/wp-content/uploads/2018/10/kogi-cabo-burger-1280x520.jpg" />
                        <p className="legend">SER Pacífico</p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src="https://smolensk.myatom.ru/wp-content/uploads/sites/17/2019/07/AjhqPAoI5xs-1280x520.jpg" />
                        <div className="legend">
                            <p className="titulo">SER Pacífico</p>
                        </div>
                        
                    </div> */}
                    <div style={{maxHeight:'20em'}}>
                        <img src={carousel1} alt="" />
                        <p className="legend">
                            SER Pacífico
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>
                        <img src={carousel2} alt="" />
                        <p className="legend">
                            SER Pacífico
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel3} alt="" />
                        <p className="legend">
                            SER Pacífico
                        </p>
                    </div>
                    <div style={{maxHeight:'20em'}}>  
                        <img src={carousel4} alt="" />
                        <div className="legend">
                            <p className="titulo">SER Pacífico</p>
                        </div>
                    </div>
                </Carousel>
            </div>
        );
    }
};

export default DemoCarousel;